"""
QuickBooks → Supabase Sync
Pulls Estimates, Customers, and Invoices from QuickBooks Online
and upserts them into your Supabase CRM database.

Environment variables required (set in Vercel):
  QB_CLIENT_ID, QB_CLIENT_SECRET, QB_REFRESH_TOKEN, QB_REALM_ID
  SUPABASE_URL, SUPABASE_KEY
"""

import os
import json
import requests
from datetime import datetime, timezone
from supabase import create_client, Client

# ---------------------------------------------------------------------------
# Config — all values come from environment variables (set in Vercel)
# ---------------------------------------------------------------------------
QB_CLIENT_ID     = os.environ["QB_CLIENT_ID"]
QB_CLIENT_SECRET = os.environ["QB_CLIENT_SECRET"]
QB_REFRESH_TOKEN = os.environ["QB_REFRESH_TOKEN"]   # stored in Supabase after first run
QB_REALM_ID      = os.environ["QB_REALM_ID"]        # your QB Company ID
QB_BASE_URL      = "https://quickbooks.api.intuit.com/v3/company"

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]


# ---------------------------------------------------------------------------
# QuickBooks auth
# ---------------------------------------------------------------------------

def get_qb_access_token() -> str:
    """Exchange the stored refresh token for a fresh access token."""
    resp = requests.post(
        "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
        auth=(QB_CLIENT_ID, QB_CLIENT_SECRET),
        data={
            "grant_type": "refresh_token",
            "refresh_token": QB_REFRESH_TOKEN,
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


def qb_query(access_token: str, query: str) -> dict:
    """Run a QuickBooks query and return the parsed JSON response."""
    resp = requests.get(
        f"{QB_BASE_URL}/{QB_REALM_ID}/query",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json",
        },
        params={"query": query},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def build_address(addr: dict) -> str:
    """Flatten a QB address object into a single string."""
    if not addr:
        return ""
    parts = [
        addr.get("Line1", ""),
        addr.get("Line2", ""),
        addr.get("City", ""),
        addr.get("CountrySubDivisionCode", ""),
        addr.get("PostalCode", ""),
    ]
    return ", ".join(p for p in parts if p).strip()


def detect_country(addr: dict) -> str:
    """Return 'Canada' or 'US' based on the address country field."""
    if not addr:
        return "US"
    country = addr.get("Country", "").strip().lower()
    province = addr.get("CountrySubDivisionCode", "").strip().upper()
    # Canadian provinces
    ca_provinces = {"AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"}
    if "canada" in country or country == "ca" or province in ca_provinces:
        return "Canada"
    return "US"


def parse_line_items(lines: list) -> tuple[list, list]:
    """
    Extract line items and locker-size info from QB line array.
    Returns (line_items_list, locker_sizes_list).
    """
    line_items = []
    locker_sizes = []
    locker_keywords = ["locker", "size", "unit", "cabinet", "compartment"]

    for line in lines:
        if line.get("DetailType") != "SalesItemLineDetail":
            continue
        detail = line.get("SalesItemLineDetail", {})
        description = line.get("Description", "")
        item_name = detail.get("ItemRef", {}).get("name", "")
        qty = detail.get("Qty")
        unit_price = detail.get("UnitPrice")

        entry = {
            "description": description,
            "item":        item_name,
            "quantity":    qty,
            "unit_price":  unit_price,
            "amount":      line.get("Amount"),
        }
        line_items.append(entry)

        # Flag lines that look like locker / unit sizes
        combined = f"{description} {item_name}".lower()
        if any(kw in combined for kw in locker_keywords):
            locker_sizes.append({
                "description": description or item_name,
                "quantity":    qty,
            })

    return line_items, locker_sizes


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------------------------------------------------------------------------
# Sync functions
# ---------------------------------------------------------------------------

def sync_customers(access_token: str, supabase: Client) -> int:
    """Sync QB customers → supabase `customers` table."""
    data = qb_query(access_token, "SELECT * FROM Customer MAXRESULTS 1000")
    customers = data.get("QueryResponse", {}).get("Customer", [])

    for c in customers:
        ship_addr = c.get("ShipAddr", {})
        bill_addr = c.get("BillAddr", {})
        addr = ship_addr or bill_addr  # prefer shipping

        record = {
            "qb_customer_id":  c["Id"],
            "display_name":    c.get("DisplayName"),
            "company_name":    c.get("CompanyName"),
            "email":           c.get("PrimaryEmailAddr", {}).get("Address"),
            "phone":           c.get("PrimaryPhone", {}).get("FreeFormNumber"),
            "shipping_address": build_address(ship_addr),
            "billing_address":  build_address(bill_addr),
            "country":         detect_country(addr),
            "currency":        c.get("CurrencyRef", {}).get("value", "USD"),
            "active":          c.get("Active", True),
            "qb_updated_at":   c.get("MetaData", {}).get("LastUpdatedTime"),
            "synced_at":       now_iso(),
        }
        supabase.table("customers").upsert(record, on_conflict="qb_customer_id").execute()

    print(f"  ✓ Customers synced: {len(customers)}")
    return len(customers)


def sync_invoices(access_token: str, supabase: Client) -> int:
    """Sync QB invoices → supabase `invoices` table."""
    data = qb_query(
        access_token,
        "SELECT * FROM Invoice MAXRESULTS 1000 ORDERBY MetaData.LastUpdatedTime DESC",
    )
    invoices = data.get("QueryResponse", {}).get("Invoice", [])

    for inv in invoices:
        ship_addr = inv.get("ShipAddr", {})
        customer_ref = inv.get("CustomerRef", {})
        line_items, locker_sizes = parse_line_items(inv.get("Line", []))

        record = {
            "qb_invoice_id":   inv["Id"],
            "qb_customer_id":  customer_ref.get("value"),
            "customer_name":   customer_ref.get("name"),
            "invoice_number":  inv.get("DocNumber"),
            "email":           inv.get("BillEmail", {}).get("Address"),
            "shipping_address": build_address(ship_addr),
            "country":         detect_country(ship_addr),
            "total_amount":    inv.get("TotalAmt"),
            "balance_due":     inv.get("Balance"),
            "currency":        inv.get("CurrencyRef", {}).get("value", "USD"),
            "status":          inv.get("EmailStatus"),
            "transaction_date": inv.get("TxnDate"),
            "due_date":        inv.get("DueDate"),
            # JSON columns — store full detail
            "line_items":      json.dumps(line_items),
            "locker_sizes":    json.dumps(locker_sizes),
            "qb_updated_at":   inv.get("MetaData", {}).get("LastUpdatedTime"),
            "synced_at":       now_iso(),
        }
        supabase.table("invoices").upsert(record, on_conflict="qb_invoice_id").execute()

    print(f"  ✓ Invoices synced: {len(invoices)}")
    return len(invoices)


def sync_estimates(access_token: str, supabase: Client) -> int:
    """Sync QB estimates → supabase `estimates` table."""
    data = qb_query(
        access_token,
        "SELECT * FROM Estimate MAXRESULTS 1000 ORDERBY MetaData.LastUpdatedTime DESC",
    )
    estimates = data.get("QueryResponse", {}).get("Estimate", [])

    for est in estimates:
        ship_addr = est.get("ShipAddr", {})
        customer_ref = est.get("CustomerRef", {})
        line_items, locker_sizes = parse_line_items(est.get("Line", []))

        record = {
            "qb_estimate_id":  est["Id"],
            "qb_customer_id":  customer_ref.get("value"),
            "customer_name":   customer_ref.get("name"),
            "estimate_number": est.get("DocNumber"),
            "email":           est.get("BillEmail", {}).get("Address"),
            "shipping_address": build_address(ship_addr),
            "country":         detect_country(ship_addr),
            "total_amount":    est.get("TotalAmt"),
            "currency":        est.get("CurrencyRef", {}).get("value", "USD"),
            "status":          est.get("TxnStatus"),      # Accepted / Pending / Closed
            "transaction_date": est.get("TxnDate"),
            "expiry_date":     est.get("ExpirationDate"),
            # JSON columns
            "line_items":      json.dumps(line_items),
            "locker_sizes":    json.dumps(locker_sizes),
            "qb_updated_at":   est.get("MetaData", {}).get("LastUpdatedTime"),
            "synced_at":       now_iso(),
        }
        supabase.table("estimates").upsert(record, on_conflict="qb_estimate_id").execute()

    print(f"  ✓ Estimates synced: {len(estimates)}")
    return len(estimates)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def run_sync() -> dict:
    print("=== QuickBooks → Supabase sync starting ===")
    access_token = get_qb_access_token()
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    counts = {
        "customers": sync_customers(access_token, supabase),
        "invoices":  sync_invoices(access_token, supabase),
        "estimates": sync_estimates(access_token, supabase),
    }

    print(f"=== Sync complete: {counts} ===")
    return counts


if __name__ == "__main__":
    run_sync()

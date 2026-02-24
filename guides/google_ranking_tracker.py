#!/usr/bin/env python3
"""
Google Ranking Tracker for playerstall.com
Checks Google keyword rankings and generates weekly reports with position and page information.

Usage:
    python guides/google_ranking_tracker.py

Requirements:
    - DataForSEO API credentials (set as environment variables) OR
    - Manual ranking data entry
    - Python packages: requests, pandas, json, datetime

Runs automatically every Monday via cron job.
"""

import os
import json
import csv
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

# Configuration
WEBSITE_URL = "https://playerstall.com/"
LOCATION_NAME = "United States"
LANGUAGE_CODE = "en"
OUTPUT_DIR = Path(__file__).parent / "ranking_data"
OUTPUT_DIR.mkdir(exist_ok=True)

# Email Configuration (set via environment variables)
EMAIL_ENABLED = os.getenv("RANKING_EMAIL_ENABLED", "false").lower() == "true"
EMAIL_TO = os.getenv("RANKING_EMAIL_TO", "playerstallsports@gmail.com")  # Default recipient
EMAIL_FROM = os.getenv("RANKING_EMAIL_FROM", "playerstallsports@gmail.com")  # Default sender
EMAIL_SMTP_SERVER = os.getenv("RANKING_SMTP_SERVER", "smtp.gmail.com")
EMAIL_SMTP_PORT = int(os.getenv("RANKING_SMTP_PORT", "587"))
EMAIL_SMTP_USER = os.getenv("RANKING_SMTP_USER", "")  # Usually same as EMAIL_FROM
EMAIL_SMTP_PASSWORD = os.getenv("RANKING_SMTP_PASSWORD", "")  # App password for Gmail

# Master keyword list - Blog post keywords + core business keywords
KEYWORDS = [
    # Blog Post Keywords (Primary)
    "wood vs metal sports lockers",
    "custom sports lockers",
    "college sports lockers",
    "football locker room design",
    "how to choose sports lockers",
    "hockey lockers",
    "basketball lockers",
    "baseball lockers",
    "football lockers",
    
    # Core Business Keywords
    "sports lockers",
    "locker room lockers",
    "athletic lockers",
    "wood sports lockers",
    "wood athletic lockers",
    "stadium lockers",
    "pro lockers",
    "varsity lockers",
    "buy sports lockers",
    
    # Programmatic Keywords (Sample)
    "texas football wood lockers",
    "california basketball wood lockers",
    "florida football wood lockers",
    "new york hockey wood lockers",
    "ohio football wood lockers",
]

# Keyword priorities for reporting
KEYWORD_PRIORITIES = {
    "wood vs metal sports lockers": "CRITICAL",
    "custom sports lockers": "CRITICAL",
    "college sports lockers": "CRITICAL",
    "sports lockers": "CRITICAL",
    "locker room lockers": "CRITICAL",
    "athletic lockers": "CRITICAL",
    "wood sports lockers": "CRITICAL",
    "football locker room design": "HIGH",
    "how to choose sports lockers": "HIGH",
    "hockey lockers": "HIGH",
    "basketball lockers": "HIGH",
    "football lockers": "HIGH",
    "wood athletic lockers": "HIGH",
    "stadium lockers": "HIGH",
    "pro lockers": "HIGH",
    "baseball lockers": "MEDIUM",
    "varsity lockers": "MEDIUM",
    "buy sports lockers": "MEDIUM",
}

def get_dataforseo_credentials():
    """Get DataForSEO API credentials from environment variables."""
    login = os.getenv("DATAFORSEO_LOGIN")
    password = os.getenv("DATAFORSEO_PASSWORD")
    
    if not login or not password:
        print("⚠️  WARNING: DataForSEO credentials not found!")
        print("Set environment variables:")
        print("  export DATAFORSEO_LOGIN='your_login'")
        print("  export DATAFORSEO_PASSWORD='your_password'")
        print("\nFor now, using mock data mode...")
        return None, None
    
    return login, password

def check_rankings_dataforseo(keywords: List[str], login: str, password: str) -> Dict:
    """
    Check keyword rankings using DataForSEO SERP API.
    Uses the v3 SERP Google Organic Live Advanced endpoint.
    """
    import base64
    
    results = {}
    
    # DataForSEO API endpoint
    api_url = "https://api.dataforseo.com/v3/serp/google/organic/live/advanced"
    
    # Basic authentication header
    credentials = f"{login}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    
    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/json"
    }
    
    print(f"🔍 Checking {len(keywords)} keywords via DataForSEO API...")
    
    for idx, keyword in enumerate(keywords, 1):
        try:
            # DataForSEO requires an array of tasks
            payload = [{
                "keyword": keyword,
                "location_name": LOCATION_NAME,
                "language_code": LANGUAGE_CODE,
                "depth": 100,  # Check top 100 results
                "device": "desktop",
                "os": "windows"
            }]
            
            response = requests.post(api_url, json=payload, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                ranking = find_website_ranking(data, WEBSITE_URL)
                results[keyword] = ranking
                
                if ranking:
                    print(f"  [{idx}/{len(keywords)}] ✅ '{keyword}': Position #{ranking}")
                else:
                    print(f"  [{idx}/{len(keywords)}] ❌ '{keyword}': Not ranking")
            else:
                error_msg = response.text[:200] if response.text else "Unknown error"
                print(f"  [{idx}/{len(keywords)}] ⚠️  '{keyword}': API Error {response.status_code} - {error_msg}")
                results[keyword] = None
                
        except Exception as e:
            print(f"  [{idx}/{len(keywords)}] ⚠️  Error checking '{keyword}': {str(e)}")
            results[keyword] = None
    
    return results

def find_website_ranking(serp_data: Dict, website_url: str) -> Optional[int]:
    """
    Find the ranking position of your website in SERP results.
    
    Args:
        serp_data: DataForSEO API response (array format)
        website_url: Your website URL to find (e.g., "playerstall.com")
    
    Returns:
        Ranking position (1-100) or None if not found
    """
    # Extract domain from URL (e.g., "playerstall.com" from "https://playerstall.com/")
    domain = website_url.replace("https://", "").replace("http://", "").replace("www.", "").rstrip("/")
    domain_variants = [domain, f"www.{domain}", f"https://{domain}", f"https://www.{domain}"]
    
    # DataForSEO v3 API returns an array: [{"tasks": [{"result": [{"items": [...]}]}]}]
    if isinstance(serp_data, list) and len(serp_data) > 0:
        response_obj = serp_data[0]
        
        # Navigate through the nested structure
        if "tasks" in response_obj and len(response_obj["tasks"]) > 0:
            task = response_obj["tasks"][0]
            
            if "result" in task and len(task["result"]) > 0:
                result = task["result"][0]
                
                # Look for items array
                if "items" in result:
                    for item in result["items"]:
                        # Check if it's an organic result
                        if item.get("type") == "organic":
                            # Check domain or URL
                            item_domain = item.get("domain", "").lower()
                            item_url = item.get("url", "").lower()
                            
                            # Match domain (with or without www, http/https)
                            for variant in domain_variants:
                                if variant.lower() in item_domain or variant.lower() in item_url:
                                    rank = item.get("rank_absolute")
                                    if rank:
                                        return rank
    
    return None

def check_rankings_mock(keywords: List[str]) -> Dict:
    """
    Mock ranking checker for testing without API credentials.
    Returns random rankings for demonstration.
    """
    import random
    print("📊 Running in MOCK MODE (no API credentials)")
    print("   Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD for real data\n")
    
    results = {}
    for keyword in keywords:
        # Mock: 30% chance of ranking, random position if ranking
        if random.random() < 0.3:
            results[keyword] = random.randint(1, 100)
        else:
            results[keyword] = None
    
    return results

def save_weekly_snapshot(rankings: Dict, date: str):
    """Save weekly ranking snapshot to JSON file."""
    snapshot_file = OUTPUT_DIR / f"weekly_rankings_{date}.json"
    
    snapshot_data = {
        "date": date,
        "website": WEBSITE_URL,
        "location": LOCATION_NAME,
        "language": LANGUAGE_CODE,
        "total_keywords": len(rankings),
        "rankings": rankings
    }
    
    with open(snapshot_file, 'w') as f:
        json.dump(snapshot_data, f, indent=2)
    
    print(f"✅ Saved weekly snapshot: {snapshot_file}")
    return snapshot_file

def load_previous_rankings() -> Optional[Dict]:
    """Load the most recent previous ranking snapshot."""
    snapshots = sorted(OUTPUT_DIR.glob("weekly_rankings_*.json"), reverse=True)
    
    if len(snapshots) > 0:
        with open(snapshots[0], 'r') as f:
            return json.load(f)
    
    return None

def get_page_number(position: Optional[int]) -> Optional[int]:
    """Calculate which Google page a ranking position is on (10 results per page)."""
    if position is None:
        return None
    # Google shows 10 results per page
    # Position 1-10 = Page 1, 11-20 = Page 2, etc.
    return ((position - 1) // 10) + 1

def update_master_csv(rankings: Dict, date: str):
    """Update master CSV file with all historical rankings."""
    master_file = OUTPUT_DIR / "master_rankings.csv"
    
    # Load existing data if file exists
    existing_data = []
    fieldnames = ["date"]
    
    # Add columns for position and page for each keyword
    for keyword in KEYWORDS:
        fieldnames.append(f"{keyword}_position")
        fieldnames.append(f"{keyword}_page")
    
    if master_file.exists():
        with open(master_file, 'r') as f:
            reader = csv.DictReader(f)
            existing_data = list(reader)
            # Update fieldnames if file already exists (preserve old format)
            if reader.fieldnames:
                fieldnames = reader.fieldnames
    
    # Prepare new row
    new_row = {"date": date}
    for keyword in KEYWORDS:
        position = rankings.get(keyword)
        page = get_page_number(position)
        
        # Use new format with _position and _page suffixes
        new_row[f"{keyword}_position"] = position if position is not None else ""
        new_row[f"{keyword}_page"] = f"Page {page}" if page is not None else "Not ranking"
    
    # Append new row
    existing_data.append(new_row)
    
    # Write back to CSV
    with open(master_file, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(existing_data)
    
    print(f"✅ Updated master CSV: {master_file}")

def generate_weekly_report(rankings: Dict, previous_rankings: Optional[Dict], date: str):
    """Generate a weekly ranking report."""
    report_file = OUTPUT_DIR / f"weekly_report_{date}.md"
    
    # Calculate statistics
    total_keywords = len(rankings)
    ranked_keywords = sum(1 for r in rankings.values() if r is not None)
    top_10 = sum(1 for r in rankings.values() if r is not None and r <= 10)
    top_20 = sum(1 for r in rankings.values() if r is not None and r <= 20)
    top_50 = sum(1 for r in rankings.values() if r is not None and r <= 50)
    
    # Calculate page statistics
    page_1 = sum(1 for r in rankings.values() if r is not None and r <= 10)
    page_2 = sum(1 for r in rankings.values() if r is not None and 11 <= r <= 20)
    page_3 = sum(1 for r in rankings.values() if r is not None and 21 <= r <= 30)
    page_4_plus = sum(1 for r in rankings.values() if r is not None and r > 30)
    
    # Calculate improvements/declines
    improvements = []
    declines = []
    new_rankings = []
    
    if previous_rankings:
        prev_rankings = previous_rankings.get("rankings", {})
        for keyword, current_rank in rankings.items():
            prev_rank = prev_rankings.get(keyword)
            
            if prev_rank is None and current_rank is not None:
                new_rankings.append((keyword, current_rank))
            elif prev_rank is not None and current_rank is not None:
                if current_rank < prev_rank:
                    improvements.append((keyword, prev_rank, current_rank))
                elif current_rank > prev_rank:
                    declines.append((keyword, prev_rank, current_rank))
    
    # Sort improvements/declines by change magnitude
    improvements.sort(key=lambda x: x[1] - x[2], reverse=True)
    declines.sort(key=lambda x: x[2] - x[1], reverse=True)
    
    # Generate report
    report = f"""# Weekly Ranking Report - {date}

**Website:** {WEBSITE_URL}  
**Location:** {LOCATION_NAME}  
**Total Keywords Tracked:** {total_keywords}

---

## 📊 Summary Statistics

- **Keywords Ranking:** {ranked_keywords} / {total_keywords} ({ranked_keywords/total_keywords*100:.1f}%)
- **Top 10 Rankings:** {top_10}
- **Top 20 Rankings:** {top_20}
- **Top 50 Rankings:** {top_50}

### 📄 Page Distribution

- **Page 1 (Positions 1-10):** {page_1} keywords
- **Page 2 (Positions 11-20):** {page_2} keywords
- **Page 3 (Positions 21-30):** {page_3} keywords
- **Page 4+ (Positions 31+):** {page_4_plus} keywords

---

## 📈 Top Movers

### Biggest Improvements (Top 5)
"""
    
    if improvements:
        for keyword, prev, curr in improvements[:5]:
            change = prev - curr
            report += f"- **{keyword}**: #{prev} → #{curr} (+{change} positions)\n"
    else:
        report += "- No improvements this week (or no previous data)\n"
    
    report += "\n### Biggest Declines (Top 5)\n"
    
    if declines:
        for keyword, prev, curr in declines[:5]:
            change = curr - prev
            report += f"- **{keyword}**: #{prev} → #{curr} (-{change} positions)\n"
    else:
        report += "- No declines this week (or no previous data)\n"
    
    report += "\n### New Rankings\n"
    
    if new_rankings:
        for keyword, rank in new_rankings[:10]:
            report += f"- **{keyword}**: #{rank} (new)\n"
    else:
        report += "- No new rankings this week\n"
    
    report += "\n---\n\n## 🎯 Current Top Rankings\n\n"
    
    # Top 10 rankings
    top_rankings = [(k, v) for k, v in rankings.items() if v is not None and v <= 10]
    top_rankings.sort(key=lambda x: x[1])
    
    report += "### Top 10 Rankings (Page 1)\n\n"
    if top_rankings:
        for keyword, rank in top_rankings:
            priority = KEYWORD_PRIORITIES.get(keyword, "MEDIUM")
            page = get_page_number(rank)
            report += f"- **#{rank}** (Page {page}) - {keyword} ({priority})\n"
    else:
        report += "- No keywords in top 10 yet\n"
    
    # Top 20 rankings
    top_20_rankings = [(k, v) for k, v in rankings.items() if v is not None and 11 <= v <= 20]
    top_20_rankings.sort(key=lambda x: x[1])
    
    report += "\n### Top 20 Rankings (Page 2)\n\n"
    if top_20_rankings:
        for keyword, rank in top_20_rankings:
            priority = KEYWORD_PRIORITIES.get(keyword, "MEDIUM")
            page = get_page_number(rank)
            report += f"- **#{rank}** (Page {page}) - {keyword} ({priority})\n"
    else:
        report += "- No keywords in top 20 yet\n"
    
    report += "\n---\n\n## 📋 All Rankings\n\n"
    report += "| Keyword | Position | Page | Priority |\n"
    report += "|---------|----------|------|----------|\n"
    
    sorted_rankings = sorted(
        [(k, v) for k, v in rankings.items()],
        key=lambda x: (x[1] if x[1] is not None else 999, x[0])
    )
    
    for keyword, rank in sorted_rankings:
        priority = KEYWORD_PRIORITIES.get(keyword, "MEDIUM")
        rank_str = f"#{rank}" if rank is not None else "Not ranking"
        page = get_page_number(rank)
        page_str = f"Page {page}" if page is not None else "Not ranking"
        report += f"| {keyword} | {rank_str} | {page_str} | {priority} |\n"
    
    report += "\n---\n\n## 💡 Action Items\n\n"
    
    # Generate action items based on data
    if improvements:
        report += "### ✅ What's Working\n"
        report += "- Continue current content strategy\n"
        report += "- Focus on keywords showing improvement\n\n"
    
    if declines:
        report += "### ⚠️ Needs Attention\n"
        for keyword, prev, curr in declines[:3]:
            report += f"- Investigate decline for '{keyword}' (#{prev} → #{curr})\n"
        report += "\n"
    
    if top_10 < 5:
        report += "### 🎯 Growth Opportunities\n"
        report += f"- Only {top_10} keywords in top 10 - aim for 5+\n"
        report += "- Focus on improving top 20 keywords to top 10\n"
        report += "- Continue content optimization for critical keywords\n\n"
    
    report += f"\n---\n\n*Report generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n"
    
    # Save report
    with open(report_file, 'w') as f:
        f.write(report)
    
    print(f"✅ Generated weekly report: {report_file}")
    return report_file

def send_email_report(report_content: str, report_file: Path, date: str):
    """Send weekly ranking report via email."""
    if not EMAIL_ENABLED:
        print("📧 Email disabled (set RANKING_EMAIL_ENABLED=true to enable)")
        return False
    
    if not EMAIL_TO:
        print("⚠️  Email address not configured (set RANKING_EMAIL_TO)")
        return False
    
    try:
        # Create email message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Weekly Ranking Report - {date} | playerstall.com"
        msg['From'] = EMAIL_FROM or EMAIL_SMTP_USER
        msg['To'] = EMAIL_TO
        
        # Convert markdown to HTML (simple conversion)
        html_content = report_content.replace('\n', '<br>')
        html_content = html_content.replace('## ', '<h2>').replace('\n', '</h2>')
        html_content = html_content.replace('### ', '<h3>').replace('\n', '</h3>')
        html_content = html_content.replace('**', '<strong>').replace('**', '</strong>')
        html_content = html_content.replace('# ', '<h1>').replace('\n', '</h1>')
        
        # Create HTML version
        html_body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                h1 {{ color: #fe5900; }}
                h2 {{ color: #1a1a1a; margin-top: 30px; }}
                h3 {{ color: #666; }}
                table {{ border-collapse: collapse; width: 100%; margin: 20px 0; }}
                th, td {{ border: 1px solid #ddd; padding: 12px; text-align: left; }}
                th {{ background-color: #fe5900; color: white; }}
                .summary {{ background-color: #f5f5f5; padding: 20px; border-radius: 5px; }}
            </style>
        </head>
        <body>
            <h1>Weekly Ranking Report - {date}</h1>
            <p><strong>Website:</strong> {WEBSITE_URL}</p>
            <p><strong>Location:</strong> {LOCATION_NAME}</p>
            <hr>
            <div class="summary">
                {html_content}
            </div>
            <hr>
            <p><em>Report generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em></p>
            <p><small>This is an automated weekly ranking report for playerstall.com</small></p>
        </body>
        </html>
        """
        
        # Create plain text version
        text_body = f"""
Weekly Ranking Report - {date}

Website: {WEBSITE_URL}
Location: {LOCATION_NAME}

{report_content}

---
Report generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
This is an automated weekly ranking report for playerstall.com
        """
        
        # Attach both versions
        part1 = MIMEText(text_body, 'plain')
        part2 = MIMEText(html_body, 'html')
        
        msg.attach(part1)
        msg.attach(part2)
        
        # Send email
        print(f"📧 Sending email to {EMAIL_TO}...")
        
        server = smtplib.SMTP(EMAIL_SMTP_SERVER, EMAIL_SMTP_PORT)
        server.starttls()
        
        if EMAIL_SMTP_USER and EMAIL_SMTP_PASSWORD:
            server.login(EMAIL_SMTP_USER, EMAIL_SMTP_PASSWORD)
        
        server.send_message(msg)
        server.quit()
        
        print(f"✅ Email sent successfully to {EMAIL_TO}")
        return True
        
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        print("   Check your email configuration in environment variables")
        return False

def main():
    """Main function to run weekly Google ranking check."""
    print("=" * 60)
    print("Google Ranking Tracker - playerstall.com")
    print("=" * 60)
    print()
    
    # Get current date
    date = datetime.now().strftime("%Y-%m-%d")
    print(f"📅 Date: {date}")
    print(f"🌐 Website: {WEBSITE_URL}")
    print(f"📍 Location: {LOCATION_NAME}")
    print(f"📝 Keywords: {len(KEYWORDS)}")
    print()
    
    # Get API credentials
    login, password = get_dataforseo_credentials()
    
    # Check rankings
    print("🔍 Checking rankings...")
    if login and password:
        rankings = check_rankings_dataforseo(KEYWORDS, login, password)
    else:
        rankings = check_rankings_mock(KEYWORDS)
    
    print()
    
    # Load previous rankings for comparison
    previous_rankings = load_previous_rankings()
    
    # Save weekly snapshot
    save_weekly_snapshot(rankings, date)
    
    # Update master CSV
    update_master_csv(rankings, date)
    
    # Generate weekly report
    report_file = generate_weekly_report(rankings, previous_rankings, date)
    
    # Read report content for email
    if report_file.exists():
        with open(report_file, 'r') as f:
            report_content = f.read()
        
        # Send email if enabled
        send_email_report(report_content, report_file, date)
    
    print()
    print("=" * 60)
    print("✅ Google ranking check complete!")
    print("=" * 60)
    print()
    print("📄 Check the weekly report for detailed analysis:")
    print(f"   {OUTPUT_DIR / f'weekly_report_{date}.md'}")
    print()
    print("📊 Report includes:")
    print("   - Position numbers (#1, #5, #12, etc.)")
    print("   - Page numbers (Page 1, Page 2, etc.)")
    print("   - Week-over-week improvements/declines")
    print("   - Page distribution statistics")
    print()

if __name__ == "__main__":
    main()

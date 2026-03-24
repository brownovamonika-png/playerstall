# Locker Product Pages – Lockers.com-Style (PlayerStall)

This document records what was built from the request: *"Create the same [as the Lockers.com premier wood locker product page] for each of my locker in a style of my model site."*

**Reference link (Lockers.com):**  
https://www.lockers.com/24-inch-wide-premier-wood-open-access-locker-6-feet-high-24-inches-deep-silver-teak-black-electronic-locks/

---

## What Was Done

One **dedicated product page per locker model** was created, in **PlayerStall style** (hero, breadcrumbs, your fonts/colors, square option boxes, spec sheet, Request a quote).

| Locker    | Page route                    | Base price | Image source |
|----------|-------------------------------|------------|--------------|
| Semi Pro | `/product-semi-pro-locker`    | $349       | playerstall.com (Semipro) |
| Varsity  | `/product-varsity-locker`    | $449       | playerstall.com (Varsity)  |
| Pro      | `/product-pro-locker`        | $549       | playerstall.com (Pro)      |
| Stadium  | `/product-stadium-locker`    | $599       | playerstall.com (Stadium)  |

**Source files:**  
`src/pages/product-semi-pro-locker.astro`, `product-varsity-locker.astro`, `product-pro-locker.astro`, `product-stadium-locker.astro`.

**Quick ship (archived):** Quick-ship SKUs and timelines are **currently paused**; the site emphasizes **custom** orders (full width range 18"–32", typical lead time 8–12 weeks). Historical note: quick ship was previously documented as 24" width only (2–4 weeks) for select models.

---

## Page Structure (Same as Lockers.com Idea, in Your Style)

Each locker product page includes:

1. **Hero** – Breadcrumbs (Home / Products / [Locker name]), title, “Spec Sheet · From $XXX”, background word “locker”.
2. **Two-column layout**
   - **Left:** Main product image.
   - **Right:**
     - Product name + “Spec Sheet”
     - Base price (per locker)
     - **Width** – Row of **square selectable boxes**: 18", 20", 22", 24", 26", 28", 30", 32" (same idea as Lockers.com width in the URL).
     - **Finish** – Row of **square boxes with color swatch + label**: Black, Light Grey, Dark Grey, Maple (same idea as Lockers.com finish options, e.g. silver/teak/black).
     - **Full spec sheet** – Core dimensions, material, finishes, lead time, standard features, accessories/add-ons with prices, volume discount.
     - **Request a quote** button.
3. **CTA section** – “Need a custom solution?” + Get free consultation.

Selected width/finish use the same visual treatment as your Wood Locker Bench: orange border and light orange background.

---

## How Users Get There

- **Products page** (`/products`): The four locker cards (Semi Pro, Varsity, Pro, Stadium) are **links**. Clicking a card goes to that locker’s **product page** (its own page with the spec sheet), not an inline expand.
- **Shop** and any other links you add can point to the same routes (e.g. `/product-semi-pro-locker`).

---

## Lockers.com vs What You Have

| Lockers.com page                      | Your equivalent (per locker)                |
|--------------------------------------|---------------------------------------------|
| One URL per config (width/depth/finish/lock) | One URL per **model** (e.g. Semi Pro); width & finish chosen on page with square boxes |
| Width in URL (e.g. 24-inch)          | Width selector: 18"–32" in square boxes     |
| Depth in URL (24 inches)             | Spec sheet states 24" deep (fixed)          |
| Height in URL (6 feet)               | Spec sheet states 76" H (fixed)             |
| Finish in URL (silver-teak-black)    | Finish selector: Black, Light Grey, Dark Grey, Maple (square boxes + swatches) |
| Electronic locks in URL              | Add-ons in spec (e.g. lock box +$80); no separate “lock type” selector yet |
| Add to cart / price                   | Request a quote + base price + add-on list  |
| Specs / description                  | Full spec sheet (dimensions, material, lead time, features, accessories, volume discount) |

So: **same idea** (one product page per locker, with width and finish selection and full specs), **in your site’s style** (hero, breadcrumbs, square boxes for options, spec sheet, quote CTA).

---

## Optional Next Steps (To Mirror Lockers.com More)

If you want to get even closer to the Lockers.com layout later, you could:

- Add **depth** as a selector (e.g. 19" vs 24") if you offer both.
- Add **quantity** and an “Add to quote” or “Request quote with these options” that pre-fills width/finish.
- Add a **specifications table** (e.g. two-column: Dimension / Value) in addition to or instead of the current spec list.
- Add **multiple product images** (e.g. different finishes or angles) in a small gallery.

The current implementation already delivers “the same for each of my locker in a style of my model site” as requested.

---

*Last updated: Feb 2026 – reflects product pages and services links as implemented.*

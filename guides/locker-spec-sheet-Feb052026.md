## Elite Locker – Spec Sheet (Feb 05, 2026)

**Model / Name**
- Elite wood locker

**Core Dimensions**
- Standard size: **24" wide x 76" high x 24" deep**
- Width options: **24" or 30"**
- Optional: **4" high base** can be added

**Base Pricing (no add-ons)**
- **24" width:** $599.00 per locker
- **30" width:** $699.00 per locker

**Material**
- MPW-6C plywood core with premium melamine surface
- High scratch resistance and impact durability
- Moisture-resistant, dimensionally stable construction

**Finishes**
- Black
- Light Grey
- Dark Grey
- Maple

**Lead Time**
- Usually ships within **3–4 weeks**

**Standard Features**
- MPW-6C plywood with melamine coating for a furniture-grade look
- Engineered for high-traffic athletic locker rooms
- 14" high foot locker provides comfortable seating and secure storage

**Accessories (Add-Ons with Dynamic Pricing)**
- **Vented front (+$40)** – increased airflow through the lower front panel
- **Lock box (+$80)** – secure upper-compartment storage
- **Top cushion (+$75)** – padded top seating surface
- **Bottom cushion (+$75)** – padded bottom seating surface
- **Top & bottom cushions (+$150)** – full cushion package
- **Name plate (+$10)** – engraved name/number plate
- **Skate hooks (+$25)** – dedicated hooks for skates/gear
- **Custom logo (+$75)** – team/program logo application

**Width & Pricing Logic (Front-End Behaviour)**
- Width selection controls base price:
  - 24" button selected → base price $599.00
  - 30" button selected → base price $699.00
- Accessories add their listed amounts on top of the current base price.

**Page Location**
- Astro page: `src/pages/product-premier-wood-locker.astro`


# Locker colors (Nov 2026)

On 18 Nov 2026 the website was cut down from 35 colors (20 Sherwin-Williams solids + 15 textured woodgrains) to the 10 colors we actually offer. Phenolic, laminate and woodgrain color sheets were removed.

This repository is public: no customer names, supplier names or supplier codes here. Internal sources are in the Workspace (PlayerStall/Website-Locker-Colors/NOTES.md).

## The 10 colors

| Color | Code in site data | Swatch | Where it came from |
|---|---|---|---|
| Walnut | `TW-WALNUT` | grain photo `public/images/locker-colors/walnut-grain.jpg`, fallback `#7c4f3a` | Cropped from the Model L Walnut photo shoot picture; tone matches the cover locker of the 2026 look book. |
| Maple | `TW-MAPLE` | grain photo `public/images/locker-colors/maple-grain.jpg`, fallback `#8a5a36` | Cropped from the maple sample board photo (Oct 2026). |
| UV Coated Birch | `UV-BIRCH` | `public/images/locker-colors/uv-birch.jpg`, fallback `#ca9f71` | Essential line finish. UV Grade A: 3 UV base coats + 1 clear topcoat, both sides. |
| White | `AD-HRW` (default) | `#f5f5f2` | Added 18 Nov 2026. |
| Cream | `AD-CRM` | `#ede4d3` | Added 18 Nov 2026 (off white). |
| Light Grey | `AD-LFG` | `#c4c2be` | Look book (Model S, B, X). |
| Blue | `AD-BLU` | `#6d767e` | Look book (Model Z). |
| Red | `AD-RED` | `#983327` | Matched to our physical red sample (Oct 2026). |
| Dark Grey | `AD-IO` | `#4b4c4c` | Look book (Model X, Z). |
| Black | `AD-TRB` | `#2a2a2a` | Look book (Model S, B). |

## Where the colors live in the code

- `src/data/adornus-designer-paint-colors.ts`: the 7 solid colors (product dropdowns, spec sheets, room planner).
- `src/data/textured-woodgrain-colors.ts`: the 3 wood tones and their swatch images.
- `src/room-planner/catalog.ts`: maps retired color codes to the nearest current color so saved room plans still open.
- `public/colors/all-color-options-pdf.html`: the customer color page (the main color reference).
- `public/colors/essential-wood-pdf.html`: UV Coated Birch page.
- `vercel.json`: old color sheet URLs (laminate, woodgrain, phenolic, custom finishes, locker color options) redirect to the color page.

## Customer wording rules used

- Never mention the supplier or the country of manufacture.
- No long dashes in customer copy.
- Always offer custom matching: "we can try to match a color you would like and source it for your order."
- All locker colors cost the same.

## In this folder

- `first-mockup/`: the first interactive picker mock-up (before vs after), with locker photos cropped from the 2026 look book. Not used on the site, kept for reference.

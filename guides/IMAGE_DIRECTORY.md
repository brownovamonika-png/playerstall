# Image Directory

**Purpose:** Single registry of all image links used across the PlayerStall project, categorized by where they are hosted. Goal: move all images to the CDN over time.

**Process:** When you add a new image link anywhere in the project (Astro, MDX, HTML, or data files), add an entry to this file under the correct location with:
- URL or path
- Short description
- Optional: where it’s used (page/component)

Prefer CDN for new assets. When replacing legacy URLs with CDN URLs, add the new CDN entry and mark the old one as migrated below.

**How to populate with existing images (one-time or refresh):**
1. From the project root, run: `node scripts/audit-image-links.js`
2. The script prints a full markdown scaffold (all sections: CDN, Local, playerstall.com, topscorer, customsportslockers) with every image URL found in `src/` and `guides/`, plus "Description TBD" and "Used in" file paths.
3. To refresh the directory: copy the script output, then replace the table sections in this file (from "## CDN" through "## customsportslockers.com") with the new output. Keep the Purpose/Process/How to populate blocks at the top.
4. Optionally save the script output to a file first: `node scripts/audit-image-links.js > guides/image-directory-scaffold.md` then merge the tables into this file.
5. Over time, replace "Description TBD" with short descriptions (e.g. "Hero background for product pages", "Tisdale Trojans locker room photo") as you touch each image or do a dedicated pass.

---

## CDN (playerstall.b-cdn.net)

Preferred location. All new images should be added here.

### images/ (root)

| URL / Path | Description | Used in |
|------------|-------------|---------|
| https://playerstall.b-cdn.net/images/laminate-color-sheet.png | Description TBD | src/components/MaterialOptions.astro |
| https://playerstall.b-cdn.net/images/wood-stain-color-sheet.png | Description TBD | src/components/MaterialOptions.astro |
| https://playerstall.b-cdn.net/images/image1.jpeg | Description TBD | src/content/blog/5-signs-its-time-to-upgrade-your-locker-room-with-the-best-lockers-for-sale.mdx; src/content/blog/stick-racks-smelly-socks-how-to-tame-the-chaos-in-a-hockey-locker-room.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG_8092.jpg | Description TBD | src/content/blog/7-step-locker-room-planning-process.mdx; src/content/blog/football-lockers-stinky-football-gear.mdx; src/content/blog/wood-lockers-help-keep-equipment-clean.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/Surrey-Locker-Room.jpg | Description TBD | src/content/blog/a-good-looking-locker-room-is-good-business.mdx; src/content/blog/hockey-wood-lockers-complete-2025-guide-for-ice-hockey-teams.mdx; src/content/blog/simple-tips-keep-sports-equipment-top-shape.mdx; src/content/blog/the-locker-room-ordering-experience-youve-been-waiting-for.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/CP32AH-UAAERMBy.jpg | Description TBD | src/content/blog/a-nice-locker-room-makes-your-team-look-pro.mdx; src/content/blog/athletic-lockers-disinfection.mdx; src/content/blog/best-sports-equipment-storage-solution.mdx; src/content/blog/title-from-metal-boxes-to-custom-wood-lockers-how-sports-lockers-evolved-with-the-game.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG_29331002.jpg | Description TBD | src/content/blog/a-sports-locker-keep-you-clean.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/Wood-Lockers-UBC-1024x1024.jpg | Description TBD | src/content/blog/college-sports-lockers-buyer-guide.mdx; src/content/blog/athletic-lockers-dont-damage-equipment.mdx; src/content/blog/hockey-lockers-complete-guide-to-custom-athletic-storage-solutions.mdx; src/content/blog/mudroom-lockers-are-a-great-addition-for-young-athletes.mdx; src/content/blog/sports-lockers-complete-storage-solution.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG_29341002.jpg | Description TBD | src/content/blog/athletic-lockers-safety-tips-locker-room.mdx; src/content/blog/building-a-championship-team-culture.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/EkPbSwSXcAA172U.jpg | Description TBD | src/content/blog/basketball-lockers-complete-guide-to-custom-athletic-storage-solutions.mdx; src/content/blog/clean-football-equipment.mdx; src/content/blog/wood-lockers-will-save-you-valuable-time.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/Skating-Institute-athletic-lockers.jpg | Description TBD | src/content/blog/behind-the-locker-doors-secrets-to-long-lasting-football-lockers.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG_4360.jpg | Description TBD | src/content/blog/beyond-the-game-how-locker-room-upgrades-can-impress-recruits-and-elevate-your-program.mdx; src/content/blog/locker-room-goals-creating-a-winning-atmosphere-off-the-field.mdx; src/content/blog/playerstall-sports-lockers-is-your-recruiting-edge.mdx; src/content/blog/plywood-vs-mdf-which-one-is-better-for-sports-lockers.mdx; src/content/blog/wood-lockers-are-the-right-choice.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG_8075.jpg | Description TBD | src/content/blog/beyond-the-stadium-10-game-day-rituals-every-football-fan-needs-to-try.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/football-lockers-bonnyville2.jpg | Description TBD | src/content/blog/cheap-lockers.mdx; src/content/blog/sports-lockers-help-recruitment.mdx; src/content/blog/the-anatomy-of-a-perfect-locker-room-must-have-features-for-every-team.mdx; src/content/blog/professional-locker-rooms-help-recruitment.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/image2.jpeg | Description TBD | src/content/blog/choose-athletic-lockers.mdx; src/content/blog/organize-your-football-locker.mdx; src/content/blog/sports-lockers-equipment-good-shape.mdx; src/content/blog/use-a-stick-rack-to-keep-your-sticks-organized.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/CNQRp-KXAAAH234-1.jpg | Description TBD | src/content/blog/choose-best-sports-lockers-find.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/image0.jpeg | Description TBD | src/content/blog/college-sports-lockers-buyer-guide.mdx; src/content/blog/new-wood-lockers-for-sale.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/tisdale-trojans-locker-room2.PNG | Description TBD | src/content/blog/come-see-latest-sports-locker-rooms-done.mdx; src/content/blog/sports-lockers-whats-the-difference-between-plywood-and-mdf.mdx; src/content/blog/wood-vs-metal-lockers-whats-best-for-your-athletic-facility.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/blog-post-custom-lockers.jpg | Description TBD | src/content/blog/custom-sports-locker-solutions.mdx; src/content/blog/every-athlete-needs-sports-locker.mdx |
| https://playerstall.b-cdn.net/images/Cc_PT6YUEAEIJb8.jpg | Description TBD | src/content/blog/custom-sports-lockers-team.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/sports-lockers-basement-1.jpg | Description TBD | src/content/blog/football-locker-room-design-guide.mdx; src/content/blog/quality-wood-lockers-make-life-easier.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/Athletic-Locker-Pro.jpg | Description TBD | src/content/blog/football-locker-room-design-guide.mdx; src/content/blog/how-to-choose-sports-lockers.mdx |
| https://playerstall.b-cdn.net/images/Athletic-Lockers-Stadium.jpg | Description TBD | src/content/blog/football-locker-room-design-guide.mdx; src/content/blog/how-to-choose-sports-lockers.mdx |
| https://playerstall.b-cdn.net/images/wood-lockers-starting-lineup.jpg | Description TBD | src/content/blog/football-locker-room-design-guide.mdx; src/content/blog/how-to-choose-sports-lockers.mdx; src/pages/product-wood-locker-bench.astro; src/pages/services.astro |
| https://playerstall.b-cdn.net/images/lockerroom2.JPG | Interior locker room with custom wood lockers – team facility | src/content/blog/football-lockers-101-building-the-perfect-setup-for-your-team-locker-room.mdx; src/content/blog/locker-rooms-that-win-recruits.mdx (heroImage); src/content/blog/top-5-locker-room-must-haves-for-collegiate-teams.mdx; src/content/blog/how-a-quality-locker-room-can-improve-team-performance-and-recruiting-power.mdx (inline body); src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/college-bois-boulogne-vestiaires-1.jpg | Description TBD | src/content/blog/beyond-the-game-how-locker-room-upgrades-can-impress-recruits-and-elevate-your-program.mdx (inline body image); src/content/blog/college-athletic-locker-guide.mdx (inline body image); src/content/blog/college-sports-lockers-buyer-guide.mdx; src/content/blog/college-facilities-locker-solution.mdx; src/content/blog/football-lockers-complete-guide-to-custom-athletic-storage-solutions.mdx; src/content/blog/making-life-easier-wood-lockers.mdx; src/content/blog/top-5-locker-room-must-haves-for-collegiate-teams.mdx; src/content/blog/whats-inside-a-football-locker-7-essentials-every-player-needs-2.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/hockey-lockers-tahoe.jpg | Description TBD | src/content/blog/from-basic-to-pro-transforming-your-locker-room-on-any-budget.mdx; src/content/blog/great-looking-locker-rooms-helps-kids-confidence.mdx; src/content/blog/sports-equipment-storage-will-keep-your-gear-healthy.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/unnamed-7.jpg | Description TBD | src/content/blog/from-college-dreams-to-pro-teams-how-lockers-tell-a-players-story.mdx; src/content/blog/wood-lockers-attract-the-best-talent.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/athletic-lockers-blazers.jpg | Athletic team lockers with custom branding – Blazers program | src/content/blog/beyond-the-game-how-locker-room-upgrades-can-impress-recruits-and-elevate-your-program.mdx (inline body image); src/content/blog/college-athletic-locker-guide.mdx (inline body image); src/content/blog/college-facilities-locker-solution.mdx; src/content/blog/from-junior-a-to-ncaa-what-the-best-programs-do-differently-with-their-lockers.mdx; src/content/blog/locker-rooms-that-win-recruits.mdx (inline body image); src/content/blog/playerstall-your-sports-locker-pros.mdx; src/content/blog/wood-vs-metal-sports-lockers-what-weve-learned-after-30-years.mdx; src/content/blog/top-5-locker-room-must-haves-for-collegiate-teams.mdx; src/content/blog/how-a-quality-locker-room-can-improve-team-performance-and-recruiting-power.mdx (inline body); src/content/blog/from-college-dreams-to-pro-teams-how-lockers-tell-a-players-story.mdx (inline body image); src/content/blog/wood-lockers-the-1-choice-for-college-sports-locker-rooms.mdx (inline body); src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG_5276.jpg | Description TBD | src/content/blog/help-out-morale-with-a-sports-locker.mdx; src/content/blog/storage-solution-using-sports-lockers.mdx; src/content/blog/wood-lockers-dry.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/langley-rivermen-locker-room.PNG | Langley Rivermen team locker room with custom wood lockers | src/content/blog/from-junior-a-to-ncaa-what-the-best-programs-do-differently-with-their-lockers.mdx; src/content/blog/hockey-stick-racks.mdx; src/content/blog/sports-lockers-build-a-locker-room-that-wins.mdx; src/content/blog/sports-lockers-help-recruitment.mdx; src/content/blog/top-5-locker-room-must-haves-for-collegiate-teams.mdx; src/content/blog/wood-lockers-attract-the-best-talent.mdx; src/content/blog/how-a-quality-locker-room-can-improve-team-performance-and-recruiting-power.mdx (inline body); src/content/blog/from-college-dreams-to-pro-teams-how-lockers-tell-a-players-story.mdx (inline body image); src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/UARK.jpeg | University of Arkansas locker room – collegiate custom wood lockers | src/content/blog/college-athletic-locker-guide.mdx (heroImage); src/content/blog/college-facilities-locker-solution.mdx (heroImage); src/content/blog/college-sports-lockers-buyer-guide.mdx; src/content/blog/how-a-quality-locker-room-can-improve-team-performance-and-recruiting-power.mdx (heroImage); src/content/blog/locker-rooms-that-win-recruits.mdx (inline body image); src/content/blog/sports-lockers-keep-garage-organized.mdx; src/content/blog/wood-lockers-attract-the-best-talent.mdx; src/content/blog/professional-locker-rooms-help-recruitment.mdx (inline body image); src/content/blog/from-college-dreams-to-pro-teams-how-lockers-tell-a-players-story.mdx (inline body image); src/content/blog/wood-lockers-the-1-choice-for-college-sports-locker-rooms.mdx (inline body); src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/20151002_202910.jpg | Description TBD | src/content/blog/how-the-right-sports-lockers-elevate-your-teams-locker-room.mdx; src/content/blog/wood-lockers-are-the-best-choice-for-locker-room-lockers.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/PXL_20230210_105210772.jpg | Description TBD | src/content/blog/how-to-choose-sports-lockers.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/20201110_154836.jpg | Description TBD | src/content/blog/introduction-the-great-locker-debate.mdx; src/content/blog/locker-room-faux-pas-top-10-design-mistakes-coaches-make-and-how-to-avoid-them.mdx; src/content/blog/take-back-mudroom-garage-playerstall-sports-lockers.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/h1-img-8.jpg | Description TBD | Hero/background image used across many pages (blog, cart, checkout, contact, product pages, shipping, shop, thank-you, our-process, PDFs) |
| https://playerstall.b-cdn.net/images/View-recent-photos-1.png | Description TBD | src/content/blog/playerstall-sports-lockers-for-the-people.mdx; src/content/blog/sports-lockers-storage-problem-solved.mdx; src/content/blog/sportsequipmentstorage.mdx; src/content/blog/why-coaches-love-custom-wood-sports-lockers-function-meets-grit.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/image2.JPG | Description TBD | src/content/blog/professional-locker-rooms-help-recruitment.mdx; src/content/blog/sport-equipment-storage.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG_9899.jpg | Description TBD | src/content/blog/save-your-sanity-and-get-a-mudroom-locker.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/unnamed-8.jpg | Description TBD | src/content/blog/sports-locker-prevent-bacteria-and-stinky-equipment.mdx; src/content/blog/sports-lockers-selection-guide-what-matters.mdx; src/content/blog/whats-inside-a-football-locker-7-essentials-every-player-needs.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/FHS-Room.jpg | Description TBD | src/content/blog/sports-lockers-help-avoid-sports-related-infections.mdx; src/content/blog/why-wood-lockers-are-better-than-metal-lockers.mdx; src/content/blog/wood-lockers-help-kids-feel-more-professional.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/Airdrie-1.jpg | Description TBD | src/content/blog/sports-lockers-help-recruitment.mdx; src/content/blog/sports-lockers-safety-tips.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/met1.png | Description TBD | src/content/blog/sports-lockers-local-sports-team.mdx; src/content/blog/wood-lockers-vs-metal-lockers-which-is-best-for-your-team.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/image0-1.jpeg | Description TBD | src/content/blog/sports-lockers-select-best-one.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/20200602_174428.jpg | Description TBD | src/content/blog/sports-lockers-to-upgrade-your-locker-room.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/hockeyville-hockey-lockers.jpg | Description TBD | src/content/blog/the-gross-truth-about-sports-equipment-why-clean-lockers-matter-more-than-you-think.mdx; src/content/blog/wood-lockers-the-1-choice-for-college-sports-locker-rooms.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/sports-lockers-bonnyville.jpg | Description TBD | src/content/blog/up-your-game-with-a-professional-locker-room.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/20161107_111137.jpg | Description TBD | src/content/blog/why-choose-wood-lockers-for-your-sports-team.mdx; src/content/blog/why-wood-lockers-are-making-a-comeback-in-modern-locker-rooms.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/IMG-2919.jpg | Description TBD | src/content/blog/wood-lockers-for-the-neat-and-tidy-garage.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/380930671_330520559435623_500536854249062502_n_0.webp | Description TBD | src/content/blog/wood-lockers-vs-metal-lockers-whats-the-better-choice.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/thumbs_sports-lockers-bonnyville.jpg | Description TBD | src/content/blog/wood-lockers-vs-metal-lockers-which-is-best-for-your-team.mdx |
| https://playerstall.b-cdn.net/images/CP32D2LUYAE02Zw.jpg | Description TBD | src/content/blog/wood-vs-metal-sports-lockers-complete-2025-comparison-guide.mdx; src/pages/gallery.astro |
| https://playerstall.b-cdn.net/images/our-team-title-photo.jpg | Description TBD | src/pages/accessories.astro; src/pages/services.astro |
| https://playerstall.b-cdn.net/images/lock-box.png | Description TBD | src/pages/accessories.astro; src/pages/shipping-options/quick-ship.astro; src/pages/shipping-options.astro; src/pages/shop.astro |
| https://playerstall.b-cdn.net/images/stick-rack.png | Description TBD | src/pages/accessories.astro |
| https://playerstall.b-cdn.net/images/logoblack2.png | Description TBD | Default OG/schema logo; src/pages/contact.astro; src/pages/index.astro; src/utils/schema.ts |
| https://playerstall.b-cdn.net/images/legendary-locker.png | Description TBD | Pro/Model X locker product image; src/pages/homepage-archived.astro; src/pages/index.astro; src/pages/product-pro-locker.astro; src/pages/product-semi-pro-locker.astro; src/pages/product-varsity-locker.astro; src/pages/services.astro; src/pages/shipping-options; src/pages/shop.astro |
| https://playerstall.b-cdn.net/images/semi-pro-locker-new.png | Description TBD | src/pages/homepage-archived.astro; src/pages/index.astro; src/pages/shipping-options; src/pages/shop.astro |
| https://playerstall.b-cdn.net/images/player-img-10.jpg | Description TBD | src/pages/homepage-archived.astro; src/pages/our-process.astro; src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/player-img-11.jpg | Description TBD | src/pages/homepage-archived.astro; src/pages/our-process.astro |
| https://playerstall.b-cdn.net/images/player-img-12.jpg | Description TBD | src/pages/homepage-archived.astro; src/pages/our-process.astro; src/pages/services.astro |
| https://playerstall.b-cdn.net/images/player-img-13.jpg | Description TBD | src/pages/homepage-archived.astro; src/pages/our-process.astro |
| https://playerstall.b-cdn.net/images/h3-img-1.jpg | Description TBD | src/pages/homepage-archived.astro; src/pages/index.astro |
| https://playerstall.b-cdn.net/images/p4-img.jpg | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/p4-title-img.jpg | Description TBD | src/pages/homepage-archived.astro; src/pages/index.astro |
| https://playerstall.b-cdn.net/images/stadium-goalpost-playerstall-lockers.jpg | Description TBD | src/pages/index.astro |
| https://playerstall.b-cdn.net/images/h2-rev-slide-4.jpg | Description TBD | src/pages/index.astro |
| https://playerstall.b-cdn.net/images/h2-img-2.jpg | Description TBD | src/pages/index.astro |
| https://playerstall.b-cdn.net/images/h1-img-3.jpg | Description TBD | src/pages/index.astro; src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/h3-rev-img-2.png | Description TBD | src/pages/locations.astro |
| https://playerstall.b-cdn.net/images/title-our-history.jpg | Description TBD | src/pages/our-process-1.astro; src/pages/timeline-demo.astro |
| https://playerstall.b-cdn.net/images/h3-blog-img-7.jpg | Description TBD | src/pages/our-process.astro |
| https://playerstall.b-cdn.net/images/h3-blog-img-2.jpg | Description TBD | src/pages/our-process.astro |
| https://playerstall.b-cdn.net/images/h3-blog-img-3.jpg | Description TBD | src/pages/our-process.astro |
| https://playerstall.b-cdn.net/images/h3-blog-img-4.jpg | Description TBD | src/pages/our-process.astro |
| https://playerstall.b-cdn.net/images/wood-lockers-team-discount.jpg | Description TBD | src/pages/product-wood-locker-bench.astro |
| https://playerstall.b-cdn.net/images/wood-locer-room-front-2.png | Description TBD | src/pages/product-wood-locker-bench.astro |
| https://playerstall.b-cdn.net/images/cushion-logo.png | Description TBD | src/pages/services.astro |
| https://playerstall.b-cdn.net/images/coat-rod.png | Description TBD | src/pages/services.astro |
| https://playerstall.b-cdn.net/images/wall-hook.png | Description TBD | src/pages/services.astro |
| https://playerstall.b-cdn.net/images/name-plate.png | Description TBD | src/pages/services.astro |
| https://playerstall.b-cdn.net/images/skate-hook.png | Description TBD | src/pages/services.astro |
| https://playerstall.b-cdn.net/images/custom-logo-example.png | Description TBD | src/pages/services.astro |
| https://playerstall.b-cdn.net/images/h2-blog-img-2-1-nobg.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/player-img-6.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/player-img-11-nobg.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/basketball-player-standing-nobg.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/soccer-player.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/lacrosse-player-nobg.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/hockey-player.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/basketball-player.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/baseball-player.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/player-football-blue-orange.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/h3-banner-img-1.jpg | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/basketball-team-lineup.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/h2-img-1.jpg | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/soccer-field-aerial.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/lacrosse-field-closeup.png | Description TBD | src/pages/sport/[sport].astro |
| https://playerstall.b-cdn.net/images/hockey-faceoff.png | Description TBD | src/pages/timeline-demo.astro |
| https://playerstall.b-cdn.net/images/hockey-logo.png | Description TBD | src/pages/timeline-demo.astro |
| *(Plus gallery.astro and other page-specific CDN images – run `node scripts/audit-image-links.js` to refresh)* | | |
| https://playerstall.b-cdn.net/images/football-lockers-bonnyville2.jpg | Custom wood football lockers – heroImage | src/content/blog/texas-football-wood-lockers-complete-guide.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/IMG_8075.jpg | Football stadium exterior – body image | src/content/blog/texas-football-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/Athletic-Lockers-Stadium.jpg | Stadium locker product shot – body image | src/content/blog/texas-football-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/Athletic-Locker-Pro.jpg | Pro locker product shot – heroImage | src/content/blog/how-much-do-sports-lockers-cost-2026-pricing-guide.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/Wood-Lockers-UBC-1024x1024.jpg | UBC collegiate wood lockers – body image | src/content/blog/how-much-do-sports-lockers-cost-2026-pricing-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/blog-post-custom-lockers.jpg | Custom lockers blog image – body image | src/content/blog/how-much-do-sports-lockers-cost-2026-pricing-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/EkPbSwSXcAA172U.jpg | Athletic lockers general – heroImage | src/content/blog/baseball-wood-lockers-complete-guide.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/UARK.jpeg | University of Arkansas locker room – body image | src/content/blog/baseball-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/20201110_154836.jpg | Locker room photo – body image | src/content/blog/baseball-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/IMG_4360.jpg | General locker room – heroImage | src/content/blog/lacrosse-wood-lockers-complete-guide.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/Skating-Institute-athletic-lockers.jpg | Athletic institute lockers – body image | src/content/blog/lacrosse-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/PXL_20230210_105210772.jpg | Locker room general – body image | src/content/blog/lacrosse-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/Cc_PT6YUEAEIJb8.jpg | Team-branded athletic lockers – heroImage | src/content/blog/athletic-director-locker-room-planning-guide.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/college-bois-boulogne-vestiaires-1.jpg | College locker room – body image | src/content/blog/athletic-director-locker-room-planning-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/langley-rivermen-locker-room.PNG | Langley Rivermen locker room – body image | src/content/blog/athletic-director-locker-room-planning-guide.mdx (body) |

| https://playerstall.b-cdn.net/images/Airdrie-1.jpg | Airdrie team locker room – heroImage | src/content/blog/soccer-wood-lockers-complete-guide.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/sports-lockers-basement-1.jpg | Sports lockers in home/basement setting | src/content/blog/soccer-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/CP32AH-UAAERMBy.jpg | Athletic lockers general | src/content/blog/soccer-wood-lockers-complete-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/Surrey-Locker-Room.jpg | Surrey locker room – heroImage | src/content/blog/locker-room-renovation-summer-planning-guide.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/Athletic-Lockers-Stadium.jpg | Stadium locker product shot | src/content/blog/locker-room-renovation-summer-planning-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/lockerroom2.JPG | Interior locker room | src/content/blog/locker-room-renovation-summer-planning-guide.mdx (body) |
| https://playerstall.b-cdn.net/images/hockey-lockers-tahoe.jpg | Hockey lockers Tahoe facility | src/content/blog/locker-room-design-athlete-recovery-wellness.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/FHS-Room.jpg | FHS locker room | src/content/blog/locker-room-design-athlete-recovery-wellness.mdx (body) |
| https://playerstall.b-cdn.net/images/Airdrie-1.jpg | Airdrie locker room | src/content/blog/locker-room-design-athlete-recovery-wellness.mdx (body) |
| https://playerstall.b-cdn.net/images/college-bois-boulogne-vestiaires-1.jpg | College locker room | src/content/blog/how-to-get-budget-approval-locker-room-upgrade.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/athletic-lockers-blazers.jpg | Athletic lockers Blazers program | src/content/blog/how-to-get-budget-approval-locker-room-upgrade.mdx (body) |
| https://playerstall.b-cdn.net/images/langley-rivermen-locker-room.PNG | Langley Rivermen locker room | src/content/blog/how-to-get-budget-approval-locker-room-upgrade.mdx (body) |
| https://playerstall.b-cdn.net/images/IMG_4360.jpg | General locker room | src/content/blog/psychology-of-locker-room-design.mdx (heroImage) |
| https://playerstall.b-cdn.net/images/hockeyville-hockey-lockers.jpg | Hockeyville hockey lockers | src/content/blog/psychology-of-locker-room-design.mdx (body) |
| https://playerstall.b-cdn.net/images/20151002_202910.jpg | Locker room photo 2015 | src/content/blog/psychology-of-locker-room-design.mdx (body) |

### images/customer-lockers/

| URL / Path | Description | Used in |
|------------|-------------|---------|
| https://playerstall.b-cdn.net/images/customer-lockers/playerstall-sports-locker.png | Spacious sports locker room with custom wooden lockers, jerseys, helmets, seating | src/content/blog/from-junior-a-to-ncaa-what-the-best-programs-do-differently-with-their-lockers.mdx |

### images/topscorer/

| URL / Path | Description | Used in |
|------------|-------------|---------|
| https://playerstall.b-cdn.net/images/topscorer/our-team-title-photo.jpg | Description TBD | src/pages/hockey.astro; src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/h1-img-2.jpg | Description TBD | src/pages/hockey.astro |
| https://playerstall.b-cdn.net/images/topscorer/h3-img-1.jpg | Description TBD | src/pages/hockey.astro; src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/basketball-dribble.png | Description TBD | src/pages/hockey.astro |
| https://playerstall.b-cdn.net/images/topscorer/h2-blog-img-2-1.jpg | Description TBD | src/pages/hockey.astro |
| https://playerstall.b-cdn.net/images/topscorer/soccer.jpg | Description TBD | src/pages/hockey.astro |
| https://playerstall.b-cdn.net/images/topscorer/client-1.png through client-10.png | Description TBD | src/pages/hockey.astro |
| https://playerstall.b-cdn.net/images/topscorer/h3-blog-img-1.jpg through h3-blog-img-4.jpg | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/player-img-10.jpg | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/soccer-player.png | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/hockey-player.png | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/basketball-player.png | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/baseball-player.png | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/player-football-blue-orange.png | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/blog-1-masonry-img-1.jpg, blog-1-masonry-img-2.jpg | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/h2-img-1.jpg, h2-img-2.jpg, h2-img-3.jpg | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/topscorer/h3-img-2.jpg, h1-img-3.jpg, h2-rev-slide-4.jpg | Description TBD | src/pages/homepage-archived.astro |

### images/gallery/

| URL / Path | Description | Used in |
|------------|-------------|---------|
| https://playerstall.b-cdn.net/images/gallery/langley-rivermen-locker-room.PNG | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/gallery/Surrey-Locker-Room.jpg | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/gallery/college-bois-boulogne-vestiaires-1.jpg | Description TBD | src/pages/homepage-archived.astro |
| https://playerstall.b-cdn.net/images/gallery/athletic-lockers-blazers.jpg | Description TBD | src/pages/homepage-archived.astro |

---

## Local (public/images)

Files in the repo served at `/images/`.

| Path | Description | Used in |
|------|-------------|---------|
| /images/varsity-locker.png | Varsity locker product image | src/pages/index.astro; src/pages/product-varsity-locker.astro; src/pages/services.astro; src/pages/shipping-options; src/pages/shop.astro |
| /images/stadium-locker-side.png | Stadium locker side view | src/pages/product-stadium-locker.astro; src/pages/pdf/stadium-locker-spec.astro; src/pages/shop.astro |
| /images/elite-locker-side.png | Elite locker side view | src/pages/product-elite-locker.astro; src/pages/pdf/elite-locker-spec.astro; src/pages/shop.astro |
| /images/model-x-website-images/model-x-locker-side.png | Model X locker side view | src/pages/product-legendary-locker.astro; src/pages/pdf/model-x-locker-spec.astro; src/pages/shop.astro |
| /images/elite-locker.png | Elite locker front view | src/pages/product-elite-locker.astro; src/pages/services.astro; src/pages/shipping-options.astro |
| /images/elite-locker-graphite.png | Elite locker graphite finish | src/pages/product-elite-locker.astro; src/pages/pdf/elite-locker-spec.astro |
| /images/elite-locker-vent-panel.png | Elite locker vented panel | src/pages/product-elite-locker.astro; src/pages/shop.astro |
| /images/lock-box-spec-sheet.png | Lock box spec sheet | src/pages/pdf/elite-locker-spec.astro; src/pages/pdf/model-x-locker-spec.astro; src/pages/pdf/stadium-locker-spec.astro |
| /images/model-x-website-images/model-x-locker.png | Model X locker front | src/pages/product-legendary-locker.astro; src/pages/pdf/model-x-locker-spec.astro |
| /images/model-x-website-images/model-x-locker-black.png | Model X locker black | src/pages/product-legendary-locker.astro; src/pages/pdf/model-x-locker-spec.astro |
| /images/model-x-website-images/model-x-locker-vent-panel.png | Model X vent panel | src/pages/product-legendary-locker.astro; src/pages/pdf/model-x-locker-spec.astro |
| /images/stadium-locker.png | Stadium locker front view | src/pages/product-stadium-locker.astro; src/pages/services.astro; src/pages/shipping-options.astro |
| /images/stadium-locker-third.png | Stadium locker alternate view | src/pages/product-stadium-locker.astro; src/pages/pdf/stadium-locker-spec.astro |
| /images/stadium-locker-vent-panel.png | Stadium vented panel | src/pages/product-stadium-locker.astro; src/pages/pdf/stadium-locker-spec.astro |
| /images/semi-pro-locker-side.png | Semi pro locker side | src/pages/product-semi-pro-locker.astro |
| /images/semi-pro-locker-third.png | Semi pro locker alternate | src/pages/product-semi-pro-locker.astro |
| /images/pro-locker-quick-ship.png | Pro locker quick ship | src/pages/shipping-options/quick-ship.astro |

---

## playerstall.com (legacy)

WordPress wp-content URLs. **Migration:** move to CDN when possible.

| URL | Description | Used in | Migration |
|-----|-------------|---------|-----------|
| https://playerstall.com/wp-content/uploads/2023/01/Skating-Institute-athletic-lockers.jpg | Skating Institute athletic lockers locker room | src/content/blog/playerstall-sports-lockers-is-your-recruiting-edge.mdx (migrated) | **Migrated to CDN**: `https://playerstall.b-cdn.net/images/Skating-Institute-athletic-lockers.jpg` |
| https://playerstall.com/wp-content/uploads/2026/01/image.png | Legacy image from college buyer guide | src/content/blog/college-sports-lockers-buyer-guide.mdx (migrated) | **Migrated to CDN**: `https://playerstall.b-cdn.net/images/UARK.jpeg` |
| https://playerstall.com/wp-content/uploads/2024/11/42290715_2186416818098517_3457536062979571712_n-1.jpg | Locker room photo (was bottom of top-5-locker-room-must-haves-for-collegiate-teams.mdx) | **Removed** — replaced with CDN: `https://playerstall.b-cdn.net/images/lockerroom2.JPG` | Migrate to CDN |
| https://playerstall.com/wp-content/uploads/2024/11/college-bois-boulogne-vestiaires-1-1-576x1024.jpg | Sized variant of college-bois-boulogne photo (was in beyond-the-game-how-locker-room-upgrades post) | Removed from src/content/blog/beyond-the-game-how-locker-room-upgrades-can-impress-recruits-and-elevate-your-program.mdx | **Migrated to CDN**: `https://playerstall.b-cdn.net/images/college-bois-boulogne-vestiaires-1.jpg` |
| https://playerstall.com/wp-content/uploads/2022/12/20151116_145101-1024x576.jpg | Locker room photo (legacy inline body image) | Removed from src/content/blog/professional-locker-rooms-help-recruitment.mdx | **Migrated to CDN**: `https://playerstall.b-cdn.net/images/UARK.jpeg` |
| https://playerstall.com/wp-content/uploads/2022/12/CRZLLgCVEAQhDOL.jpg | Rhinos locker room photo (legacy) | Removed from src/content/blog/wood-lockers-attract-the-best-talent.mdx | **Replaced** with CDN images (`langley-rivermen-locker-room.PNG`, `UARK.jpeg`) |
| /wp-content/gallery/Sports-Locker-Rooms/thumbs/thumbs_UARK.jpeg | UARK locker room thumbnail (legacy relative path) | Removed from src/content/blog/from-college-dreams-to-pro-teams-how-lockers-tell-a-players-story.mdx | **Migrated to CDN**: `https://playerstall.b-cdn.net/images/UARK.jpeg` |
| https://playerstall.com/wp-content/gallery/Sports-Locker-Rooms/athletic-lockers-blazers.jpg | Legacy Blazers locker room photo | Removed from src/content/blog/wood-lockers-the-1-choice-for-college-sports-locker-rooms.mdx | **Migrated to CDN**: `https://playerstall.b-cdn.net/images/athletic-lockers-blazers.jpg` |
| *(Many entries – run `node scripts/audit-image-links.js` for full list)* | | | Migrate to CDN |

See script output for the complete list of playerstall.com wp-content image URLs used in blog MDX and services.astro.

---

## topscorer.qodeinteractive.com

External theme assets. **Migration:** consider copying to CDN.

| URL | Description | Used in | Migration |
|-----|-------------|---------|-----------|
| https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-6-300x420.jpg | Description TBD | src/pages/index.astro | Migrate to CDN |
| https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-8-300x420.jpg | Description TBD | src/pages/index.astro | Migrate to CDN |
| https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/romans-img.png | Description TBD | src/pages/index.astro | Migrate to CDN |
| https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-4-300x420.jpg | Description TBD | src/pages/index.astro | Migrate to CDN |

---

## customsportslockers.com

Legacy. **Migration:** move to CDN when possible.

| URL | Description | Used in | Migration |
|-----|-------------|---------|-----------|
| https://customsportslockers.com/wp-content/uploads/2022/12/athletic-lockers-Playerstall-768x1024.jpg | Description TBD | src/content/blog/sports-lockers-help-recruitment.mdx | Migrate to CDN |

---

**To refresh this directory from the codebase:** run `node scripts/audit-image-links.js` and merge new or changed rows into the tables above. Replace "Description TBD" with short descriptions as you go.

#!/bin/bash

# Script to clean up successfully converted draft files

cd "$(dirname "$0")/.."

# List of files that were successfully converted to MDX
FILES_TO_DELETE=(
  "5-signs-its-time-to-upgrade-your-locker-room-with-the-best-lockers-for-sale.astro"
  "a-good-looking-locker-room-is-good-business.astro"
  "a-sports-locker-keep-you-clean.astro"
  "building-a-championship-team-culture.astro"
  "great-looking-locker-rooms-helps-kids-confidence.astro"
  "help-out-morale-with-a-sports-locker.astro"
  "how-to-choose-sports-lockers.astro"
  "introduction-the-great-locker-debate.astro"
  "level-up-your-mudroom-using-wood-lockers.astro"
  "locker-room-faux-pas-top-10-design-mistakes-coaches-make-and-how-to-avoid-them.astro"
  "locker-room-lockers-that-last.astro"
  "mudroom-lockers-are-a-great-addition-for-young-athletes.astro"
  "new-wood-lockers-for-sale.astro"
  "playerstall-sports-lockers-for-the-people.astro"
  "playerstall-sports-lockers-is-your-recruiting-edge.astro"
  "playerstall-your-sports-locker-pros.astro"
  "plywood-vs-mdf-which-one-is-better-for-sports-lockers.astro"
  "save-your-sanity-and-get-a-mudroom-locker.astro"
  "sports-equipment-storage-will-keep-your-gear-healthy.astro"
  "sports-locker-prevent-bacteria-and-stinky-equipment.astro"
  "sports-lockers-build-a-locker-room-that-wins.astro"
  "sports-lockers-complete-storage-solution.astro"
  "sports-lockers-help-avoid-sports-related-infections.astro"
  "sports-lockers-help-recruitment.astro"
  "sports-lockers-keep-garage-organized.astro"
  "sports-lockers-local-sports-team.astro"
  "sports-lockers-safety-tips.astro"
  "sports-lockers-select-best-one.astro"
  "sports-lockers-selection-guide-what-matters.astro"
  "sports-lockers-storage-problem-solved.astro"
  "sports-lockers-to-upgrade-your-locker-room.astro"
  "sports-lockers-whats-the-difference-between-plywood-and-mdf.astro"
  "sportsequipmentstorage.astro"
  "storage-solution-using-sports-lockers.astro"
  "take-back-mudroom-garage-playerstall-sports-lockers.astro"
  "the-gross-truth-about-sports-equipment-why-clean-lockers-matter-more-than-you-think.astro"
  "title-from-metal-boxes-to-custom-wood-lockers-how-sports-lockers-evolved-with-the-game.astro"
  "top-5-locker-room-must-haves-for-collegiate-teams.astro"
  "up-your-game-with-a-professional-locker-room.astro"
  "whats-inside-a-football-locker-7-essentials-every-player-needs.astro"
  "why-choose-wood-lockers-for-your-sports-team.astro"
  "why-wood-lockers-are-better-than-metal-lockers.astro"
  "wood-lockers-are-the-best-choice-for-locker-room-lockers.astro"
  "wood-lockers-are-the-right-choice.astro"
  "wood-lockers-attract-the-best-talent.astro"
  "wood-lockers-dry.astro"
  "wood-lockers-for-the-neat-and-tidy-garage.astro"
  "wood-lockers-help-keep-equipment-clean.astro"
  "wood-lockers-help-kids-feel-more-professional.astro"
  "wood-lockers-vs-metal-lockers-whats-the-better-choice.astro"
  "wood-lockers-vs-metal-lockers-which-is-best-for-your-team.astro"
  "wood-lockers-will-save-you-valuable-time.astro"
  "wood-vs-metal-lockers-whats-best-for-your-athletic-facility.astro"
  "wood-vs-metal-sports-lockers-complete-2025-comparison-guide.astro"
  "wood-vs-metal-sports-lockers-what-weve-learned-after-30-years.astro"
)

# Files that were moved to published blog (comprehensive guides)
MOVED_FILES=(
  "7-step-locker-room-planning-process.astro"
  "building-championship-culture.astro"
  "complete-guide-customizing-sports-lockers.astro"
  "how-to-choose-sports-lockers-2025.astro"
  "locker-room-installation-guide.astro"
  "maintaining-wood-lockers.astro"
  "true-cost-sports-lockers-roi.astro"
  "why-modular-design-matters.astro"
  "wood-vs-metal-sports-lockers-comparison.astro"
)

DELETED_COUNT=0

echo "🗑️  Cleaning up drafts folder..."
echo ""

# Delete converted MDX files
for file in "${FILES_TO_DELETE[@]}"; do
  if [ -f "src/pages/blog/drafts/$file" ]; then
    rm "src/pages/blog/drafts/$file"
    echo "✅ Deleted (converted to MDX): $file"
    ((DELETED_COUNT++))
  fi
done

# Delete moved comprehensive guides
for file in "${MOVED_FILES[@]}"; do
  if [ -f "src/pages/blog/drafts/$file" ]; then
    rm "src/pages/blog/drafts/$file"
    echo "✅ Deleted (moved to blog): $file"
    ((DELETED_COUNT++))
  fi
done

echo ""
echo "=" | tr '=' '=' | head -c 50
echo ""
echo "✨ Cleanup complete!"
echo "   Files deleted: $DELETED_COUNT"
echo "   Files remaining in drafts: $(ls -1 src/pages/blog/drafts/ | wc -l | tr -d ' ')"
echo "=" | tr '=' '=' | head -c 50

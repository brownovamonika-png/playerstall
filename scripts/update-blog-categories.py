#!/usr/bin/env python3
"""
Script to systematically update blog post categories and tags based on SEO strategy.
"""

import os
import re
from pathlib import Path

# Define the mapping of blog posts to their categories and tags
CATEGORIZATIONS = {
    # Comparison posts - Wood vs Metal
    "wood-lockers-vs-metal-lockers-which-is-best-for-your-team.mdx": {
        "category": "Comparisons",
        "tags": ["wood-lockers", "metal-lockers", "comparison", "durability", "buying-guide", "team-culture", "collegiate-teams"]
    },
    
    # Hockey posts
    "hockey-wood-lockers-complete-2025-guide-for-ice-hockey-teams.mdx": {
        "category": "Hockey",
        "tags": ["hockey", "wood-lockers", "buying-guide", "equipment-storage", "stick-racks", "organization", "durability"]
    },
    "hockey-stick-racks.mdx": {
        "category": "Hockey",
        "tags": ["hockey", "stick-racks", "organization", "equipment-storage"]
    },
    "use-a-stick-rack-to-keep-your-sticks-organized.mdx": {
        "category": "Hockey",
        "tags": ["hockey", "stick-racks", "organization", "equipment-storage"]
    },
    "stick-racks-smelly-socks-how-to-tame-the-chaos-in-a-hockey-locker-room.mdx": {
        "category": "Hockey",
        "tags": ["hockey", "organization", "equipment-care", "bacteria-prevention", "maintenance"]
    },
    "sports-lockers-equipment-good-shape.mdx": {
        "category": "Hockey",
        "tags": ["hockey", "equipment-care", "maintenance", "organization"]
    },
    
    # Football posts
    "football-lockers-101-building-the-perfect-setup-for-your-team-locker-room.mdx": {
        "category": "Football",
        "tags": ["football", "locker-room-design", "buying-guide", "team-culture", "organization"]
    },
    "football-lockers-stinky-football-gear.mdx": {
        "category": "Football",
        "tags": ["football", "equipment-care", "bacteria-prevention", "maintenance"]
    },
    "football-locker-room-design-guide.mdx": {
        "category": "Football",
        "tags": ["football", "locker-room-design", "buying-guide", "collegiate-teams", "budget"]
    },
    "organize-your-football-locker.mdx": {
        "category": "Football",
        "tags": ["football", "organization", "equipment-storage"]
    },
    "whats-inside-a-football-locker-7-essentials-every-player-needs.mdx": {
        "category": "Football",
        "tags": ["football", "equipment-storage", "organization"]
    },
    "whats-inside-a-football-locker-7-essentials-every-player-needs-2.mdx": {
        "category": "Football",
        "tags": ["football", "equipment-storage", "organization"]
    },
    "behind-the-locker-doors-secrets-to-long-lasting-football-lockers.mdx": {
        "category": "Football",
        "tags": ["football", "durability", "maintenance", "wood-lockers"]
    },
    "beyond-the-stadium-10-game-day-rituals-every-football-fan-needs-to-try.mdx": {
        "category": "Football",
        "tags": ["football", "team-culture"]
    },
    "clean-football-equipment.mdx": {
        "category": "Football",
        "tags": ["football", "equipment-care", "maintenance", "bacteria-prevention"]
    },
    
    # College Athletics / Recruiting
    "college-sports-lockers-buyer-guide.mdx": {
        "category": "College Athletics",
        "tags": ["collegiate-teams", "buying-guide", "wood-lockers", "locker-room-design"]
    },
    "wood-lockers-the-1-choice-for-college-sports-locker-rooms.mdx": {
        "category": "College Athletics",
        "tags": ["collegiate-teams", "wood-lockers", "team-culture", "recruiting"]
    },
    "top-5-locker-room-must-haves-for-collegiate-teams.mdx": {
        "category": "College Athletics",
        "tags": ["collegiate-teams", "locker-room-design", "buying-guide"]
    },
    "from-junior-a-to-ncaa-what-the-best-programs-do-differently-with-their-lockers.mdx": {
        "category": "College Athletics",
        "tags": ["collegiate-teams", "professional-teams", "locker-room-design", "team-culture"]
    },
    "from-college-dreams-to-pro-teams-how-lockers-tell-a-players-story.mdx": {
        "category": "College Athletics",
        "tags": ["collegiate-teams", "professional-teams", "team-culture"]
    },
    
    # Recruiting-focused
    "beyond-the-game-how-locker-room-upgrades-can-impress-recruits-and-elevate-your-program.mdx": {
        "category": "College Athletics",
        "tags": ["recruiting", "locker-room-design", "collegiate-teams", "team-culture"]
    },
    "wood-lockers-attract-the-best-talent.mdx": {
        "category": "College Athletics",
        "tags": ["recruiting", "wood-lockers", "team-culture", "collegiate-teams"]
    },
    "sports-lockers-help-recruitment.mdx": {
        "category": "College Athletics",
        "tags": ["recruiting", "locker-room-design", "team-culture", "collegiate-teams"]
    },
    "professional-locker-rooms-help-recruitment.mdx": {
        "category": "College Athletics",
        "tags": ["recruiting", "locker-room-design", "team-culture", "collegiate-teams"]
    },
    "playerstall-sports-lockers-is-your-recruiting-edge.mdx": {
        "category": "College Athletics",
        "tags": ["recruiting", "team-culture", "collegiate-teams"]
    },
    "how-a-quality-locker-room-can-improve-team-performance-and-recruiting-power.mdx": {
        "category": "College Athletics",
        "tags": ["recruiting", "locker-room-design", "team-culture", "collegiate-teams"]
    },
    
    # Locker Room Design
    "locker-room-goals-creating-a-winning-atmosphere-off-the-field.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "team-culture", "collegiate-teams"]
    },
    "locker-room-faux-pas-top-10-design-mistakes-coaches-make-and-how-to-avoid-them.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "buying-guide", "collegiate-teams"]
    },
    "the-anatomy-of-a-perfect-locker-room-must-have-features-for-every-team.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "buying-guide", "team-culture"]
    },
    "sports-lockers-build-a-locker-room-that-wins.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "team-culture", "wood-lockers"]
    },
    "a-nice-locker-room-makes-your-team-look-pro.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "team-culture", "professional-teams"]
    },
    "up-your-game-with-a-professional-locker-room.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "team-culture", "professional-teams"]
    },
    "a-good-looking-locker-room-is-good-business.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "recruiting", "team-culture"]
    },
    "great-looking-locker-rooms-helps-kids-confidence.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "team-culture", "high-school"]
    },
    "from-basic-to-pro-transforming-your-locker-room-on-any-budget.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "budget", "buying-guide"]
    },
    "building-a-championship-team-culture.mdx": {
        "category": "Locker Room Design",
        "tags": ["team-culture", "locker-room-design", "collegiate-teams"]
    },
    "how-the-right-sports-lockers-elevate-your-teams-locker-room.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "team-culture", "wood-lockers"]
    },
    
    # Home Storage / Mudroom
    "take-back-mudroom-garage-playerstall-sports-lockers.mdx": {
        "category": "Home Storage",
        "tags": ["mudroom", "garage-storage", "organization", "wood-lockers"]
    },
    "mudroom-lockers-are-a-great-addition-for-young-athletes.mdx": {
        "category": "Home Storage",
        "tags": ["mudroom", "organization", "high-school"]
    },
    "level-up-your-mudroom-using-wood-lockers.mdx": {
        "category": "Home Storage",
        "tags": ["mudroom", "wood-lockers", "organization"]
    },
    "save-your-sanity-and-get-a-mudroom-locker.mdx": {
        "category": "Home Storage",
        "tags": ["mudroom", "organization"]
    },
    "wood-lockers-for-the-neat-and-tidy-garage.mdx": {
        "category": "Home Storage",
        "tags": ["garage-storage", "wood-lockers", "organization"]
    },
    "sports-lockers-keep-garage-organized.mdx": {
        "category": "Home Storage",
        "tags": ["garage-storage", "organization"]
    },
    
    # Maintenance & Care / Equipment Care
    "the-gross-truth-about-sports-equipment-why-clean-lockers-matter-more-than-you-think.mdx": {
        "category": "Maintenance & Care",
        "tags": ["bacteria-prevention", "equipment-care", "maintenance"]
    },
    "sports-equipment-storage-will-keep-your-gear-healthy.mdx": {
        "category": "Maintenance & Care",
        "tags": ["equipment-storage", "equipment-care", "maintenance"]
    },
    "sport-equipment-storage.mdx": {
        "category": "Maintenance & Care",
        "tags": ["equipment-storage", "bacteria-prevention", "maintenance"]
    },
    "sports-locker-prevent-bacteria-and-stinky-equipment.mdx": {
        "category": "Maintenance & Care",
        "tags": ["bacteria-prevention", "equipment-care", "maintenance"]
    },
    "sports-lockers-help-avoid-sports-related-infections.mdx": {
        "category": "Maintenance & Care",
        "tags": ["bacteria-prevention", "equipment-care", "maintenance"]
    },
    "a-sports-locker-keep-you-clean.mdx": {
        "category": "Maintenance & Care",
        "tags": ["bacteria-prevention", "equipment-care"]
    },
    "simple-tips-keep-sports-equipment-top-shape.mdx": {
        "category": "Maintenance & Care",
        "tags": ["equipment-care", "maintenance"]
    },
    "wood-lockers-help-keep-equipment-clean.mdx": {
        "category": "Maintenance & Care",
        "tags": ["wood-lockers", "equipment-care", "bacteria-prevention"]
    },
    "athletic-lockers-disinfection.mdx": {
        "category": "Maintenance & Care",
        "tags": ["bacteria-prevention", "maintenance", "equipment-care"]
    },
    "athletic-lockers-dont-damage-equipment.mdx": {
        "category": "Maintenance & Care",
        "tags": ["equipment-care", "maintenance"]
    },
    "athletic-lockers-safety-tips-locker-room.mdx": {
        "category": "Maintenance & Care",
        "tags": ["maintenance", "equipment-care"]
    },
    "sports-lockers-safety-tips.mdx": {
        "category": "Maintenance & Care",
        "tags": ["maintenance"]
    },
    
    # Buying Guides / Selection
    "choose-best-sports-lockers-find.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "wood-lockers", "metal-lockers"]
    },
    "sports-lockers-selection-guide-what-matters.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "wood-lockers", "locker-room-design"]
    },
    "sports-lockers-select-best-one.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "wood-lockers", "metal-lockers"]
    },
    "choose-athletic-lockers.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "wood-lockers"]
    },
    "lockers-for-sale.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "wood-lockers", "custom-lockers"]
    },
    "new-wood-lockers-for-sale.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "wood-lockers", "custom-lockers"]
    },
    "5-signs-its-time-to-upgrade-your-locker-room-with-the-best-lockers-for-sale.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "locker-room-design", "wood-lockers"]
    },
    "cheap-lockers.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "budget", "durability"]
    },
    "the-locker-room-ordering-experience-youve-been-waiting-for.mdx": {
        "category": "Buying Guides",
        "tags": ["buying-guide", "custom-lockers"]
    },
    
    # Material Comparisons
    "plywood-vs-mdf-which-one-is-better-for-sports-lockers.mdx": {
        "category": "Comparisons",
        "tags": ["wood-lockers", "comparison", "buying-guide", "durability"]
    },
    "sports-lockers-whats-the-difference-between-plywood-and-mdf.mdx": {
        "category": "Comparisons",
        "tags": ["wood-lockers", "comparison", "buying-guide"]
    },
    "introduction-the-great-locker-debate.mdx": {
        "category": "Comparisons",
        "tags": ["wood-lockers", "metal-lockers", "comparison"]
    },
    
    # Wood Lockers - General Benefits
    "wood-lockers-are-the-best-choice-for-locker-room-lockers.mdx": {
        "category": "Buying Guides",
        "tags": ["wood-lockers", "durability", "locker-room-design"]
    },
    "wood-lockers-are-the-right-choice.mdx": {
        "category": "Buying Guides",
        "tags": ["wood-lockers", "durability"]
    },
    "quality-wood-lockers-make-life-easier.mdx": {
        "category": "Buying Guides",
        "tags": ["wood-lockers", "organization"]
    },
    "making-life-easier-wood-lockers.mdx": {
        "category": "Buying Guides",
        "tags": ["wood-lockers", "organization"]
    },
    "wood-lockers-will-save-you-valuable-time.mdx": {
        "category": "Buying Guides",
        "tags": ["wood-lockers", "organization", "maintenance"]
    },
    "wood-lockers-help-kids-feel-more-professional.mdx": {
        "category": "Locker Room Design",
        "tags": ["wood-lockers", "team-culture", "high-school"]
    },
    "why-choose-wood-lockers-for-your-sports-team.mdx": {
        "category": "Buying Guides",
        "tags": ["wood-lockers", "durability", "team-culture"]
    },
    "why-wood-lockers-are-making-a-comeback-in-modern-locker-rooms.mdx": {
        "category": "Comparisons",
        "tags": ["wood-lockers", "locker-room-design", "team-culture"]
    },
    "why-coaches-love-custom-wood-sports-lockers-function-meets-grit.mdx": {
        "category": "Locker Room Design",
        "tags": ["wood-lockers", "custom-lockers", "team-culture", "durability"]
    },
    "locker-room-lockers-that-last.mdx": {
        "category": "Buying Guides",
        "tags": ["wood-lockers", "durability", "maintenance"]
    },
    "title-from-metal-boxes-to-custom-wood-lockers-how-sports-lockers-evolved-with-the-game.mdx": {
        "category": "Comparisons",
        "tags": ["wood-lockers", "metal-lockers", "custom-lockers", "team-culture"]
    },
    
    # DIY / Custom
    "wood-lockers-dry.mdx": {
        "category": "Maintenance & Care",
        "tags": ["wood-lockers", "maintenance", "equipment-care"]
    },
    
    # General / Organization
    "best-sports-equipment-storage-solution.mdx": {
        "category": "Buying Guides",
        "tags": ["equipment-storage", "organization"]
    },
    "storage-solution-using-sports-lockers.mdx": {
        "category": "Buying Guides",
        "tags": ["equipment-storage", "organization"]
    },
    "sports-lockers-complete-storage-solution.mdx": {
        "category": "Buying Guides",
        "tags": ["equipment-storage", "organization", "wood-lockers"]
    },
    "sports-lockers-storage-problem-solved.mdx": {
        "category": "Buying Guides",
        "tags": ["equipment-storage", "organization"]
    },
    "sportsequipmentstorage.mdx": {
        "category": "Buying Guides",
        "tags": ["equipment-storage", "organization"]
    },
    "custom-sports-locker-solutions.mdx": {
        "category": "Buying Guides",
        "tags": ["custom-lockers", "equipment-storage", "organization"]
    },
    "custom-sports-lockers-team.mdx": {
        "category": "Buying Guides",
        "tags": ["custom-lockers", "team-culture"]
    },
    
    # General Sports Lockers
    "sports-lockers-to-upgrade-your-locker-room.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "wood-lockers"]
    },
    "sports-lockers-local-sports-team.mdx": {
        "category": "Buying Guides",
        "tags": ["team-culture", "high-school"]
    },
    "every-athlete-needs-sports-locker.mdx": {
        "category": "Buying Guides",
        "tags": ["equipment-storage", "organization"]
    },
    "help-out-morale-with-a-sports-locker.mdx": {
        "category": "Locker Room Design",
        "tags": ["team-culture", "organization"]
    },
    
    # PlayerStall Brand
    "playerstall-your-sports-locker-pros.mdx": {
        "category": "Buying Guides",
        "tags": ["custom-lockers", "wood-lockers"]
    },
    "playerstall-sports-lockers-for-the-people.mdx": {
        "category": "Buying Guides",
        "tags": ["custom-lockers", "wood-lockers"]
    },
    "come-see-latest-sports-locker-rooms-done.mdx": {
        "category": "Locker Room Design",
        "tags": ["locker-room-design", "wood-lockers", "custom-lockers"]
    },
}


def update_frontmatter(file_path, category, tags):
    """Update the frontmatter of a blog post with new category and tags."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Use regex to find and update the frontmatter
    # Match the frontmatter block
    frontmatter_pattern = r'^---\n(.*?)\n---'
    match = re.search(frontmatter_pattern, content, re.DOTALL)
    
    if not match:
        print(f"  ⚠️  No frontmatter found in {file_path.name}")
        return False
    
    frontmatter = match.group(1)
    
    # Update category
    if 'category:' in frontmatter:
        frontmatter = re.sub(r'category:.*', f'category: "{category}"', frontmatter)
    else:
        # Add category after description if it doesn't exist
        frontmatter = re.sub(r'(description:.*\n)', f'\\1category: "{category}"\n', frontmatter)
    
    # Update or add tags
    tags_str = str(tags)  # Convert list to string representation
    if 'tags:' in frontmatter:
        frontmatter = re.sub(r'tags:.*', f'tags: {tags_str}', frontmatter)
    else:
        # Add tags after category
        frontmatter = re.sub(r'(category:.*\n)', f'\\1tags: {tags_str}\n', frontmatter)
    
    # Reconstruct the content
    new_content = content.replace(match.group(0), f'---\n{frontmatter}\n---', 1)
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True


def main():
    """Main function to update all blog posts."""
    blog_dir = Path(__file__).parent.parent / 'src' / 'content' / 'blog'
    
    if not blog_dir.exists():
        print(f"❌ Blog directory not found: {blog_dir}")
        return
    
    print("🚀 Starting blog categorization process...\n")
    
    updated_count = 0
    skipped_count = 0
    
    for filename, data in CATEGORIZATIONS.items():
        file_path = blog_dir / filename
        
        if not file_path.exists():
            print(f"  ⚠️  File not found: {filename}")
            skipped_count += 1
            continue
        
        category = data['category']
        tags = data['tags']
        
        print(f"  ✏️  Updating {filename}")
        print(f"      Category: {category}")
        print(f"      Tags: {', '.join(tags)}")
        
        if update_frontmatter(file_path, category, tags):
            updated_count += 1
            print(f"      ✅ Updated successfully\n")
        else:
            skipped_count += 1
            print(f"      ❌ Failed to update\n")
    
    print(f"\n✨ Categorization complete!")
    print(f"   Updated: {updated_count} posts")
    print(f"   Skipped: {skipped_count} posts")
    
    # Count remaining uncategorized posts
    all_posts = list(blog_dir.glob('*.mdx'))
    remaining = len(all_posts) - updated_count
    print(f"   Remaining to categorize: {remaining} posts")


if __name__ == '__main__':
    main()

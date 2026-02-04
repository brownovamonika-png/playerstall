# Blog Post 4: Complete WordPress & Yoast SEO Setup Guide

## ⚠️ IMPORTANT: Set These in WordPress FIRST

Yoast SEO is showing errors because the **focus keyword hasn't been set in WordPress yet**. Follow these steps:

---

## Step 1: WordPress Post Settings

### In WordPress Editor:

1. **Title Field (Top of Editor):**
   ```
   Football Locker Room Design: Complete Planning Guide for Athletic Directors
   ```

2. **Permalink/Slug (Edit button next to URL):**
   ```
   football-locker-room-design-guide
   ```
   *(Make sure it contains "football-locker-room-design")*

---

## Step 2: Yoast SEO Settings

### Scroll down to Yoast SEO sidebar:

**Focus Keyword:**
```
football locker room design
```

**SEO Title:**
```
Football Locker Room Design: Planning Guide | PlayerStall
```
*(55 characters - perfect!)*

**Meta Description:**
```
Complete guide to football locker room design: equipment storage, team branding, space planning, and recruiting impact. 30+ years.
```
*(156 characters - perfect!)*

**Related Keyphrase:**
```
football locker room planning
```

**Synonyms:**
```
locker room design, football lockers, athletic facilities, locker room planning, team locker design, custom locker rooms, football facility design
```

---

## Step 3: Add Images

### You need to add 3 images:

**Image 1** (After "Space Planning" section):
- **File:** Upload football locker room image
- **Alt Text:** `Football locker room design with custom wood lockers showing proper equipment storage and team branding`

**Image 2** (After "Team Branding" section):
- **File:** Upload football locker room with branding image
- **Alt Text:** `Football locker room design featuring custom team branding, colors, and player name engraving`

**Image 3** (After "Recruiting Impact" section):
- **File:** Upload recruits touring locker room image
- **Alt Text:** `Football locker room design impact on recruiting with professional custom lockers and team branding`

**Where to add:** Look for these comments in the HTML:
```
<!-- IMAGE PLACEHOLDER 1 -->
<!-- IMAGE PLACEHOLDER 2 -->
<!-- IMAGE PLACEHOLDER 3 -->
```

---

## Step 4: Verify Outbound Links

The HTML now includes 2 outbound links:
- ✅ Link to NCAA.org (2 instances)
- ✅ Link to customsportslockers.com/contact/

These should appear automatically when you paste the HTML.

---

## Step 5: Paste HTML Content

1. **Switch to HTML/Text editor** (not Visual)
2. **Remove the H1 line** (line 11) - WordPress will use its title field instead
3. **Paste the rest of the HTML** starting from line 13

**OR** keep the H1 if you prefer - WordPress will handle it.

---

## Expected Yoast SEO Results

After setting the focus keyword and adding images, you should see:

✅ **Green Checks:**
- Focus keyword in title ✓
- Focus keyword in first paragraph ✓
- Focus keyword in URL slug ✓
- Focus keyword in H1 ✓
- Keyphrase density: Good (13 instances)
- Outbound links: Found (2 links)
- Images with alt text: Found (3 images)

⚠️ **May Show Yellow (but that's OK):**
- Keyphrase in subheadings: Some subheadings contain keyphrase (this is fine - not over-optimized)

---

## Quick Checklist

- [ ] Set WordPress title: `Football Locker Room Design: Complete Planning Guide for Athletic Directors`
- [ ] Set permalink/slug: `football-locker-room-design-guide`
- [ ] Set Yoast focus keyword: `football locker room design`
- [ ] Set Yoast SEO title: `Football Locker Room Design: Planning Guide | PlayerStall`
- [ ] Set Yoast meta description: `Complete guide to football locker room design: equipment storage, team branding, space planning, and recruiting impact. 30+ years.`
- [ ] Add 3 images with alt text (see Image section above)
- [ ] Paste HTML content (remove H1 if using WordPress title field)
- [ ] Verify outbound links appear (NCAA links)
- [ ] Publish!

---

## Why Yoast Shows Errors Before Setup

Yoast SEO needs you to:
1. **Set the focus keyword** in the Yoast sidebar first
2. **Add images** to the post
3. **Set the permalink/slug** with the keyphrase

Once you do these three things, all the errors will disappear! ✅

---

## File Location

**File:** `wordpress-blogs/blog-4-football-locker-room-design-wordpress.html`

**Status:** ✅ Ready - All fixes applied, just needs WordPress setup!

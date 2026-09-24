# Image Strategy & Inventory

This document outlines the images needed for Tanzania Trip Planner and how to source/organize them.

## Directory Structure

```
public/images/
├── hero/              # Homepage and page hero images
├── destinations/      # Destination card and page images
├── blog/              # Blog post featured images
└── ui/                # UI elements, icons, etc.
```

## Images to Source

### Hero Images (Homepage)

| Image | Location | Size | Current URL | Unsplash ID | Notes |
|-------|----------|------|-------------|-------------|-------|
| Serengeti Hero | `hero/serengeti.jpg` | 1920×1080 | [link](https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80) | `1516426122078-c23e76319801` | Wildebeest at sunrise |
| OG Share Image | `hero/og-image.jpg` | 1200×630 | — | — | Create branded 1200×630 image |

### Destination Card Images

| Destination | Filename | Size | Current URL | Unsplash ID |
|------------|----------|------|-------------|-------------|
| Serengeti | `destinations/serengeti.jpg` | 600×400 | [link](https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80) | `1516426122078-c23e76319801` |
| Zanzibar | `destinations/zanzibar.jpg` | 600×400 | [link](https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80) | `1547036967-23d11aacaee0` |
| Ngorongoro | `destinations/ngorongoro.jpg` | 600×400 | [link](https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80) | `1523805009345-7448845a9e53` |
| Kilimanjaro | `destinations/kilimanjaro.jpg` | 600×400 | [link](https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80) | `1589308078059-be1415eab4c3` |
| Tarangire | `destinations/tarangire.jpg` | 600×400 | [link](https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80) | `1547970810-dc1eac37d174` |
| Mafia Island | `destinations/mafia-island.jpg` | 600×400 | [link](https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80) | `1500534314209-a25ddb2bd429` |

### Destination Page Heroes

For each destination page (`/destinations/[slug]`), we need a full-width hero image:

| Destination | Filename | Size | Current URL | Unsplash ID |
|------------|----------|------|-------------|-------------|
| Serengeti | `destinations/serengeti-hero.jpg` | 1600×900 | (same as above) | `1516426122078-c23e76319801` |
| Zanzibar | `destinations/zanzibar-hero.jpg` | 1600×900 | (same as above) | `1547036967-23d11aacaee0` |
| Ngorongoro | `destinations/ngorongoro-hero.jpg` | 1600×900 | (same as above) | `1523805009345-7448845a9e53` |
| Kilimanjaro | `destinations/kilimanjaro-hero.jpg` | 1600×900 | (same as above) | `1589308078059-be1415eab4c3` |
| Tarangire | `destinations/tarangire-hero.jpg` | 1600×900 | (same as above) | `1547970810-dc1eac37d174` |
| Mafia Island | `destinations/mafia-island-hero.jpg` | 1600×900 | (same as above) | `1500534314209-a25ddb2bd429` |

### Blog Post Featured Images

| Blog Post | Filename | Size | Current URL | Unsplash ID | Published |
|-----------|----------|------|-------------|-------------|-----------|
| Ultimate Tanzania Safari Planning Guide | `blog/ultimate-safari-guide.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80) | `1516426122078-c23e76319801` | 2026-01-15 |
| Climbing Kilimanjaro Guide | `blog/kilimanjaro-guide.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80) | `1589308078059-be1415eab4c3` | 2026-01-22 |
| Zanzibar Travel Guide | `blog/zanzibar-guide.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80) | `1547036967-23d11aacaee0` | 2026-02-01 |
| Best Time to Visit Tanzania | `blog/best-time-to-visit.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1200&q=80) | `1534188753412-3e26d0d618d6` | 2026-02-08 |
| Tanzania Safari on a Budget | `blog/safari-budget.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1200&q=80) | `1547970810-dc1eac37d174` | 2026-02-15 |
| What is the Great Migration | `blog/great-migration.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80) | `1516426122078-c23e76319801` | 2026-02-20 |
| What is Ngorongoro Crater | `blog/ngorongoro-crater.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80) | `1523805009345-7448845a9e53` | 2026-02-25 |
| Is Tanzania Safe for Kids | `blog/tanzania-families.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80) | `1500534314209-a25ddb2bd429` | 2026-03-01 |
| Tanzania for Photographers | `blog/tanzania-photography.jpg` | 1200×630 | [link](https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80) | `1516426122078-c23e76319801` | 2026-03-01 |

## How to Download Images

### Option 1: Unsplash (Free + Attribution)

1. Go to https://unsplash.com/photos/[UNSPLASH_ID]
2. Click "Download free" → "Download"
3. Save to the appropriate `/public/images/` subdirectory
4. Update the attribution in the code comments

Example:
```bash
# Download Serengeti image
curl -L "https://unsplash.com/photos/1516426122078-c23e76319801/download" -o public/images/destinations/serengeti.jpg
```

### Option 2: Pexels (Free, no attribution required)

Search for:
- "serengeti" / "tanzania safari" / "african wildlife"
- "zanzibar" / "tanzania beach" / "tropical island"
- "kilimanjaro" / "mount kilimanjaro"
- etc.

## Code Changes Required

### 1. Update `src/app/page.tsx`

Replace Unsplash URLs in `featuredRegions`:
```typescript
import Image from "next/image";

const featuredRegions = [
  { 
    name: "Serengeti", 
    slug: "serengeti", 
    tagline: "The Great Migration", 
    image: "/images/destinations/serengeti.jpg",  // ← Changed from Unsplash URL
    bestTime: "Jun–Oct" 
  },
  // ... more regions
];
```

Also update the hero section:
```typescript
<Image
  src="/images/hero/serengeti.jpg"  // ← Changed
  alt="Serengeti at sunrise with wildebeest"
  fill
  // ... other props
/>
```

### 2. Update `src/lib/static-articles.ts`

Replace Unsplash URLs in each article's `heroImage`:
```typescript
{
  slug: "ultimate-tanzania-safari-planning-guide",
  title: "Ultimate Tanzania Safari Planning Guide",
  // ...
  heroImage: "/images/blog/ultimate-safari-guide.jpg",  // ← Changed
  // ...
}
```

### 3. Use Next.js Image Component

For all images, use the `next/image` component instead of `<img>`:

```typescript
import Image from "next/image";

<Image
  src="/images/destinations/serengeti.jpg"
  alt="Serengeti National Park - wildebeest herd"
  width={600}
  height={400}
  className="..."
/>
```

## Image Optimization Guidelines

- **Format:** Use `.jpg` for photographs, `.png` for graphics with transparency
- **Quality:** Export at 80-85% JPEG quality to save file size
- **Alt text:** Every image must have descriptive alt text for accessibility and SEO
- **Responsive sizes:** Use `sizes` prop for `next/image` to serve appropriate sizes
- **Lazy loading:** Use `loading="lazy"` for below-the-fold images (default for `next/image`)

Example `next/image` usage:
```typescript
<Image
  src="/images/destinations/serengeti.jpg"
  alt="Serengeti National Park wildebeest migration landscape"
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={false}
  className="rounded-lg object-cover"
/>
```

## Attribution

All Unsplash images require the following attribution in your codebase or footer:

> Photo by [Photographer Name] on [Unsplash](https://unsplash.com)

Or add a comment in the code:
```typescript
// Photo by [Photographer Name] on Unsplash
// https://unsplash.com/photos/[ID]
```

## Status

- [ ] Create directory structure → ✅ Done
- [ ] Download all images from Unsplash
- [ ] Update `src/app/page.tsx` with local image paths
- [ ] Update `src/lib/static-articles.ts` with local image paths
- [ ] Update all other components to use `next/image`
- [ ] Add proper alt text to all images
- [ ] Test on mobile and desktop
- [ ] Run Lighthouse audit

## Notes

- Images will be automatically optimized by Next.js when using the `Image` component
- Original Unsplash URLs are documented in this file for easy reference
- If Unsplash URLs break in the future, we have them backed up locally
- File sizes: After optimization, expect roughly 50-80KB per blog image, 20-40KB per card image

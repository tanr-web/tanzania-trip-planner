# Tanzania Trip Planner — Complete Site Roadmap

> **Purpose:** This document is a task list for Claude Code to audit and fix every page of `tanzaniatripplanner.com`. Work through each section in order. The site is built with **Next.js** (confirmed by `_next/image` URLs and page structure).

---

## 0. Pre-flight: Codebase Orientation

- [ ] Identify the framework version (`next.config.js`, `package.json`)
- [ ] Map out the `/app` or `/pages` directory structure
- [ ] Identify the CMS/data layer — are destinations, hotels, restaurants stored in a local JSON/MDX, a headless CMS (Sanity, Contentful), or a database?
- [ ] Identify the image strategy — currently pulling from Unsplash via URL params (`images.unsplash.com`). Decide: keep Unsplash (with proper attribution) **or** replace with self-hosted/optimized images in `/public`
- [ ] Check if there's a `.env` or `.env.example` — note any missing API keys (AI itinerary generation, email provider, analytics, etc.)

---

## 1. Analytics & Tracking (Nothing Installed Currently)

### 1.1 Google Analytics 4
- [ ] Install `@next/third-parties` → add `<GoogleAnalytics gaId="G-XXXXXXXXXX" />` in root layout
- [ ] Create a GA4 property at analytics.google.com, get the Measurement ID
- [ ] Set up key events: `plan_trip_start`, `plan_trip_complete`, `hotel_click`, `destination_view`, `email_signup`

### 1.2 Google Search Console
- [ ] Verify domain ownership via DNS TXT record
- [ ] Submit sitemap (see Section 9)

### 1.3 Microsoft Clarity (optional but recommended)
- [ ] Add Clarity script for heatmaps and session recordings — useful for understanding how users interact with the AI planner

---

## 2. Homepage (`/`)

### 2.1 Hero Section
- [ ] **Image:** Currently uses an Unsplash stock image (`photo-1516426122078-c23e76801`). Replace with a high-quality, licensed hero image of the Serengeti or Kilimanjaro. Consider using `next/image` with priority loading and a proper `sizes` attribute.
- [ ] **CTA buttons:** "Plan My Trip" and "Explore Destinations" — verify both links work

### 2.2 "How It Works" Section
- [ ] Verify step icons (✏️ 🤖 🏨) render consistently across devices — consider replacing emoji with SVG icons for consistency
- [ ] "Start Planning — It's Free" CTA → verify it links to `/plan`

### 2.3 "This Month in Tanzania" Section
- [ ] **CRITICAL:** This currently shows "Sep" / "Whale sharks at Mafia Island" — is this **dynamically generated** based on the current month, or **hardcoded**? If hardcoded:
  - [ ] Create a data file (`monthlyHighlights.ts`) with 12 entries, one per month
  - [ ] Render dynamically based on `new Date().getMonth()`
  - [ ] Each month should include: title, description, best destinations, and a relevant image

### 2.4 Destination Cards
- [ ] Verify all 6 destination cards (Serengeti, Zanzibar, Ngorongoro, Kilimanjaro, Tarangire, Mafia Island) have:
  - [ ] Real images (not Unsplash placeholders)
  - [ ] Correct "Best: [months]" badges
  - [ ] Working links to `/destinations/[slug]`

### 2.5 Stats Bar ("50+ Destination Guides", "AI-Powered", "300+ Curated Hotels")
- [ ] **Are these real numbers?** If not, update to match actual content count or remove until content exists
- [ ] Consider making these dynamic counts from the data layer

### 2.6 Email Signup ("Get Our Free Tanzania Packing List")
- [ ] **Is this connected to an email provider?** (Mailchimp, Resend, ConvertKit, etc.)
- [ ] If not, connect it. The form needs:
  - [ ] Email validation
  - [ ] API route to handle submission
  - [ ] Success/error states in the UI
  - [ ] Actual packing list PDF or page to deliver
- [ ] Add honeypot or reCAPTCHA for spam prevention

---

## 3. Destinations Section (`/destinations` + `/destinations/[slug]`)

### 3.1 Destinations Index Page (`/destinations`)
- [ ] Verify the page renders a grid/list of all destinations
- [ ] Check for placeholder text or Lorem ipsum
- [ ] Ensure proper meta tags (title, description, OG image) per page

### 3.2 Individual Destination Pages — Audit Each:
For **every** destination below, verify or create:

| Slug | Required Content |
|------|-----------------|
| `/destinations/serengeti` | Overview, best time to visit, key activities (Great Migration, game drives), getting there, where to stay, gallery (real images) |
| `/destinations/zanzibar` | Overview, beaches, Stone Town, spice tours, diving/snorkeling, hotels, restaurants |
| `/destinations/ngorongoro` | Crater details, wildlife, conservation area rules, accommodation |
| `/destinations/kilimanjaro` | Routes (Machame, Marangu, Lemosho, etc.), difficulty, best seasons, operators |
| `/destinations/tarangire` | Elephant herds, baobabs, bird watching, lodges |
| `/destinations/mafia-island` | Diving, whale sharks, marine park, accommodation |

- [ ] For each page check:
  - [ ] Hero image is real (not Unsplash placeholder)
  - [ ] Body content is substantial (not placeholder/skeleton)
  - [ ] "Where to Stay" section links to actual hotels
  - [ ] Map or location context is included
  - [ ] SEO metadata is unique per page

### 3.3 Missing Destinations
The homepage links 6 destinations, but "50+ Destination Guides" is claimed. Either:
- [ ] Add more destination pages (Ruaha, Selous/Nyerere, Lake Manyara, Pemba, Dar es Salaam, Arusha, Mikumi, Katavi, Gombe, Mahale, Udzungwa, Usambara Mountains, Lake Victoria, Bagamoyo, etc.)
- [ ] Or update the "50+" stat to match reality

---

## 4. Hotels & Lodges (`/hotels`)

- [ ] Verify the page exists and renders (not a 404 or empty page)
- [ ] Check data source — are hotels stored in a JSON file, CMS, or pulled from an API?
- [ ] Each hotel listing should have:
  - [ ] Name, location/destination, category (luxury/mid-range/budget)
  - [ ] Real description (not placeholder)
  - [ ] Real images (not stock photos)
  - [ ] Price range indicator
  - [ ] Link to booking (affiliate link if applicable — the footer mentions affiliate links)
  - [ ] Star rating or category badge
- [ ] Verify the "300+ Curated Hotels" claim — count actual entries
- [ ] Add filtering: by destination, price range, category
- [ ] Add search functionality

---

## 5. Restaurants (`/restaurants`)

- [ ] Verify the page exists and isn't a placeholder
- [ ] Each restaurant should have: name, location, cuisine type, price range, description, images
- [ ] Organize by destination (Zanzibar restaurants, Arusha restaurants, etc.)
- [ ] Consider adding a map view

---

## 6. AI Itinerary Planner (`/plan`)

This is the **core feature** — the site's main value proposition.

### 6.1 Input Form
- [ ] Verify the "6 quick questions" flow works:
  - [ ] Travel dates
  - [ ] Group size / type (solo, couple, family, group)
  - [ ] Budget range
  - [ ] Interests (safari, beach, culture, adventure, etc.)
  - [ ] Trip duration
  - [ ] Any other preferences
- [ ] Form validation on all fields
- [ ] Mobile-friendly input (date pickers, etc.)

### 6.2 AI Generation
- [ ] Verify the AI backend works (what model/API is used? — OpenAI, Anthropic, etc.)
- [ ] Check the `.env` for API keys — are they set?
- [ ] Verify streaming works ("streamed live" is claimed on homepage)
- [ ] Error handling if API fails or times out
- [ ] Rate limiting to prevent abuse

### 6.3 Output / Itinerary Display
- [ ] Day-by-day itinerary renders correctly
- [ ] Hotel recommendations per stop are linked
- [ ] Restaurant recommendations are included
- [ ] Map integration showing the route
- [ ] Option to save/download/share the itinerary
- [ ] Print-friendly version

---

## 7. Travel Guides / Blog (`/blog`)

- [ ] Verify the blog page exists and isn't empty
- [ ] Check if there's a CMS connected (MDX files, Sanity, Contentful?)
- [ ] If no posts exist yet, create seed content:
  - [ ] "Ultimate Tanzania Safari Guide 2026"
  - [ ] "Best Time to Visit Tanzania: Month-by-Month"
  - [ ] "Tanzania on a Budget: How to Save on Safari"
  - [ ] "Zanzibar Travel Guide: Beaches, Culture & Food"
  - [ ] "Great Migration Guide: When & Where"
- [ ] Each post needs: title, date, author, featured image (real), body content, related destinations, SEO metadata

---

## 8. Utility Pages

### 8.1 Migration Calendar (`/migration-calendar`)
- [ ] Verify this page exists and isn't a placeholder
- [ ] Should show month-by-month location of the Great Migration herds
- [ ] Interactive map or visual timeline preferred
- [ ] Include recommended camps/lodges per month

### 8.2 Packing List (`/packing-list`)
- [ ] Verify the page exists
- [ ] Should be a comprehensive, interactive checklist
- [ ] Categories: clothing, gear, documents, health/medicine, safari-specific, beach-specific
- [ ] Seasonal variations
- [ ] This is also the lead magnet promised in the email signup — ensure PDF version exists for download

### 8.3 Cost Estimator (`/cost-estimator`)
- [ ] Verify the page exists and functions
- [ ] Interactive calculator: inputs for duration, accommodation level, destinations, group size
- [ ] Output: estimated daily costs, total trip cost, cost breakdown
- [ ] If not functional, build or remove from nav until ready

### 8.4 About Page (`/about`)
- [ ] Replace any placeholder content with real information
- [ ] Who runs the site, mission, local expertise angle
- [ ] Photos of team or Tanzania

### 8.5 Contact Page (`/contact`)
- [ ] Verify contact form works (sends emails)
- [ ] Check which email service handles form submissions
- [ ] Add a real email address as fallback

---

## 9. Technical SEO & Performance

### 9.1 Sitemap
- [ ] Verify `sitemap.xml` exists at `/sitemap.xml`
- [ ] If not, add `next-sitemap` package or create `app/sitemap.ts`
- [ ] Include all public pages, destinations, hotels, blog posts
- [ ] Submit to Google Search Console

### 9.2 Robots.txt
- [ ] Verify `/robots.txt` exists and allows indexing
- [ ] Should reference the sitemap

### 9.3 Meta Tags (per page)
- [ ] Every page needs unique: `<title>`, `<meta name="description">`, OG tags, Twitter card tags
- [ ] Verify the homepage tags are correct (they looked good in the audit)
- [ ] Add structured data (JSON-LD) for:
  - [ ] Organization schema on homepage
  - [ ] TravelAction or TouristDestination schema on destination pages
  - [ ] Hotel schema on hotel pages
  - [ ] Article/BlogPosting schema on blog posts
  - [ ] BreadcrumbList on all inner pages

### 9.4 Performance
- [ ] Run Lighthouse audit — target 90+ on all scores
- [ ] Ensure all images use `next/image` with proper `width`, `height`, `sizes`
- [ ] Lazy-load below-fold images
- [ ] Check for unused JS bundles
- [ ] Verify fonts are loaded optimally (use `next/font`)

### 9.5 Favicon & PWA
- [ ] Add a proper favicon (safari/Tanzania themed icon, not the default Next.js one)
- [ ] Add `apple-touch-icon`, `manifest.json` for mobile
- [ ] OG image — create a branded 1200×630 image for social sharing

---

## 10. Legal & Compliance

- [ ] **Privacy Policy** page — required if using analytics, cookies, email collection
- [ ] **Terms of Service** page
- [ ] **Cookie consent banner** — required for EU visitors (Tanzania gets European tourists)
- [ ] **Affiliate disclosure** — the footer mentions affiliate links; ensure proper FTC/CMA disclosure on relevant pages

---

## 11. Image Strategy

The site currently uses Unsplash images via direct URL. This has issues:
- Unsplash URLs can break or change
- No control over image optimization
- Potential licensing issues if not attributed

### Recommended approach:
- [ ] Download and self-host key images in `/public/images/`
- [ ] Use `next/image` for automatic optimization
- [ ] Organize: `/public/images/destinations/`, `/public/images/hotels/`, `/public/images/blog/`
- [ ] Minimum image set needed:
  - [ ] Hero image (homepage) — 1920×1080
  - [ ] 6 destination card images — 800×600 each
  - [ ] Destination page heroes — 1600×900 each
  - [ ] Hotel thumbnails — 400×300 each
  - [ ] Blog post featured images — 1200×630 each
  - [ ] OG share image — 1200×630
  - [ ] About page images
- [ ] Source options: Unsplash (with download & attribution), Pexels, or purchase from Shutterstock/iStock
- [ ] Add `alt` text to every image for accessibility and SEO

---

## 12. Email System

- [ ] Choose an email provider if not already set up (Resend, Mailchimp, ConvertKit)
- [ ] Connect the packing list signup form
- [ ] Create a welcome email sequence:
  1. Immediate: deliver the packing list
  2. Day 2: "Top 5 Tanzania destinations" email
  3. Day 5: "Plan your trip with our AI planner" email
- [ ] Transactional emails for itinerary sharing (if that feature exists)

---

## 13. Mobile Responsiveness

- [ ] Test every page on mobile viewport (375px, 390px, 414px)
- [ ] Check:
  - [ ] Navigation hamburger menu works
  - [ ] Hero text doesn't overflow
  - [ ] Destination cards stack properly
  - [ ] AI planner form is usable on mobile
  - [ ] Hotel/restaurant listings are scrollable
  - [ ] Footer links are tappable

---

## 14. Accessibility

- [ ] All images have `alt` text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Interactive elements are keyboard-navigable
- [ ] Form labels are associated with inputs
- [ ] Skip-to-content link exists
- [ ] ARIA labels on icon-only buttons

---

## 15. Priority Order for Implementation

| Priority | Task | Impact |
|----------|------|--------|
| 🔴 P0 | Fix AI Planner (`/plan`) — this is the core product | Critical |
| 🔴 P0 | Replace placeholder images with real ones | Critical |
| 🔴 P0 | Verify all nav links work (no 404s) | Critical |
| 🟠 P1 | Connect email signup to a real provider | High |
| 🟠 P1 | Make "This Month" section dynamic | High |
| 🟠 P1 | Complete destination page content | High |
| 🟠 P1 | Hotels page — populate with real data | High |
| 🟡 P2 | Install Google Analytics + Search Console | Medium |
| 🟡 P2 | Add sitemap.xml and robots.txt | Medium |
| 🟡 P2 | Blog — seed with 3-5 posts | Medium |
| 🟡 P2 | Build packing list page + PDF | Medium |
| 🟢 P3 | Cost estimator tool | Low |
| 🟢 P3 | Migration calendar interactive page | Low |
| 🟢 P3 | Structured data / JSON-LD | Low |
| 🟢 P3 | Privacy policy, terms, cookie banner | Low |
| 🟢 P3 | Microsoft Clarity | Low |

---

## Notes for Claude Code

- **Always check the existing codebase structure before creating files** — the site may already have partial implementations
- **Use `next/image`** for all images, never raw `<img>` tags
- **Use TypeScript** if the project is already in TypeScript
- **Follow existing code style** — check for Tailwind vs CSS Modules vs styled-components
- **Test after each major change** — run `npm run build` to catch errors
- The site uses `_next/image` optimizer, confirming Next.js with Image optimization enabled

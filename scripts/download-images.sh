#!/bin/bash
# Image Download Script for Tanzania Trip Planner
# Downloads all images from Unsplash and organizes them in public/images/

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGES_DIR="$REPO_ROOT/public/images"

echo "🖼️  Tanzania Trip Planner - Image Downloader"
echo "=================================================="
echo ""

# Create directories
mkdir -p "$IMAGES_DIR/hero"
mkdir -p "$IMAGES_DIR/destinations"
mkdir -p "$IMAGES_DIR/blog"
mkdir -p "$IMAGES_DIR/ui"

echo "✅ Directories created in $IMAGES_DIR"
echo ""

# Function to download with retry
download_image() {
  local url=$1
  local output=$2
  local description=$3

  echo "📥 Downloading: $description"

  if command -v curl &> /dev/null; then
    curl -L -o "$output" "$url" 2>/dev/null || {
      echo "⚠️  Failed to download $description"
      return 1
    }
  else
    wget -q -O "$output" "$url" || {
      echo "⚠️  Failed to download $description"
      return 1
    }
  fi

  size=$(du -h "$output" | cut -f1)
  echo "   ✓ Saved: $output ($size)"
}

echo "HERO IMAGES"
echo "==========="

# Hero: Serengeti (1920×1080)
download_image \
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80" \
  "$IMAGES_DIR/hero/serengeti.jpg" \
  "Hero - Serengeti Sunrise"

echo ""
echo "DESTINATION CARD IMAGES"
echo "======================="

# Serengeti (600×400)
download_image \
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80" \
  "$IMAGES_DIR/destinations/serengeti.jpg" \
  "Destination - Serengeti"

# Zanzibar (600×400)
download_image \
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80" \
  "$IMAGES_DIR/destinations/zanzibar.jpg" \
  "Destination - Zanzibar"

# Ngorongoro (600×400)
download_image \
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80" \
  "$IMAGES_DIR/destinations/ngorongoro.jpg" \
  "Destination - Ngorongoro"

# Kilimanjaro (600×400)
download_image \
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80" \
  "$IMAGES_DIR/destinations/kilimanjaro.jpg" \
  "Destination - Kilimanjaro"

# Tarangire (600×400)
download_image \
  "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80" \
  "$IMAGES_DIR/destinations/tarangire.jpg" \
  "Destination - Tarangire"

# Mafia Island (600×400)
download_image \
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80" \
  "$IMAGES_DIR/destinations/mafia-island.jpg" \
  "Destination - Mafia Island"

echo ""
echo "BLOG POST FEATURED IMAGES"
echo "========================="

# Ultimate Safari Guide (1200×630)
download_image \
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80" \
  "$IMAGES_DIR/blog/ultimate-safari-guide.jpg" \
  "Blog - Ultimate Tanzania Safari Planning Guide"

# Kilimanjaro Guide (1200×630)
download_image \
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80" \
  "$IMAGES_DIR/blog/kilimanjaro-guide.jpg" \
  "Blog - Climbing Kilimanjaro Guide"

# Zanzibar Guide (1200×630)
download_image \
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80" \
  "$IMAGES_DIR/blog/zanzibar-guide.jpg" \
  "Blog - Zanzibar Travel Guide"

# Best Time to Visit (1200×630)
download_image \
  "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1200&q=80" \
  "$IMAGES_DIR/blog/best-time-to-visit.jpg" \
  "Blog - Best Time to Visit Tanzania"

# Safari Budget (1200×630)
download_image \
  "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1200&q=80" \
  "$IMAGES_DIR/blog/safari-budget.jpg" \
  "Blog - Tanzania on a Budget"

# Great Migration (1200×630)
download_image \
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80" \
  "$IMAGES_DIR/blog/great-migration.jpg" \
  "Blog - Great Migration Guide"

# Ngorongoro Crater (1200×630)
download_image \
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80" \
  "$IMAGES_DIR/blog/ngorongoro-crater.jpg" \
  "Blog - Ngorongoro Crater Guide"

# Tanzania Families (1200×630)
download_image \
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80" \
  "$IMAGES_DIR/blog/tanzania-families.jpg" \
  "Blog - Family Safari in Tanzania"

# Tanzania Photography (1200×630)
download_image \
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80" \
  "$IMAGES_DIR/blog/tanzania-photography.jpg" \
  "Blog - Photography Safari Tanzania"

echo ""
echo "✨ DOWNLOAD COMPLETE!"
echo "===================="
echo ""
echo "Images have been downloaded to: $IMAGES_DIR"
echo ""
echo "Next steps:"
echo "1. Review images to ensure quality"
echo "2. Optimize images if needed (run 'npm run optimize-images' if available)"
echo "3. Run 'npm run build' to verify the site builds correctly"
echo "4. Commit images to git: git add public/images/"
echo ""
echo "Attribution:"
echo "All images sourced from Unsplash.com"
echo "Please ensure proper attribution per Unsplash license:"
echo "https://unsplash.com/license"

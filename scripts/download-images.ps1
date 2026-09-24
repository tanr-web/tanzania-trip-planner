# Image Download Script for Tanzania Trip Planner (PowerShell)
$RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$ImagesDir = Join-Path $RepoRoot "public\images"

Write-Host "Downloading Tanzania Trip Planner Images..." -ForegroundColor Cyan

# Create directories
@("hero", "destinations", "blog", "ui") | ForEach-Object {
    $dir = Join-Path $ImagesDir $_
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Green
    }
}

# Image download pairs: (URL, FilePath, Description)
$images = @(
    ("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80", "hero\serengeti.jpg", "Hero - Serengeti"),
    ("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80", "destinations\serengeti.jpg", "Destination - Serengeti"),
    ("https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80", "destinations\zanzibar.jpg", "Destination - Zanzibar"),
    ("https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80", "destinations\ngorongoro.jpg", "Destination - Ngorongoro"),
    ("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80", "destinations\kilimanjaro.jpg", "Destination - Kilimanjaro"),
    ("https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80", "destinations\tarangire.jpg", "Destination - Tarangire"),
    ("https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80", "destinations\mafia-island.jpg", "Destination - Mafia Island"),
    ("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80", "blog\ultimate-safari-guide.jpg", "Blog - Ultimate Safari Guide"),
    ("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80", "blog\kilimanjaro-guide.jpg", "Blog - Kilimanjaro Guide"),
    ("https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80", "blog\zanzibar-guide.jpg", "Blog - Zanzibar Guide"),
    ("https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=1200&q=80", "blog\best-time-to-visit.jpg", "Blog - Best Time to Visit"),
    ("https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1200&q=80", "blog\safari-budget.jpg", "Blog - Safari Budget"),
    ("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80", "blog\great-migration.jpg", "Blog - Great Migration"),
    ("https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80", "blog\ngorongoro-crater.jpg", "Blog - Ngorongoro Crater"),
    ("https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80", "blog\tanzania-families.jpg", "Blog - Tanzania Families"),
    ("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80", "blog\tanzania-photography.jpg", "Blog - Tanzania Photography")
)

$downloaded = 0
$failed = 0

foreach ($image in $images) {
    $url = $image[0]
    $relativePath = $image[1]
    $description = $image[2]
    $fullPath = Join-Path $ImagesDir $relativePath

    Write-Host "Downloading: $description..." -NoNewline

    try {
        $ProgressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $url -OutFile $fullPath -UseBasicParsing -TimeoutSec 30
        $size = [Math]::Round((Get-Item $fullPath).Length / 1KB, 1)
        Write-Host " OK ($($size)KB)" -ForegroundColor Green
        $downloaded++
    }
    catch {
        Write-Host " FAILED" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)"
        $failed++
    }
}

Write-Host ""
Write-Host "Download Summary:" -ForegroundColor Cyan
Write-Host "  Downloaded: $downloaded images" -ForegroundColor Green
Write-Host "  Failed: $failed images" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($failed -eq 0) {
    Write-Host "All images downloaded successfully!" -ForegroundColor Green
    Write-Host "Next: npm run build" -ForegroundColor Yellow
} else {
    Write-Host "Some images failed to download. Check your internet connection and try again." -ForegroundColor Yellow
}

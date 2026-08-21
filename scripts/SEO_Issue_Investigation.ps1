# Root project folder
$root = "C:\Temp\syncline-website_MAIN"

# Output folder + file
$outFolder = "$root\investigation"
$outFile = "$outFolder\core_dump.txt"

# Ensure investigation folder exists
New-Item -ItemType Directory -Force -Path $outFolder | Out-Null

# If output file exists, back it up instead of overwriting
if (Test-Path $outFile) {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    Rename-Item -Path $outFile -NewName "core_dump_$timestamp.txt"
}

# Create new empty output file
New-Item -ItemType File -Path $outFile | Out-Null

# List of files to copy
$files = @(
    "src\App.jsx",
    "index.html",
    "src\components\navbar\Navbar.jsx",
    "src\components\navbar\OffcanvasMenu.jsx",
    "src\components\hero\HeroCTASection.jsx",
    "src\components\services\ServiceTeaser.jsx",
    "src\components\services\ServicesSection.jsx",
    "src\components\testimonials\TestimonialsSection.jsx",
    "src\components\about\AboutSection.jsx",
    "src\components\contact\ContactSection.jsx",
    "src\components\areas\ServiceAreasSection.jsx",
    "src\components\areas\MapComponent.jsx",
    "src\components\monitoring\MonitoringDashboard.jsx",
    "src\components\chat\ChatWidget.jsx",
    "src\components\SEO.jsx",
    "vite.config.js",
    "vercel.json",
    "netlify.toml",
    "nginx.conf"
)

# Copy each file into the dump
foreach ($file in $files) {
    $fullPath = Join-Path $root $file

    Add-Content -Path $outFile -Value "==============================="
    Add-Content -Path $outFile -Value "FILE: $file"
    Add-Content -Path $outFile -Value "==============================="
    Add-Content -Path $outFile -Value ""

    if (Test-Path $fullPath) {
        Get-Content -Path $fullPath | Add-Content -Path $outFile
    } else {
        Add-Content -Path $outFile -Value "FILE NOT FOUND"
    }

    Add-Content -Path $outFile -Value "`n`n"
}

Write-Host "All requested files copied into: $outFile"





<#
# Set project root
$root = "C:\Temp\syncline-website_MAIN\src"

# Output file
$outFile = "C:\Temp\syncline-website_MAIN\investigation\all_code_dump.txt"

# Ensure output folder exists
New-Item -ItemType Directory -Force -Path "C:\Temp\syncline-website_MAIN\investigation" | Out-Null

# If output file exists, rename it instead of clearing
if (Test-Path $outFile) {
    Rename-Item -Path $outFile -NewName ("all_code_dump_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".txt")
}

# Create new empty file
New-Item -ItemType File -Path $outFile | Out-Null

# List of files to extract
$files = @(
    "components\SEO.jsx",
    "components\Navbar.jsx",
    "components\Footer.jsx",
    "components\ServiceTeaser.jsx",
    "components\ResourcesHub.jsx",
    "components\OffcanvasMenu.jsx",
    "components\MonitoringDashboard.jsx",
    "pages\Home.jsx",
    "pages\ServicesSection.jsx",
    "pages\TestimonialsSection.jsx",
    "pages\AboutSection.jsx",
    "pages\ContactSection.jsx",
    "pages\ServiceAreas.jsx",
    "components\MapComponent.jsx",
    "index.css",
    "styles\Home.css",
    "styles\MapComponent.css",
    "styles\ServicesSection.css"
)

# Loop through each file and append contents
foreach ($file in $files) {
    $fullPath = Join-Path $root $file

    Add-Content -Path $outFile -Value "==============================="
    Add-Content -Path $outFile -Value "FILE: $file"
    Add-Content -Path $outFile -Value "==============================="
    Add-Content -Path $outFile -Value ""

    if (Test-Path $fullPath) {
        Get-Content -Path $fullPath | Add-Content -Path $outFile
    } else {
        Add-Content -Path $outFile -Value "FILE NOT FOUND"
    }

    Add-Content -Path $outFile -Value "`n`n"
}

Write-Host "All files copied into: $outFile"
#>
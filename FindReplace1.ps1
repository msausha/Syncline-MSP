# ================================
# Syncline IT – Safe Content Cleanup Script (SAFE VERSION)
# ================================

Write-Host "Starting safe content cleanup..." -ForegroundColor Cyan

$root = "C:\Temp\syncline-website_MAIN"
$backup = "$root\backup-before-replace"

# Create backup folder
if (!(Test-Path $backup)) {
    New-Item -ItemType Directory -Path $backup | Out-Null
}

# Dangerous → Safe replacements
$replacements = @{
    "24/7 monitoring" = "proactive monitoring"
    "24/7 support" = "priority support for managed clients"
    "Guaranteed Uptime SLA" = "High uptime targets"
    "99.9% uptime" = "High uptime and stable performance"
    "Guaranteed response time" = "Priority response for managed clients"
    "150+ SMBs" = "Victorian SMBs"
    "Trusted by 150+ businesses" = "Trusted by Victorian SMBs"
    "4.9/5 rating" = "Strong client satisfaction"
    "Enterprise-grade tech" = "Proven Microsoft and industry tools"
    "Zero-trust architecture" = "Modern authentication and secure access"
    "Encrypted tunnels" = "Encrypted connections"
    "Custom VPN system" = "Secure remote access"
    "Built in-house" = "Trusted platforms with tailored configurations"
    "Custom tools that set us apart" = "Tools and workflows that set us apart"
    "Customer portal" = "Client workspace (coming soon)"
    "SLA tracking" = "Clear ticket visibility"
    "1300 XXX XXX" = "0406 001 444"
    "XXX XXX" = ""
}

# File types to scan
$files = Get-ChildItem -Path $root -Recurse -Include *.jsx, *.js, *.json, *.md, *.html, *.css |
    Where-Object {
        $_.FullName -notmatch "\\dist\\" -and
        $_.FullName -notmatch "\\node_modules\\"
    }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    foreach ($pair in $replacements.GetEnumerator()) {
        $pattern = [regex]::Escape($pair.Key)
        $content = $content -replace $pattern, $pair.Value
    }

    if ($content -ne $original) {
        Copy-Item $file.FullName "$backup\$($file.Name)" -Force
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
    }
}

Write-Host "Cleanup complete. Backup stored at: $backup" -ForegroundColor Cyan

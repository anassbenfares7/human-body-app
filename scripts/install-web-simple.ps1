# Human Body App - Web Package Installer
# Excludes backend package temporarily to install web dependencies

Write-Host "=================================================="
Write-Host "Human Body App - Web Package Dependency Installer"
Write-Host "=================================================="
Write-Host ""

# Check if backup exists
if (Test-Path "packages\backend-excluded.backup") {
    Write-Host "[WARNING] Backup already exists. Cleaning up..."
    Remove-Item -Recurse -Force "packages\backend" -ErrorAction SilentlyContinue
    Rename-Item "packages\backend-excluded.backup" "backend"
}

# Temporarily rename backend
if (Test-Path "packages\backend") {
    Write-Host "[INFO] Excluding backend package..."
    Rename-Item "packages\backend" "backend-excluded.backup"
}

# Install web dependencies
Write-Host ""
Write-Host "[INFO] Installing web package dependencies..."
Set-Location packages\web
npm install

# Restore backend
Write-Host ""
Write-Host "[INFO] Restoring backend package..."
Set-Location ..
if (Test-Path "packages\backend-excluded.backup") {
    Rename-Item "packages\backend-excluded.backup" "backend"
}

Write-Host ""
Write-Host "=================================================="
Write-Host "[SUCCESS] Installation complete!"
Write-Host "=================================================="
Write-Host ""
Write-Host "To run the app:"
Write-Host "  cd packages\web"
Write-Host "  npm run dev"
Write-Host ""
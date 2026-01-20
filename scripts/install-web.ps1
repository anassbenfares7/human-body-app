# Human Body App - Web Package Dependency Installer (Windows)
# Temporarily excludes backend package to avoid dependency conflicts

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Human Body App - Web Package Dependency Installer" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if backup already exists
if (Test-Path "packages\backend-excluded.backup") {
    Write-Host "⚠️  Backup already exists. Cleaning up first..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "packages\backend"
    Rename-Item "packages\backend-excluded.backup" "backend"
}

# Temporarily rename backend to exclude it from workspace
if (Test-Path "packages\backend") {
    Write-Host "📦 Temporarily excluding backend package..." -ForegroundColor Yellow
    Rename-Item "packages\backend" "backend-excluded.backup"
    Write-Host "✓ Backend excluded" -ForegroundColor Green
}

# Install web dependencies
Write-Host ""
Write-Host "📥 Installing web package dependencies..." -ForegroundColor Cyan
Set-Location packages\web
npm install

# Restore backend
Write-Host ""
Write-Host "📦 Restoring backend package..." -ForegroundColor Yellow
Set-Location ..
Rename-Item "packages\backend-excluded.backup" "backend"
Write-Host "✓ Backend restored" -ForegroundColor Green

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Installation complete!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To run the app:" -ForegroundColor White
Write-Host "  cd packages\web" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
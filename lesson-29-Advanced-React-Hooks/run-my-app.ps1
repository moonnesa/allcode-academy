Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Installerer pakker..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starter appen..." -ForegroundColor Green
npm run dev
# run-my-app.ps1 - Lesson 28: File Uploads

$root = $PSScriptRoot
$serverPath = Join-Path $root "server"
$clientPath = Join-Path $root "client"

Write-Host ""
Write-Host "=== Lesson 28 - File Uploads ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Installing server dependencies..." -ForegroundColor Yellow
Set-Location $serverPath
npm install

Write-Host ""
Write-Host "[2/4] Running Prisma migrations..." -ForegroundColor Yellow
npx prisma migrate deploy

Write-Host ""
Write-Host "[3/4] Installing client dependencies..." -ForegroundColor Yellow
Set-Location $clientPath
npm install

Write-Host ""
Write-Host "[4/4] Starting server and client..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$serverPath'; node index.js"

Set-Location $clientPath
Write-Host ""
Write-Host "Server running at http://localhost:4000" -ForegroundColor Green
Write-Host "Client starting at http://localhost:5173" -ForegroundColor Green
Write-Host ""
npm run dev

# VibeCode Installer for Windows (PowerShell)
# 
# Usage: 
#   irm https://raw.githubusercontent.com/yourusername/vibecode/main/install.ps1 | iex
#
# Or download and run:
#   .\install.ps1

$ErrorActionPreference = "Stop"

# Colors
function Write-Success { param($Message) Write-Host $Message -ForegroundColor Green }
function Write-Info { param($Message) Write-Host $Message -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host $Message -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host $Message -ForegroundColor Red }

# Header
Write-Host ""
Write-Host "================================================" -ForegroundColor Magenta
Write-Host "       VibeCode Installer for Windows" -ForegroundColor Magenta
Write-Host "================================================" -ForegroundColor Magenta
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Warning "Warning: Not running as Administrator."
    Write-Warning "Some features may require elevated permissions."
    Write-Host ""
}

# Step 1: Check Node.js
Write-Info "Step 1: Checking Node.js..."
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion -match "v(\d+)\.") {
        $majorVersion = [int]$matches[1]
        if ($majorVersion -ge 18) {
            Write-Success "Node.js $nodeVersion found"
        } else {
            Write-Warning "Node.js $nodeVersion found, but version 18+ is recommended"
            Write-Info "Downloading Node.js installer..."
            
            $installerUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
            $installerPath = "$env:TEMP\nodejs-installer.msi"
            
            Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath
            Write-Info "Installing Node.js..."
            Start-Process msiexec.exe -Wait -ArgumentList "/i `"$installerPath`" /quiet /norestart"
            Remove-Item $installerPath
            
            # Reload PATH
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
            
            Write-Success "Node.js installed successfully"
        }
    }
} catch {
    Write-Warning "Node.js not found. Installing..."
    
    # Download and install Node.js
    $installerUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $installerPath = "$env:TEMP\nodejs-installer.msi"
    
    Write-Info "Downloading from $installerUrl..."
    Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath
    
    Write-Info "Installing Node.js..."
    Start-Process msiexec.exe -Wait -ArgumentList "/i `"$installerPath`" /quiet /norestart"
    Remove-Item $installerPath
    
    # Reload PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Write-Success "Node.js installed successfully"
}

Write-Host ""

# Step 2: Check pnpm
Write-Info "Step 2: Checking pnpm..."
try {
    $pnpmVersion = pnpm --version 2>$null
    Write-Success "pnpm $pnpmVersion found"
} catch {
    Write-Warning "pnpm not found. Installing..."
    npm install -g pnpm
    Write-Success "pnpm installed successfully"
}

Write-Host ""

# Step 3: Check Git
Write-Info "Step 3: Checking Git..."
try {
    $gitVersion = git --version 2>$null
    Write-Success "$gitVersion found"
} catch {
    Write-Warning "Git not found."
    Write-Info "Please install Git from: https://git-scm.com/download/win"
    Write-Info "After installing, re-run this script."
    exit 1
}

Write-Host ""

# Step 4: Clone or update repository
Write-Info "Step 4: Setting up VibeCode..."

$installDir = "$HOME\vibecode"

if (Test-Path $installDir) {
    Write-Info "VibeCode directory exists. Updating..."
    Push-Location $installDir
    git pull origin main
    Pop-Location
} else {
    Write-Info "Cloning VibeCode repository..."
    git clone https://github.com/yourusername/vibecode.git $installDir
}

Write-Success "Repository ready at $installDir"
Write-Host ""

# Step 5: Install dependencies
Write-Info "Step 5: Installing dependencies..."
Push-Location $installDir

try {
    pnpm install
    Write-Success "Dependencies installed"
} catch {
    Write-Error "Failed to install dependencies"
    Pop-Location
    exit 1
}

Write-Host ""

# Step 6: Build project
Write-Info "Step 6: Building VibeCode..."
try {
    pnpm build
    Write-Success "Build completed successfully"
} catch {
    Write-Error "Build failed"
    Pop-Location
    exit 1
}

Write-Host ""

# Step 7: Link CLI globally
Write-Info "Step 7: Linking CLI globally..."
Push-Location packages/cli

try {
    npm link
    Write-Success "CLI linked globally"
} catch {
    Write-Warning "Failed to link CLI globally. You may need Administrator privileges."
    Write-Info "Try running PowerShell as Administrator and re-run this script."
}

Pop-Location
Pop-Location

Write-Host ""

# Step 8: Verify installation
Write-Info "Step 8: Verifying installation..."

# Reload PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

try {
    $vibeVersion = vibecode --version 2>$null
    Write-Success "VibeCode CLI is working! Version: $vibeVersion"
} catch {
    Write-Warning "VibeCode CLI not found in PATH."
    Write-Info "You may need to:"
    Write-Info "  1. Close and reopen PowerShell"
    Write-Info "  2. Add npm global bin to PATH manually"
    Write-Info "     (Usually: $env:APPDATA\npm)"
}

Write-Host ""

# Step 9: Install VS Code extension (optional)
Write-Info "Step 9: VS Code Extension..."
Write-Info "To install the VS Code extension:"
Write-Host ""
Write-Host "  1. Open VS Code" -ForegroundColor Yellow
Write-Host "  2. Press Ctrl+Shift+P" -ForegroundColor Yellow
Write-Host "  3. Type 'Install from VSIX'" -ForegroundColor Yellow
Write-Host "  4. Select: $installDir\packages\extension\vibecode-0.1.0.vsix" -ForegroundColor Yellow
Write-Host ""

# Summary
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "       Installation Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Info "Quick Start:"
Write-Host "  vibecode list                # List themes" -ForegroundColor White
Write-Host "  vibecode apply tokyo-drift   # Apply a theme" -ForegroundColor White
Write-Host "  vibecode --help              # Show all commands" -ForegroundColor White
Write-Host ""
Write-Info "Documentation:"
Write-Host "  $installDir\docs\installation\quick-start.md" -ForegroundColor White
Write-Host ""
Write-Success "Happy theming with VibeCode!"
Write-Host ""

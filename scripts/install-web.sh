#!/bin/bash
# Install web package dependencies by temporarily excluding backend

echo "=================================================="
echo "Human Body App - Web Package Dependency Installer"
echo "=================================================="
echo ""

# Check if backend-excluded.backup exists
if [ -d "packages/backend-excluded.backup" ]; then
    echo "⚠️  Backup already exists. Restoring first..."
    rm -rf packages/backend
    mv packages/backend-excluded.backup packages/backend
fi

# Temporarily rename backend to exclude it from workspace
if [ -d "packages/backend" ]; then
    echo "📦 Temporarily excluding backend package..."
    mv packages/backend packages/backend-excluded.backup
    echo "✓ Backend excluded"
fi

# Install web dependencies
echo ""
echo "📥 Installing web package dependencies..."
cd packages/web
npm install

# Restore backend
echo ""
echo "📦 Restoring backend package..."
cd ..
mv packages/backend-excluded.backup backend
echo "✓ Backend restored"

echo ""
echo "=================================================="
echo "✅ Installation complete!"
echo "=================================================="
echo ""
echo "To run the app:"
echo "  cd packages/web"
echo "  npm run dev"
echo ""
# 🚀 Setup Guide: Human Body Educational App

This guide will walk you through setting up the development environment for the human body educational app.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/downloads)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)
- **Blender** (optional, for 3D modeling) - [Download](https://www.blender.org/download/)

### Optional but Recommended

- **PostgreSQL** (for local development) - [Download](https://www.postgresql.org/download/)
- **Redis** (for caching) - [Download](https://redis.io/download)
- **Docker** (for containerized development) - [Download](https://www.docker.com/products/docker-desktop/)

### Verify Installation

```bash
node --version    # Should be v18 or higher
npm --version     # Should be 9 or higher
git --version     # Should show git version
```

---

## 🗂️ Project Structure Overview

```
human-body-app/
├── packages/
│   ├── web/                 # Web application (React + Three.js)
│   ├── mobile/              # Mobile application (React Native)
│   ├── desktop/             # Desktop application (Electron)
│   ├── shared/              # Shared code and types
│   └── backend/             # Backend API (Node.js + Express)
├── docs/                    # Documentation
└── package.json             # Root package.json (monorepo)
```

---

## 📦 Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/anassbenfares7/human-body-app.git
cd human-body-app

# Verify the connection
git remote -v
```

---

## 🔧 Step 2: Install Root Dependencies

```bash
# Install root dependencies
npm install

# This will install:
# - Turbo (monorepo build tool)
# - ESLint (linting)
# - Prettier (code formatting)
# - Husky (git hooks)
```

---

## 🌐 Step 3: Set Up Web Application

```bash
# Navigate to web package
cd packages/web

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# VITE_API_URL=http://localhost:3001
# VITE_APP_NAME=Human Body App

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Web App Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.96.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.17.0",
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.303.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.56.0",
    "prettier": "^3.1.0"
  }
}
```

---

## 📱 Step 4: Set Up Mobile Application

```bash
# Navigate to mobile package
cd packages/mobile

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# EXPO_API_URL=http://localhost:3001
# EXPO_APP_NAME=Human Body App

# Start development server
npm start

# Press 'i' to run on iOS simulator
# Press 'a' to run on Android emulator
# Scan QR code to run on physical device
```

### Mobile App Dependencies

```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.0",
    "expo": "~50.0.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.96.0",
    "react-native-reanimated": "^3.6.0",
    "react-native-gesture-handler": "^2.14.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/native-stack": "^6.9.0",
    "expo-av": "~14.0.0",
    "expo-sensors": "~13.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.73.0",
    "typescript": "^5.3.0",
    "@expo/webpack-config": "^19.0.0"
  }
}
```

---

## 💻 Step 5: Set Up Desktop Application

```bash
# Navigate to desktop package
cd packages/desktop

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# ELECTRON_API_URL=http://localhost:3001
# ELECTRON_APP_NAME=Human Body App

# Start development server
npm run dev

# The desktop app will open automatically
```

### Desktop App Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.96.0",
    "electron": "^28.0.0",
    "electron-store": "^8.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vite-plugin-electron": "^0.28.0",
    "electron-builder": "^24.9.0"
  }
}
```

---

## 🔧 Step 6: Set Up Backend API

```bash
# Navigate to backend package
cd packages/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# PORT=3001
# DATABASE_URL=postgresql://user:password@localhost:5432/human_body
# REDIS_URL=redis://localhost:6379
# JWT_SECRET=your-secret-key
# STRIPE_SECRET_KEY=your-stripe-key

# Start development server
npm run dev

# The API will be available at http://localhost:3001
```

### Backend Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.0",
    "pg": "^8.11.0",
    "redis": "^4.6.0",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "joi": "^17.11.0",
    "stripe": "^14.10.0",
    "multer": "^1.4.5",
    "aws-sdk": "^2.1500.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.10.0",
    "@types/cors": "^2.8.0",
    "@types/bcrypt": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "typescript": "^5.3.0",
    "nodemon": "^3.0.0",
    "ts-node": "^10.9.0"
  }
}
```

---

## 🗄️ Step 7: Set Up Database

### Option A: Using Docker (Recommended)

```bash
# Create docker-compose.yml file
cd packages/backend

# Start PostgreSQL and Redis containers
docker-compose up -d

# Run database migrations
npm run migrate

# Seed database with initial data
npm run seed
```

### Option B: Local Installation

```bash
# Install PostgreSQL
# Follow the installation guide for your OS

# Create database
createdb human_body

# Run migrations
npm run migrate

# Seed database
npm run seed
```

### Database Schema

See [`02-TECHNOLOGY-STACK.md`](./02-TECHNOLOGY-STACK.md#-database-schema) for the complete database schema.

---

## 🎨 Step 8: Set Up 3D Assets

### Download 3D Models

```bash
# Create models directory
mkdir -p packages/web/public/models
mkdir -p packages/web/public/models/organs
mkdir -p packages/web/public/models/systems
mkdir -p packages/web/public/models/cells
mkdir -p packages/web/public/models/neurons
mkdir -p packages/web/public/models/atoms

# Place your 3D models in these directories
# Recommended format: GLB/GLTF
```

### Sources for 3D Models

1. **Sketchfab** - [https://sketchfab.com](https://sketchfab.com)

   - Search for "anatomical human body"
   - Filter by "Downloadable" and "GLB/GLTF"

2. **TurboSquid** - [https://www.turbosquid.com](https://www.turbosquid.com)

   - Professional quality models
   - Free and paid options

3. **Free3D** - [https://free3d.com](https://free3d.com)

   - Free 3D models
   - Various formats available

4. **Create in Blender**
   - Download and install Blender
   - Follow Blender tutorials
   - Export as GLB/GLTF

### Model Requirements

| Model Type | Format   | Poly Count | Texture Size |
| ---------- | -------- | ---------- | ------------ |
| Full Body  | GLB/GLTF | < 50,000   | 1024x1024    |
| Organs     | GLB/GLTF | < 10,000   | 512x512      |
| Systems    | GLB/GLTF | < 30,000   | 1024x1024    |
| Cells      | GLB/GLTF | < 5,000    | 256x256      |
| Neurons    | GLB/GLTF | < 3,000    | 256x256      |
| Atoms      | GLB/GLTF | < 1,000    | 128x128      |

---

## 🔧 Step 9: Configure VS Code

### Recommended Extensions

Install these VS Code extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "streetsidesoftware.code-spell-checker",
    "eamodio.gitlens",
    "ms-vscode.live-server"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 🧪 Step 10: Run Tests

```bash
# Run all tests
npm test

# Run tests for specific package
cd packages/web
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## 🚀 Step 11: Build for Production

### Web Build

```bash
cd packages/web
npm run build

# Output: packages/web/dist/
```

### Mobile Build

```bash
cd packages/mobile

# iOS build
npm run build:ios

# Android build
npm run build:android

# Expo build (both platforms)
npm run build:expo
```

### Desktop Build

```bash
cd packages/desktop

# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

---

## 📝 Step 12: Environment Variables

### Web App (.env)

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Human Body App
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
```

### Mobile App (.env)

```env
EXPO_API_URL=http://localhost:3001
EXPO_APP_NAME=Human Body App
EXPO_APP_VERSION=1.0.0
EXPO_ENABLE_ANALYTICS=false
```

### Desktop App (.env)

```env
ELECTRON_API_URL=http://localhost:3001
ELECTRON_APP_NAME=Human Body App
ELECTRON_APP_VERSION=1.0.0
```

### Backend (.env)

```env
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/human_body

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AWS
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 🔍 Troubleshooting

### Common Issues

#### Node.js Version Error

```bash
# Error: Node version too old
# Solution: Upgrade Node.js to v18 or higher
nvm install 18
nvm use 18
```

#### Port Already in Use

```bash
# Error: Port 5173 already in use
# Solution: Kill the process or use a different port
# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:5173 | xargs kill -9
```

#### Module Not Found

```bash
# Error: Module not found
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3D Models Not Loading

```bash
# Check file paths
# Ensure models are in public/models directory
# Verify file format (GLB/GLTF)
# Check browser console for errors
```

---

## 📚 Next Steps

1. **Read the Development Guide** - [`04-DEVELOPMENT-GUIDE.md`](./04-DEVELOPMENT-GUIDE.md)
2. **Explore the Codebase** - Start with `packages/web/src/App.tsx`
3. **Add Your First Feature** - Follow the development guide
4. **Contribute** - Check the contributing guidelines

---

## 🆘 Getting Help

- **Documentation** - Check the `/docs` folder
- **GitHub Issues** - [https://github.com/anassbenfares7/human-body-app/issues](https://github.com/anassbenfares7/human-body-app/issues)
- **Community** - Join our Discord server (coming soon)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

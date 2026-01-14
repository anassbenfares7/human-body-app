# 🛠️ Technology Stack: Human Body Educational App

## 📋 Overview

This document outlines the recommended technology stack for building the interactive human body educational app across web, mobile, and desktop platforms.

---

## 🎯 Core Technologies

### Frontend Framework

| Technology     | Purpose           | Why                                                          |
| -------------- | ----------------- | ------------------------------------------------------------ |
| **React 18+**  | Core UI framework | Component-based, large ecosystem, excellent performance      |
| **TypeScript** | Type safety       | Catches errors early, better IDE support, easier maintenance |
| **Vite**       | Build tool        | Fast development server, optimized production builds         |

### 3D Rendering

| Technology            | Purpose             | Why                                                    |
| --------------------- | ------------------- | ------------------------------------------------------ |
| **Three.js**          | 3D graphics library | Most popular, extensive documentation, large community |
| **React Three Fiber** | React integration   | Declarative 3D in React, easier state management       |
| **@react-three/drei** | Helper components   | Pre-built 3D controls, loaders, and utilities          |

### Styling

| Technology        | Purpose           | Why                                                     |
| ----------------- | ----------------- | ------------------------------------------------------- |
| **Tailwind CSS**  | Utility-first CSS | Rapid development, consistent design, small bundle size |
| **Framer Motion** | Animations        | Smooth animations, gesture support, React-friendly      |

### State Management

| Technology      | Purpose      | Why                                          |
| --------------- | ------------ | -------------------------------------------- |
| **Zustand**     | Global state | Lightweight, simple API, TypeScript support  |
| **React Query** | Server state | Caching, synchronization, optimistic updates |

---

## 🌐 Web Platform

### Tech Stack

```
React 18 + TypeScript + Vite + Three.js + Tailwind CSS
```

### Key Dependencies

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
    "lucide-react": "^0.303.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Web App (PWA)

- **Workbox** - Service worker management
- **Web App Manifest** - Installable on mobile devices

---

## 📱 Mobile Platform

### Tech Stack

```
React Native + TypeScript + Expo + Three.js (react-three-fiber)
```

### Key Dependencies

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
    "@react-navigation/native-stack": "^6.9.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.73.0",
    "typescript": "^5.3.0",
    "@expo/webpack-config": "^19.0.0"
  }
}
```

### Platform Targets

- **iOS 14+** (iPhone/iPad)
- **Android 8.0+** (API level 26+)

### Mobile-Specific Features

- Touch gestures for 3D navigation
- Haptic feedback
- Camera integration (for AR)
- Offline storage (AsyncStorage)

---

## 💻 Desktop Platform

### Tech Stack

```
Electron + React + TypeScript + Vite + Three.js
```

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.96.0",
    "electron": "^28.0.0"
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

### Platform Targets

- **Windows 10/11**
- **macOS 10.15+**
- **Linux (Ubuntu 20.04+)**

### Desktop-Specific Features

- Native window controls
- Keyboard shortcuts
- System tray integration
- File system access
- Native notifications

---

## 🔧 Backend & Services

### API Server

| Technology     | Purpose       | Why                                |
| -------------- | ------------- | ---------------------------------- |
| **Node.js**    | Runtime       | JavaScript everywhere, async I/O   |
| **Express.js** | Web framework | Minimal, flexible, large ecosystem |
| **TypeScript** | Type safety   | Consistent with frontend           |

### Database

| Technology     | Purpose          | Why                                      |
| -------------- | ---------------- | ---------------------------------------- |
| **PostgreSQL** | Primary database | Relational, ACID compliant, JSON support |
| **Redis**      | Caching          | Fast in-memory caching, session storage  |

### Authentication

| Technology    | Purpose          | Why                     |
| ------------- | ---------------- | ----------------------- |
| **JWT**       | Token-based auth | Stateless, scalable     |
| **bcrypt**    | Password hashing | Secure password storage |
| **OAuth 2.0** | Social login     | Google, GitHub, etc.    |

### File Storage

| Technology     | Purpose          | Why                       |
| -------------- | ---------------- | ------------------------- |
| **AWS S3**     | 3D model storage | Scalable, CDN integration |
| **CloudFront** | CDN              | Fast global delivery      |

### Payment Processing

| Technology | Purpose  | Why                                        |
| ---------- | -------- | ------------------------------------------ |
| **Stripe** | Payments | Developer-friendly, supports subscriptions |

---

## 🗄️ Database Schema

### Tables

#### Users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Organs

```sql
CREATE TABLE organs (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  system VARCHAR(50) NOT NULL,
  location TEXT,
  function TEXT,
  model_path VARCHAR(255),
  position JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### BodySystems

```sql
CREATE TABLE body_systems (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7),
  model_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### UserProgress

```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  organ_id VARCHAR(50) REFERENCES organs(id),
  viewed_at TIMESTAMP DEFAULT NOW(),
  quiz_score INTEGER,
  UNIQUE(user_id, organ_id)
);
```

---

## 📦 Project Structure

```
human-body-app/
├── packages/
│   ├── web/                 # Web application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── 3d/
│   │   │   │   │   ├── BodyViewer.tsx
│   │   │   │   │   ├── OrganModel.tsx
│   │   │   │   │   └── CameraControls.tsx
│   │   │   │   ├── ui/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   └── InfoPanel.tsx
│   │   │   │   └── shared/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   └── App.tsx
│   │   ├── public/
│   │   │   └── models/
│   │   └── package.json
│   │
│   ├── mobile/              # Mobile application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   ├── navigation/
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   ├── desktop/             # Desktop application
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   └── index.ts
│   │   │   └── renderer/
│   │   │       └── App.tsx
│   │   └── package.json
│   │
│   ├── shared/              # Shared code
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   ├── utils/
│   │   │   └── data/
│   │   └── package.json
│   │
│   └── backend/             # Backend API
│       ├── src/
│       │   ├── routes/
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── middleware/
│       │   └── server.ts
│       └── package.json
│
├── docs/                    # Documentation
│   ├── 01-PRODUCT-SPECIFICATION.md
│   ├── 02-TECHNOLOGY-STACK.md
│   ├── 03-SETUP-GUIDE.md
│   └── 04-DEVELOPMENT-GUIDE.md
│
├── .gitignore
├── package.json
├── turbo.json
└── README.md
```

---

## 🔐 Security Considerations

### Frontend Security

- Content Security Policy (CSP)
- HTTPS only
- Input sanitization
- XSS prevention
- CSRF tokens

### Backend Security

- Rate limiting
- Input validation
- SQL injection prevention
- Secure headers
- Environment variables for secrets

### Data Protection

- Encryption at rest (PostgreSQL)
- Encryption in transit (TLS)
- GDPR compliance
- User data anonymization

---

## ⚡ Performance Optimization

### 3D Rendering

- Use GLB/GLTF format (optimized for web)
- Implement Level of Detail (LOD)
- Lazy load 3D models
- Use instanced meshes for repeated objects
- Compress textures

### Web Performance

- Code splitting
- Lazy loading routes
- Image optimization
- CDN for assets
- Service worker caching

### Mobile Performance

- Reduce model complexity
- Optimize bundle size
- Use native modules for heavy computations
- Implement efficient state management

---

## 🧪 Testing Strategy

### Unit Testing

- **Jest** - Test runner
- **React Testing Library** - Component testing
- **Vitest** - Fast unit tests (Vite)

### Integration Testing

- **Playwright** - End-to-end testing
- **Detox** - Mobile E2E testing

### 3D Testing

- Manual testing for 3D interactions
- Performance profiling
- Cross-browser testing

---

## 📚 Learning Resources

### React & TypeScript

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Three.js & 3D

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Journey](https://threejs-journey.com/)

### Development Tools

- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Electron Documentation](https://www.electronjs.org/docs)

---

## 🚀 Getting Started

See [`03-SETUP-GUIDE.md`](./03-SETUP-GUIDE.md) for detailed setup instructions.

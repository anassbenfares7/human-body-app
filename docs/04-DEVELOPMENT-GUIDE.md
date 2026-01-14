# 📖 Development Guide: Human Body Educational App

This guide provides detailed instructions for developing the human body educational app.

---

## 🎯 Development Workflow

### Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**

```
feat(web): add organ selection highlighting
fix(mobile): resolve zoom gesture conflict
docs(readme): update installation instructions
```

---

## 🏗️ Architecture Overview

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── Sidebar
│   └── MainContent
│       ├── BodyViewer (3D Canvas)
│       │   ├── Scene
│       │   ├── Camera
│       │   ├── Lights
│       │   ├── BodyModel
│       │   │   ├── MaleBody
│       │   │   └── FemaleBody
│       │   └── OrganModel
│       └── InfoPanel
│           ├── OrganDetails
│           └── SystemInfo
└── Modals
    ├── SearchModal
    └── SettingsModal
```

### State Management

Using **Zustand** for global state management:

```typescript
// packages/web/src/store/useAppStore.ts
import { create } from "zustand";

interface AppState {
  // State
  selectedGender: "male" | "female";
  selectedOrgan: string | null;
  visibleSystems: string[];
  viewMode: "macro" | "micro" | "nano";

  // Actions
  setGender: (gender: "male" | "female") => void;
  selectOrgan: (organId: string | null) => void;
  toggleSystem: (systemId: string) => void;
  setViewMode: (mode: "macro" | "micro" | "nano") => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  selectedGender: "male",
  selectedOrgan: null,
  visibleSystems: ["skeletal", "muscular"],
  viewMode: "macro",

  // Actions
  setGender: (gender) => set({ selectedGender: gender }),
  selectOrgan: (organId) => set({ selectedOrgan: organId }),
  toggleSystem: (systemId) =>
    set((state) => ({
      visibleSystems: state.visibleSystems.includes(systemId)
        ? state.visibleSystems.filter((id) => id !== systemId)
        : [...state.visibleSystems, systemId],
    })),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
```

---

## 🎨 3D Development with Three.js

### Basic Three.js Setup

```typescript
// packages/web/src/components/3d/BodyViewer.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function BodyModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function BodyViewer() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }} shadows>
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

          {/* 3D Model */}
          <BodyModel url="/models/male-body.glb" />

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Loading 3D Models

```typescript
// packages/web/src/components/3d/OrganModel.tsx
import { useGLTF, Html } from "@react-three/drei";
import { useState } from "react";

interface OrganModelProps {
  organId: string;
  modelPath: string;
  onClick: (organId: string) => void;
}

export default function OrganModel({
  organId,
  modelPath,
  onClick,
}: OrganModelProps) {
  const { scene } = useGLTF(modelPath);
  const [hovered, setHovered] = useState(false);

  return (
    <primitive
      object={scene}
      onClick={(e) => {
        e.stopPropagation();
        onClick(organId);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {hovered && (
        <Html position={[0, 0, 0]}>
          <div className="bg-blue-500 text-white px-2 py-1 rounded">
            {organId}
          </div>
        </Html>
      )}
    </primitive>
  );
}
```

### Body System Layers

```typescript
// packages/web/src/components/3d/SystemLayer.tsx
import { useGLTF } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";

interface SystemLayerProps {
  systemId: string;
  modelPath: string;
}

export default function SystemLayer({ systemId, modelPath }: SystemLayerProps) {
  const visibleSystems = useAppStore((state) => state.visibleSystems);
  const { scene } = useGLTF(modelPath);

  if (!visibleSystems.includes(systemId)) {
    return null;
  }

  return <primitive object={scene} />;
}
```

### Multi-Scale Exploration

```typescript
// packages/web/src/components/3d/MultiScaleViewer.tsx
import { Canvas } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import MacroView from "./MacroView";
import MicroView from "./MicroView";
import NanoView from "./NanoView";

export default function MultiScaleViewer() {
  const viewMode = useAppStore((state) => state.viewMode);

  return (
    <Canvas>
      {viewMode === "macro" && <MacroView />}
      {viewMode === "micro" && <MicroView />}
      {viewMode === "nano" && <NanoView />}
    </Canvas>
  );
}
```

---

## 🔍 Search Functionality

### Search Component

```typescript
// packages/web/src/components/ui/SearchBar.tsx
import { useState } from "react";
import { Search } from "lucide-react";
import { ORGANS_DATA } from "@/data/organs";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const filtered = ORGANS_DATA.filter(
      (organ) =>
        organ.name.toLowerCase().includes(value.toLowerCase()) ||
        organ.system.toLowerCase().includes(value.toLowerCase()) ||
        organ.function.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div className="relative">
      <div className="flex items-center border rounded-lg px-3 py-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search organs, systems..."
          className="ml-2 outline-none flex-1"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto">
          {results.map((organ) => (
            <div
              key={organ.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => selectOrgan(organ.id)}
            >
              <div className="font-medium">{organ.name}</div>
              <div className="text-sm text-gray-500">{organ.system}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 📊 Data Structure

### Organ Data

```typescript
// packages/shared/src/data/organs.ts
export interface Organ {
  id: string;
  name: string;
  system: string;
  location: string;
  function: string;
  position: { x: number; y: number; z: number };
  modelPath: string;
  info: {
    description: string;
    size: string;
    weight: string;
    facts: string[];
  };
  relatedOrgans: string[];
}

export const ORGANS_DATA: Organ[] = [
  {
    id: "heart",
    name: "Heart",
    system: "circulatory",
    location: "chest cavity, slightly left of center",
    function: "pumps blood throughout the body",
    position: { x: -0.1, y: 1.2, z: 0.1 },
    modelPath: "/models/organs/heart.glb",
    info: {
      description:
        "The heart is a muscular organ that pumps blood through the blood vessels of the circulatory system.",
      size: "fist-sized",
      weight: "250-350 grams",
      facts: [
        "Beats approximately 100,000 times per day",
        "Pumps about 2,000 gallons of blood daily",
        "Has four chambers: left and right atria, left and right ventricles",
        "Can continue beating even when disconnected from the body",
      ],
    },
    relatedOrgans: ["lungs", "arteries", "veins", "brain"],
  },
  // ... more organs
];
```

### Body System Data

```typescript
// packages/shared/src/data/bodySystems.ts
export interface BodySystem {
  id: string;
  name: string;
  description: string;
  color: string;
  modelPath: string;
  organs: string[];
}

export const BODY_SYSTEMS: BodySystem[] = [
  {
    id: "skeletal",
    name: "Skeletal System",
    description: "Provides structure, protection, and support for the body",
    color: "#e0e0e0",
    modelPath: "/models/systems/skeletal.glb",
    organs: ["skull", "spine", "ribs", "arms", "legs", "pelvis"],
  },
  {
    id: "muscular",
    name: "Muscular System",
    description: "Enables movement and maintains posture",
    color: "#ff6b6b",
    modelPath: "/models/systems/muscular.glb",
    organs: ["biceps", "triceps", "quadriceps", "hamstrings", "abdominals"],
  },
  // ... more systems
];
```

---

## 🔌 API Integration

### API Client Setup

```typescript
// packages/web/src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API Endpoints

```typescript
// packages/web/src/services/organService.ts
import api from "@/lib/api";

export const organService = {
  // Get all organs
  getAll: async () => {
    const response = await api.get("/api/organs");
    return response.data;
  },

  // Get organ by ID
  getById: async (id: string) => {
    const response = await api.get(`/api/organs/${id}`);
    return response.data;
  },

  // Search organs
  search: async (query: string) => {
    const response = await api.get(`/api/organs/search?q=${query}`);
    return response.data;
  },

  // Get organs by system
  getBySystem: async (systemId: string) => {
    const response = await api.get(`/api/organs/system/${systemId}`);
    return response.data;
  },
};
```

---

## 🧪 Testing

### Unit Tests

```typescript
// packages/web/src/components/3d/BodyViewer.test.tsx
import { render, screen } from "@testing-library/react";
import BodyViewer from "./BodyViewer";

describe("BodyViewer", () => {
  it("renders the canvas", () => {
    render(<BodyViewer />);
    expect(screen.getByRole("application")).toBeInTheDocument();
  });

  it("loads the 3D model", () => {
    render(<BodyViewer />);
    // Test model loading logic
  });
});
```

### Integration Tests

```typescript
// packages/web/src/integration/organSelection.test.ts
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("Organ Selection", () => {
  it("selects an organ when clicked", async () => {
    render(<App />);

    // Click on an organ
    const organ = await waitFor(() => screen.getByTestId("organ-heart"));
    fireEvent.click(organ);

    // Verify organ is selected
    expect(screen.getByText("Heart")).toBeInTheDocument();
  });
});
```

---

## ⚡ Performance Optimization

### Lazy Loading

```typescript
// packages/web/src/App.tsx
import { lazy, Suspense } from "react";

const BodyViewer = lazy(() => import("./components/3d/BodyViewer"));
const InfoPanel = lazy(() => import("./components/ui/InfoPanel"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BodyViewer />
      <InfoPanel />
    </Suspense>
  );
}
```

### Model Optimization

```typescript
// Use compressed models
import { useGLTF } from "@react-three/drei";

function OptimizedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url, "/draco/"); // Use Draco compression
  return <primitive object={scene} />;
}
```

### Code Splitting

```typescript
// packages/web/src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./pages/Home"),
  },
  {
    path: "/explore",
    lazy: () => import("./pages/Explore"),
  },
  {
    path: "/quiz",
    lazy: () => import("./pages/Quiz"),
  },
]);
```

---

## 🎨 Styling with Tailwind CSS

### Component Styling

```typescript
// packages/web/src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
```

### Dark Mode Support

```typescript
// packages/web/src/components/ui/ThemeProvider.tsx
import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
```

---

## 🚀 Deployment

### Web Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Mobile Deployment

```bash
# iOS
cd packages/mobile
eas build --platform ios

# Android
eas build --platform android
```

### Desktop Deployment

```bash
# Build for all platforms
cd packages/desktop
npm run build:all
```

---

## 📚 Best Practices

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Design

- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into custom hooks
- Use proper TypeScript interfaces

### Performance

- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize 3D models (GLB format, Draco compression)
- Use CDN for static assets

### Security

- Never commit sensitive data
- Use environment variables for secrets
- Implement proper authentication
- Validate all user inputs

---

## 🆘 Common Issues & Solutions

### 3D Model Not Loading

**Problem:** Model doesn't appear in the viewer

**Solution:**

- Check file path is correct
- Verify model format (GLB/GLTF)
- Check browser console for errors
- Ensure model is in `public/models` directory

### State Not Updating

**Problem:** State changes not reflected in UI

**Solution:**

- Check if you're mutating state directly
- Ensure you're using the setter function
- Verify component is re-rendering
- Check for stale closures

### Performance Issues

**Problem:** App is slow or laggy

**Solution:**

- Reduce model polygon count
- Implement lazy loading
- Use React.memo for expensive components
- Enable compression for assets

---

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

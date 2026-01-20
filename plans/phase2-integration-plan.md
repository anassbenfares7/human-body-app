# Phase 2 Integration Plan - Main Web Application

## 📋 Overview

**Objective:** Integrate Phase 2 (Anatomy Interaction Layer) features into the main web application (`packages/web/`).

**Current State:**
- Phase 2 test environment (`phase2-test/`) uses vanilla Three.js with 3-manager architecture
- Main web app (`packages/web/`) uses React Three Fiber with basic functionality
- Shared package (`packages/shared/`) has types and constants

**Goal:** Migrate Phase 2 managers and features to React/TypeScript with React Three Fiber, while maintaining existing web app structure.

---

## 🏗️ Architecture Comparison

### Phase 2 Test Environment (Vanilla Three.js)

```
InteractionManager (Coordinator)
├── SystemManager (Scene & Visibility)
├── SelectionManager (Selection & Highlight)
└── EnhancedRaycaster (Raycasting)
```

### Main Web App (React Three Fiber)

```
App.tsx
├── BodyViewer (Canvas)
│   ├── BodyModel (GLTF)
│   ├── SystemLayer (System visibility)
│   └── OrbitControls
├── Header
├── Sidebar
└── InfoPanel
```

### Target Architecture (Integrated)

```
App.tsx
├── Header
├── Sidebar (with Phase 2 controls)
├── BodyViewer (Canvas)
│   ├── SceneSetup (Lighting, Environment)
│   ├── BodyModel (GLTF)
│   ├── SystemLayer (Enhanced with Phase 2)
│   ├── OrganMeshes (Individual organ meshes)
│   ├── RelationshipLines (Future Phase 3)
│   └── OrbitControls (Enhanced)
├── InfoPanel (Enhanced)
└── InteractionState (Zustand store extended)
```

---

## 📊 Data Structure Migration

### Phase 2 JavaScript → TypeScript

| Phase 2 (JS) | Main App (TS) | Notes |
|----------------|---------------|-------|
| `ORGANS_DATA` | `ORGANS_DATA` (from shared) | Already exists in shared |
| `BODY_SYSTEMS` | `BODY_SYSTEMS` (from shared) | Already exists in shared |
| `INTERACTION_STATE` | Extended `useAppStore` | Add Phase 2 state |
| `SYSTEM_COLORS` | `SYSTEM_COLORS` (from shared) | Already exists in shared |

### Extended Zustand Store

```typescript
// packages/web/src/store/useAppStore.ts (Extended)

import { create } from 'zustand';
import { ViewMode } from '@human-body/shared';

// Phase 2 Interaction Modes
export type InteractionMode = 'normal' | 'focus' | 'isolate-system' | 'isolate-organ';
export type IsolationMode = 'none' | 'system' | 'organ';

interface AppState {
  // === Existing State ===
  selectedGender: 'male' | 'female';
  selectedOrgan: string | null;
  visibleSystems: string[];
  viewMode: ViewMode;
  theme: 'light' | 'dark';
  searchQuery: string;
  isLoading: boolean;
  
  // === Phase 2 State ===
  // Interaction Mode
  interactionMode: InteractionMode;
  isolationMode: IsolationMode;
  isolatedSystemId: string | null;
  isolatedOrganId: string | null;
  
  // Hover State
  hoveredOrgan: string | null;
  
  // Focus Mode
  isFocusMode: boolean;
  cameraTarget: { x: number; y: number; z: number } | null;
  
  // System Opacity
  systemOpacity: Record<string, number>;
  
  // === Actions ===
  // Existing Actions
  setGender: (gender: 'male' | 'female') => void;
  selectOrgan: (organId: string | null) => void;
  toggleSystem: (systemId: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
  
  // === Phase 2 Actions ===
  // Interaction Mode
  setInteractionMode: (mode: InteractionMode) => void;
  setIsolationMode: (mode: IsolationMode) => void;
  setHoveredOrgan: (organId: string | null) => void;
  
  // Focus Mode
  toggleFocusMode: () => void;
  setCameraTarget: (target: { x: number; y: number; z: number } | null) => void;
  
  // Isolation
  isolateSystem: (systemId: string) => void;
  isolateOrgan: (organId: string) => void;
  showAllSystems: () => void;
  
  // System Opacity
  setSystemOpacity: (systemId: string, opacity: number) => void;
  
  // Quick Toggle
  toggleSystemQuick: (systemId: string) => void;
  
  // Reset Extended
  resetInteraction: () => void;
}
```

---

## 🔧 Component Migration Plan

### 1. New Components to Create

| Component | Purpose | File Path |
|------------|---------|------------|
| **SystemControls** | System toggle checkboxes with Phase 2 features | `packages/web/src/components/ui/SystemControls.tsx` |
| **ModeIndicator** | Display current interaction mode | `packages/web/src/components/ui/ModeIndicator.tsx` |
| **OrganMesh** | Individual organ mesh with interaction | `packages/web/src/components/3d/OrganMesh.tsx` |
| **OrganGroup** | Group of organs per system | `packages/web/src/components/3d/OrganGroup.tsx` |
| **KeyboardControls** | Keyboard shortcuts handler | `packages/web/src/components/3d/KeyboardControls.tsx` |
| **Tooltip** | Hover tooltip for organs | `packages/web/src/components/ui/Tooltip.tsx` |

### 2. Existing Components to Update

| Component | Changes | File Path |
|------------|----------|------------|
| **BodyViewer** | Add Phase 2 hooks and managers | `packages/web/src/components/3d/BodyViewer.tsx` |
| **Sidebar** | Add SystemControls and ModeIndicator | `packages/web/src/components/ui/Sidebar.tsx` |
| **InfoPanel** | Add Phase 2 organ information | `packages/web/src/components/ui/InfoPanel.tsx` |
| **useAppStore** | Extend with Phase 2 state and actions | `packages/web/src/store/useAppStore.ts` |

---

## 📦 File Structure After Integration

```
packages/web/src/
├── App.tsx (Updated)
├── main.tsx
├── index.css
├── components/
│   ├── 3d/
│   │   ├── BodyViewer.tsx (Updated)
│   │   ├── BodyModel.tsx (Existing)
│   │   ├── SystemLayer.tsx (Updated)
│   │   ├── OrganMesh.tsx (NEW)
│   │   ├── OrganGroup.tsx (NEW)
│   │   ├── KeyboardControls.tsx (NEW)
│   │   └── hooks/
│   │       ├── useInteractionManager.ts (NEW)
│   │       ├── useSystemManager.ts (NEW)
│   │       └── useSelectionManager.ts (NEW)
│   └── ui/
│       ├── Header.tsx (Existing)
│       ├── Sidebar.tsx (Updated)
│       ├── InfoPanel.tsx (Updated)
│       ├── SystemControls.tsx (NEW)
│       ├── ModeIndicator.tsx (NEW)
│       ├── Tooltip.tsx (NEW)
│       └── SearchBar.tsx (Existing)
└── store/
    └── useAppStore.ts (Extended)
```

---

## 🎯 Implementation Steps

### Step 1: Extend Zustand Store

**File:** `packages/web/src/store/useAppStore.ts`

**Changes:**
1. Add Phase 2 state properties (interactionMode, isolationMode, hoveredOrgan, etc.)
2. Add Phase 2 actions (toggleFocusMode, isolateSystem, etc.)
3. Implement action logic

```typescript
// Example additions to useAppStore.ts

export const useAppStore = create<AppState>((set, get) => ({
  // ... existing state and actions ...
  
  // Phase 2 State
  interactionMode: 'normal',
  isolationMode: 'none',
  isolatedSystemId: null,
  isolatedOrganId: null,
  hoveredOrgan: null,
  isFocusMode: false,
  cameraTarget: null,
  systemOpacity: {},
  
  // Phase 2 Actions
  setInteractionMode: (mode) => set({ interactionMode: mode }),
  
  setIsolationMode: (mode) => set({ isolationMode: mode }),
  
  setHoveredOrgan: (organId) => set({ hoveredOrgan: organId }),
  
  toggleFocusMode: () => set((state) => ({ 
    isFocusMode: !state.isFocusMode,
    interactionMode: !state.isFocusMode ? 'focus' : 'normal'
  })),
  
  isolateSystem: (systemId) => set({
    isolationMode: 'system',
    isolatedSystemId: systemId,
    isolatedOrganId: null,
    visibleSystems: [systemId],
    interactionMode: 'isolate-system'
  }),
  
  isolateOrgan: (organId) => set((state) => {
    const organ = ORGANS_DATA.find(o => o.id === organId);
    return {
      isolationMode: 'organ',
      isolatedOrganId: organId,
      isolatedSystemId: null,
      visibleSystems: organ ? [organ.system] : [],
      interactionMode: 'isolate-organ'
    };
  }),
  
  showAllSystems: () => set({
    isolationMode: 'none',
    isolatedSystemId: null,
    isolatedOrganId: null,
    visibleSystems: BODY_SYSTEMS.map(s => s.id),
    interactionMode: 'normal'
  }),
  
  setSystemOpacity: (systemId, opacity) => set((state) => ({
    systemOpacity: { ...state.systemOpacity, [systemId]: opacity }
  })),
  
  toggleSystemQuick: (systemId) => set((state) => ({
    visibleSystems: state.visibleSystems.includes(systemId)
      ? state.visibleSystems.filter(id => id !== systemId)
      : [...state.visibleSystems, systemId]
  })),
  
  resetInteraction: () => set({
    interactionMode: 'normal',
    isolationMode: 'none',
    isolatedSystemId: null,
    isolatedOrganId: null,
    hoveredOrgan: null,
    isFocusMode: false,
    cameraTarget: null,
    selectedOrgan: null
  }),
}));
```

---

### Step 2: Create OrganMesh Component

**File:** `packages/web/src/components/3d/OrganMesh.tsx`

**Purpose:** Individual organ mesh with interaction (hover, select, highlight)

```typescript
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';
import { ORGANS_DATA } from '@human-body/shared';

interface OrganMeshProps {
  organId: string;
  visible?: boolean;
  opacity?: number;
  highlight?: 'none' | 'hovered' | 'selected' | 'isolated';
}

export default function OrganMesh({ 
  organId, 
  visible = true, 
  opacity = 1,
  highlight = 'none' 
}: OrganMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { selectedOrgan, hoveredOrgan, selectOrgan, setHoveredOrgan } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const organData = ORGANS_DATA.find(o => o.id === organId);
  if (!organData) return null;
  
  const isSelected = selectedOrgan === organId;
  const isHoveredState = hoveredOrgan === organId;
  
  // Handle click
  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    selectOrgan(organId);
  };
  
  // Handle hover
  const handlePointerOver = () => {
    setIsHovered(true);
    setHoveredOrgan(organId);
  };
  
  const handlePointerOut = () => {
    setIsHovered(false);
    setHoveredOrgan(null);
  };
  
  // Calculate scale based on highlight state
  const getScale = () => {
    if (highlight === 'selected') return 1.1;
    if (highlight === 'hovered' || isHovered) return 1.05;
    if (highlight === 'isolated') return 1.05;
    return 1.0;
  };
  
  // Calculate emissive intensity
  const getEmissiveIntensity = () => {
    if (highlight === 'selected') return 0.4;
    if (highlight === 'hovered' || isHovered) return 0.2;
    if (highlight === 'isolated') return 0.3;
    return 0;
  };
  
  return (
    <mesh
      ref={meshRef}
      position={[organData.position.x, organData.position.y, organData.position.z]}
      visible={visible}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={getScale()}
    >
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial
        color={organData.system === 'circulatory' ? '#ff4757' : '#cccccc'}
        emissive={organData.system === 'circulatory' ? '#ff4757' : '#cccccc'}
        emissiveIntensity={getEmissiveIntensity()}
        transparent={opacity < 1}
        opacity={opacity}
        metalness={0.2}
        roughness={0.6}
      />
    </mesh>
  );
}
```

---

### Step 3: Create OrganGroup Component

**File:** `packages/web/src/components/3d/OrganGroup.tsx`

**Purpose:** Group organs by system with visibility and opacity control

```typescript
import { Group } from '@react-three/fiber';
import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';
import OrganMesh from './OrganMesh';

interface OrganGroupProps {
  systemId: string;
}

export default function OrganGroup({ systemId }: OrganGroupProps) {
  const { 
    visibleSystems, 
    systemOpacity, 
    selectedOrgan, 
    hoveredOrgan,
    isolationMode,
    isolatedSystemId,
    isolatedOrganId
  } = useAppStore();
  
  const systemData = BODY_SYSTEMS.find(s => s.id === systemId);
  if (!systemData) return null;
  
  const isVisible = visibleSystems.includes(systemId);
  const opacity = systemOpacity[systemId] ?? 1;
  
  // Determine highlight state for organs in this system
  const getHighlightState = (organId: string) => {
    if (selectedOrgan === organId) return 'selected';
    if (hoveredOrgan === organId) return 'hovered';
    if (isolationMode === 'system' && isolatedSystemId === systemId) return 'isolated';
    if (isolationMode === 'organ' && isolatedOrganId === organId) return 'isolated';
    return 'none';
  };
  
  return (
    <Group visible={isVisible}>
      {systemData.organs.map(organId => (
        <OrganMesh
          key={organId}
          organId={organId}
          visible={isVisible}
          opacity={opacity}
          highlight={getHighlightState(organId)}
        />
      ))}
    </Group>
  );
}
```

---

### Step 4: Create SystemControls Component

**File:** `packages/web/src/components/ui/SystemControls.tsx`

**Purpose:** UI controls for system toggling with Phase 2 features

```typescript
import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS, SYSTEM_COLORS } from '@human-body/shared';

export default function SystemControls() {
  const { 
    visibleSystems, 
    toggleSystem, 
    isolationMode,
    interactionMode
  } = useAppStore();
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Body Systems
      </h3>
      
      <div className="space-y-2">
        {BODY_SYSTEMS.map(system => (
          <label 
            key={system.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={visibleSystems.includes(system.id)}
              onChange={() => toggleSystem(system.id)}
              disabled={isolationMode !== 'none'}
              className="w-4 h-4 rounded"
              style={{ accentColor: system.color }}
            />
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: system.color }}
            />
            <span className="text-gray-700 dark:text-gray-300">
              {system.name}
            </span>
          </label>
        ))}
      </div>
      
      {isolationMode !== 'none' && (
        <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-sm">
          <p className="text-yellow-800 dark:text-yellow-200">
            Isolation mode active. Press 'I' to exit.
          </p>
        </div>
      )}
    </div>
  );
}
```

---

### Step 5: Create ModeIndicator Component

**File:** `packages/web/src/components/ui/ModeIndicator.tsx`

**Purpose:** Display current interaction mode

```typescript
import { useAppStore } from '@/store/useAppStore';

export default function ModeIndicator() {
  const { interactionMode, isFocusMode } = useAppStore();
  
  const modeLabels = {
    normal: 'Normal Mode',
    focus: 'Focus Mode',
    'isolate-system': 'Isolate System Mode',
    'isolate-organ': 'Isolate Organ Mode'
  };
  
  const modeHints = {
    normal: 'Press F to focus, I to isolate',
    focus: 'Press F to exit focus',
    'isolate-system': 'Press I to cycle modes, D to reset',
    'isolate-organ': 'Press I to cycle modes, D to reset'
  };
  
  return (
    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="font-semibold text-blue-900 dark:text-blue-100">
          {modeLabels[interactionMode]}
        </span>
      </div>
      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
        {modeHints[interactionMode]}
      </p>
    </div>
  );
}
```

---

### Step 6: Create KeyboardControls Component

**File:** `packages/web/src/components/3d/KeyboardControls.tsx`

**Purpose:** Handle keyboard shortcuts for Phase 2 features

```typescript
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';

export default function KeyboardControls() {
  const {
    toggleFocusMode,
    setIsolationMode,
    showAllSystems,
    resetInteraction,
    toggleSystemQuick,
    isolationMode,
    selectedOrgan
  } = useAppStore();
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // F key - Toggle focus mode
      if (event.key === 'f' || event.key === 'F') {
        toggleFocusMode();
      }
      
      // D key - Reset to default
      if (event.key === 'd' || event.key === 'D') {
        resetInteraction();
      }
      
      // I key - Toggle isolation mode
      if (event.key === 'i' || event.key === 'I') {
        const modes: Array<'none' | 'system' | 'organ'> = ['none', 'system', 'organ'];
        const currentIndex = modes.indexOf(isolationMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        const nextMode = modes[nextIndex];
        
        if (nextMode === 'system' && selectedOrgan) {
          const organ = ORGANS_DATA.find(o => o.id === selectedOrgan);
          if (organ) {
            setIsolationMode('system');
            // Store system ID in store
          }
        } else if (nextMode === 'organ' && selectedOrgan) {
          setIsolationMode('organ');
        } else {
          showAllSystems();
        }
      }
      
      // 1-7 keys - Quick toggle system
      const keyNum = parseInt(event.key);
      if (keyNum >= 1 && keyNum <= 7) {
        const systemId = BODY_SYSTEMS[keyNum - 1]?.id;
        if (systemId) {
          toggleSystemQuick(systemId);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    toggleFocusMode,
    setIsolationMode,
    showAllSystems,
    resetInteraction,
    toggleSystemQuick,
    isolationMode,
    selectedOrgan
  ]);
  
  return null; // This component doesn't render anything
}
```

---

### Step 7: Update BodyViewer Component

**File:** `packages/web/src/components/3d/BodyViewer.tsx`

**Changes:** Add OrganGroup and KeyboardControls

```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';
import BodyModel from './BodyModel';
import OrganGroup from './OrganGroup';
import KeyboardControls from './KeyboardControls';

export default function BodyViewer() {
  const { selectedGender, visibleSystems, viewMode } = useAppStore();
  
  return (
    <div className="h-screen w-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Environment */}
          <Environment preset="studio" />
          <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} />
          
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={50} />
          
          {/* 3D Models */}
          <BodyModel gender={selectedGender} />
          
          {/* Organ Groups (Phase 2) */}
          {BODY_SYSTEMS.map(system => (
            <OrganGroup key={system.id} systemId={system.id} />
          ))}
          
          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={viewMode === 'macro' ? 1 : 0.1}
            maxDistance={viewMode === 'macro' ? 10 : 2}
            target={[0, 1, 0]}
          />
          
          {/* Keyboard Controls */}
          <KeyboardControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

---

### Step 8: Update Sidebar Component

**File:** `packages/web/src/components/ui/Sidebar.tsx`

**Changes:** Add SystemControls and ModeIndicator

```typescript
import SystemControls from './SystemControls';
import ModeIndicator from './ModeIndicator';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Mode Indicator (Phase 2) */}
        <ModeIndicator />
        
        {/* System Controls (Phase 2) */}
        <SystemControls />
        
        {/* Existing controls... */}
        {/* ... */}
      </div>
    </div>
  );
}
```

---

### Step 9: Update InfoPanel Component

**File:** `packages/web/src/components/ui/InfoPanel.tsx`

**Changes:** Add Phase 2 organ information

```typescript
import { useAppStore } from '@/store/useAppStore';
import { ORGANS_DATA, BODY_SYSTEMS } from '@human-body/shared';

export default function InfoPanel() {
  const { selectedOrgan } = useAppStore();
  
  if (!selectedOrgan) {
    return (
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-500 dark:text-gray-400">
          Click on an organ to see details
        </p>
      </div>
    );
  }
  
  const organ = ORGANS_DATA.find(o => o.id === selectedOrgan);
  const system = BODY_SYSTEMS.find(s => s.id === organ?.system);
  
  if (!organ || !system) return null;
  
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Organ Name */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {organ.name}
          </h2>
        </div>
        
        {/* System Badge */}
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: system.color }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {system.name}
          </span>
        </div>
        
        {/* Location */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Location
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {organ.location}
          </p>
        </div>
        
        {/* Function */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Function
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {organ.function}
          </p>
        </div>
        
        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Description
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {organ.info.description}
          </p>
        </div>
        
        {/* Facts */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Facts
          </h3>
          <ul className="space-y-1">
            {organ.info.facts.map((fact, index) => (
              <li 
                key={index}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
              >
                <span className="mr-2">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Related Organs */}
        {organ.relatedOrgans.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Related Organs
            </h3>
            <div className="flex flex-wrap gap-2">
              {organ.relatedOrgans.map(relatedId => {
                const related = ORGANS_DATA.find(o => o.id === relatedId);
                return related ? (
                  <button
                    key={relatedId}
                    onClick={() => useAppStore.getState().selectOrgan(relatedId)}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {related.name}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 🎮 Keyboard Controls Summary

| Key | Action | Store Action |
|-----|--------|--------------|
| **F** | Toggle Focus Mode | `toggleFocusMode()` |
| **D** | Reset to Default | `resetInteraction()` |
| **I** | Toggle Isolation Mode | `setIsolationMode()` |
| **1-7** | Quick Toggle System | `toggleSystemQuick()` |

---

## ✅ Testing Checklist

### Integration Testing

- [ ] System toggling works via UI checkboxes
- [ ] System toggling works via keyboard (1-7)
- [ ] Organ selection works with visual feedback
- [ ] Hover effects work correctly
- [ ] Focus mode toggles correctly
- [ ] Isolation mode cycles correctly (none → system → organ → none)
- [ ] Reset (D key) clears all states
- [ ] Mode indicator displays correctly
- [ ] Info panel shows correct organ information
- [ ] All Phase 2 keyboard shortcuts work

### Compatibility Testing

- [ ] Existing web app features still work
- [ ] Gender toggle works
- [ ] View mode toggle works
- [ ] Theme toggle works
- [ ] Search functionality works (existing)

### Performance Testing

- [ ] No performance degradation
- [ ] Smooth animations
- [ ] Responsive interactions

---

## 📚 Migration Notes

### Key Differences Between Phase 2 and Main App

| Aspect | Phase 2 (Vanilla Three.js) | Main App (React Three Fiber) |
|--------|----------------------------|------------------------------|
| **State Management** | INTERACTION_STATE object | Zustand store |
| **Component Structure** | Vanilla JS classes | React components |
| **Scene Management** | Manual THREE.Group creation | React components with Group |
| **Event Handling** | addEventListener | React event handlers |
| **Animation** | requestAnimationFrame | useFrame hook |

### Integration Strategy

1. **State First:** Extend Zustand store with Phase 2 state
2. **Components Second:** Create React components for Phase 2 features
3. **Integration Third:** Wire components into existing app structure
4. **Testing Fourth:** Test all Phase 2 features in React context

---

## 🎯 Success Criteria

- [ ] All Phase 2 features work in main web app
- [ ] Existing web app features are preserved
- [ ] Code is TypeScript-compliant
- [ ] UI is consistent with existing design
- [ ] Performance is acceptable
- [ ] All keyboard shortcuts work
- [ ] Documentation is updated

---

## 📞 Next Steps After Integration

1. **Test Phase 2 integration** thoroughly
2. **Update README** with Phase 2 integration status
3. **Replace placeholder geometry** with real GLB models
4. **Start Phase 3** implementation in main web app

---

**End of Phase 2 Integration Plan**

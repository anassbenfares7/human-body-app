# Human Body Educational App - Development Quick Reference
**For Phase 3.2 and Beyond**

---

## 🚀 Quick Start

### Run the App
```bash
cd packages/web
npm install
npm run dev
```

### Run Tests
```bash
node .claude/verify-organs-test.js
```

---

## 📁 Key Files

### Data Layer
| File | Purpose | Organs |
|------|---------|--------|
| `packages/shared/src/data/organs.ts` | All organ data | 50 organs |
| `packages/shared/src/constants/bodySystems.ts` | System definitions | 10 systems |

### 3D Components
| File | Purpose | Status |
|------|---------|--------|
| `packages/web/src/components/3d/BodyViewer.tsx` | Main 3D canvas | ✅ Working |
| `packages/web/src/components/3d/OrganGroup.tsx` | System grouping | ✅ Working |
| `packages/web/src/components/3d/OrganMesh.tsx` | Individual organ | ✅ Working |
| `packages/web/src/components/3d/KeyboardControls.tsx` | Input handling | ✅ Working |

### UI Components
| File | Purpose | Status |
|------|---------|--------|
| `packages/web/src/components/ui/Sidebar.tsx` | System controls | ✅ Working |
| `packages/web/src/components/ui/InfoPanel.tsx` | Organ details | ✅ Working |
| `packages/web/src/components/ui/SystemControls.tsx` | Checkboxes | ✅ Working |
| `packages/web/src/components/ui/ModeIndicator.tsx` | Mode display | ✅ Working |

### State Management
| File | Purpose | Status |
|------|---------|--------|
| `packages/web/src/store/useAppStore.ts` | Zustand store | ✅ Working |

---

## ⌨️ Keyboard Shortcuts (Phase 3.1)

| Key | Action | System |
|-----|--------|--------|
| **H** | Select heart | Circulatory |
| **A** | Select arteries | Circulatory |
| **V** | Select veins | Circulatory |
| **C** | Select capillaries | Circulatory |
| **D** | Reset selection | All |

---

## 🎯 Current State

### What's Working ✅
- 50 organs rendering as colored spheres
- Click selection with visual feedback
- Hover effects with glow
- Keyboard shortcuts for circulatory system
- System visibility toggles
- InfoPanel showing organ details
- Zustand state management
- Multi-system rendering

### What's Using Placeholders ⚠️
- All organs are spheres (not real 3D models)
- No smooth animations
- Basic visual feedback only

### What's Not Implemented Yet ❌
- Focus mode (camera focusing on organs)
- Isolation modes (hide other organs/systems)
- System relationships visualization
- Advanced camera behaviors
- Real organ GLB models

---

## 🔧 Common Tasks

### Add a New Organ
1. Add to `packages/shared/src/data/organs.ts`:
```typescript
{
  id: 'new-organ',
  name: 'New Organ',
  system: 'system-id',
  location: 'location description',
  function: 'function description',
  position: { x: 0, y: 1, z: 0 },
  modelPath: '/models/organs/new-organ.glb',
  info: {
    description: 'Description',
    size: 'Size info',
    weight: 'Weight info',
    facts: ['fact 1', 'fact 2']
  },
  relatedOrgans: ['organ1', 'organ2']
}
```

2. Add to system in `packages/shared/src/constants/bodySystems.ts`:
```typescript
{
  id: 'system-id',
  organs: ['new-organ', ...other-organs]
}
```

### Add a Keyboard Shortcut
Edit `packages/web/src/components/3d/KeyboardControls.tsx`:
```typescript
if (event.key === 'n' || event.key === 'N') {
  selectOrgan('new-organ');
  console.log('[KeyboardControls] New organ selected');
}
```

### Modify Organ Position
Edit organ data in `packages/shared/src/data/organs.ts`:
```typescript
position: { x: 0.5, y: 1.2, z: 0.3 } // Adjust coordinates
```

### Change Organ Color
Edit system color in `packages/shared/src/constants/bodySystems.ts`:
```typescript
color: '#ff0000' // New hex color
```

---

## 📊 System IDs Reference

| ID | Name | Color |
|----|------|-------|
| `skeletal` | Skeletal System | #e0e0e0 |
| `muscular` | Muscular System | #ff6b6b |
| `nervous` | Nervous System | #ffd93d |
| `circulatory` | Circulatory System | #ff4757 |
| `digestive` | Digestive System | #ffa502 |
| `respiratory` | Respiratory System | #2ed573 |
| `endocrine` | Endocrine System | #1e90ff |
| `lymphatic` | Lymphatic System | #9b59b6 |
| `urinary` | Urinary System | #00cec9 |
| `reproductive` | Reproductive System | #fd79a8 |

---

## 🐛 Troubleshooting

### Organs Not Visible
- Check system visibility in Sidebar (checkboxes)
- Check console for errors
- Verify organ exists in ORGANS_DATA
- Check position is within camera view (x: -1 to 1, y: 0.5 to 2, z: -0.5 to 0.5)

### Click Not Working
- Check OrbitControls not blocking clicks
- Verify onClick handler in OrganMesh
- Check console for event handler errors
- Verify organ has proper mesh ref

### Keyboard Shortcuts Not Working
- Check KeyboardControls component is mounted
- Check window event listener is active
- Check console for key event logs
- Verify selectOrgan action exists in store

### InfoPanel Not Showing
- Check selectedOrgan state in store
- Verify InfoPanel component is mounted
- Check console for rendering errors
- Verify organ has complete info object

---

## 📝 Development Workflow

### 1. Make Changes
Edit files in `packages/web/src/` or `packages/shared/src/`

### 2. Test Data Integrity
```bash
node .claude/verify-organs-test.js
```

### 3. Run App
```bash
cd packages/web
npm run dev
```

### 4. Test Interactions
- Click organs
- Use keyboard shortcuts
- Toggle system visibility
- Check InfoPanel updates

### 5. Document Changes
Update relevant `.claude/` files with progress

---

## 🎨 Visual Reference

### Organ Color Scheme (by System)
- **Gray** = Skeletal
- **Red** = Muscular, Circulatory
- **Yellow** = Nervous
- **Orange** = Digestive
- **Green** = Respiratory
- **Blue** = Endocrine
- **Purple** = Lymphatic
- **Cyan** = Urinary
- **Pink** = Reproductive

### Organ Positions (3D Space)
- **X axis:** Left (-) to Right (+)
- **Y axis:** Bottom (0) to Top (2)
- **Z axis:** Back (-) to Front (+)

Example: `position: { x: -0.1, y: 1.2, z: 0.1 }`
- Slightly left
- Upper chest
- Slightly forward

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `.claude/phase3-0-foundation-report.md` | Phase 3.0 summary |
| `.claude/phase3-1-progress.md` | Phase 3.1 detailed report |
| `.claude/phase3-1-execution-summary.md` | Phase 3.1 completion summary |
| `.claude/verify-organs-test.js` | Automated test script |
| `.claude/development-quick-reference.md` | This file |

---

## 🚦 Phase Status

| Phase | Name | Status |
|-------|------|--------|
| 1 | Foundation | ✅ Complete |
| 2 | Anatomy Interaction | ✅ Complete (phase2-test/) |
| 3.0 | Visible Organs Foundation | ✅ Complete |
| **3.1** | **Multi-System Foundation** | **✅ Complete** |
| 3.2 | Enhanced Interactions | 📋 Planned |
| 3.3 | System Controls | 📋 Planned |
| 4 | Content Expansion | 📋 Planned |
| 5 | UI Polish | 📋 Planned |

---

**Last Updated:** Phase 3.1 Completion (2025-01-19)
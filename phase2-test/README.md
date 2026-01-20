# Human Body 3D Visualization

**A vanilla Three.js proof-of-concept for interactive anatomy exploration**

> **Status:** Phase 2 Complete | Phase 3 Planned
> **Geometry:** Placeholder primitives (spheres, boxes, cylinders) - NOT real organ models

---

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Python, Node.js, or any HTTP server)

### Run Phase 2 Test Environment

```bash
cd phase2-test
python -m http.server 8000
# Open http://localhost:8000
```

### What You'll See
- 5 organs represented as geometric primitives
- 6 body systems (Skeletal, Muscular, Nervous, Circulatory, Digestive, Respiratory)
- Interactive 3D scene with full camera controls

---

## Controls Reference

### Mouse Controls

| Action | Behavior |
|--------|----------|
| Left Click + Drag | Rotate camera around scene |
| Right Click + Drag | Pan camera view |
| Scroll Wheel | Zoom in/out |
| Click Organ | Select organ (respects current mode) |
| Hover Organ | Show highlight and tooltip |

### Keyboard Controls

| Key | Action |
|-----|--------|
| **F** | Toggle Focus Mode (camera focuses on selected organ) |
| **D** | Reset camera and selection to default |
| **I** | Cycle isolation mode (none -> system -> organ -> none) |
| **1-6** | Toggle system visibility (see mapping below) |
| **A** | Toggle all systems ON/OFF |
| **Esc** | Cancel selection |

### System Number Mapping

| Number | System | Default State |
|--------|--------|---------------|
| 1 | Skeletal | Visible |
| 2 | Muscular | Hidden |
| 3 | Nervous | Visible |
| 4 | Circulatory | Visible |
| 5 | Digestive | Visible |
| 6 | Respiratory | Visible |

---

## Architecture

### 3-Manager Pattern

```
InteractionManager (Coordinator)
├── SystemManager (Scene & Visibility)
│   └── Manages: SystemGroups, OrganMeshes, Visibility, Opacity
└── SelectionManager (Selection & Highlight)
    └── Manages: Selection, Hover, Highlight Effects
```

### Scene Hierarchy

```
Scene
└── BodyGroup (THREE.Group)
    ├── SkeletalSystemGroup
    ├── MuscularSystemGroup
    ├── NervousSystemGroup
    ├── CirculatorySystemGroup
    ├── DigestiveSystemGroup
    ├── RespiratorySystemGroup
    └── [System Groups]
        └── OrganMeshes (THREE.Mesh)
```

### Data Flow

```
User Input (Mouse/Keyboard)
        ↓
InteractionManager (Routes events)
        ↓
┌───────────────┬────────────────┐
▼               ▼                ▼
SystemManager   SelectionManager  Camera
                │
                └── Organ Highlight Effects
```

### Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/managers/InteractionManager.js` | Main coordinator, handles all user input | ~700 |
| `src/managers/SystemManager.js` | Scene structure, system visibility | ~300 |
| `src/managers/SelectionManager.js` | Selection state, visual feedback | ~250 |
| `src/data/organsData.js` | 5 organ definitions (source of truth) | ~100 |
| `src/data/systemsData.js` | 6 body systems with organ associations | ~80 |
| `src/utils/EnhancedRaycaster.js` | Raycasting with visibility filtering | ~100 |

---

## Implemented Features

### Phase 1: Core 3D Engine

- [x] Three.js scene with professional OrbitControls
- [x] Placeholder geometry for organs (spheres, cylinders, boxes)
- [x] Basic organ selection with visual highlighting
- [x] Camera focus animation on selected organ
- [x] Smooth camera transitions with damping
- [x] Info panel showing selected organ details

### Phase 2: Anatomy Interaction Layer

- [x] 6 body systems with independent visibility control
- [x] Organ-to-system mapping
- [x] System groups for organized scene structure
- [x] Keyboard shortcuts for system toggling (1-6)
- [x] Isolation modes (system-level and organ-level)
- [x] Enhanced hover feedback with tooltips
- [x] Mode indicator showing current interaction state
- [x] Console logging with manager prefixes for debugging

### Visual Feedback States

| State | Scale | Emissive | Opacity | Use Case |
|-------|-------|----------|---------|----------|
| Normal | 1.0x | 0.0 | 1.0 | Default visible organ |
| Hovered | 1.05x | 0.2 | 1.0 | Mouse cursor over organ |
| Selected | 1.1x | 0.4 | 1.0 | Organ clicked/selected |
| Isolated | 1.05x | 0.3 | 1.0 | Only organ visible in isolate mode |
| Hidden | 1.0x | - | 0.0 | Organ/system not visible |

---

## Technical Constraints

### Geometry Limitations
**Current implementation uses placeholder primitives only** - these are NOT anatomically accurate models.

| ID | Name | System | Geometry | Position | Size |
|----|------|--------|----------|----------|------|
| brain | Brain | Nervous | Sphere | (0, 1.4, 0) | 0.22 |
| lungs | Lungs | Respiratory | Cylinder | (0, 0.8, 0) | 0.25 |
| heart | Heart | Circulatory | Sphere | (-0.2, 0.65, 0.15) | 0.18 |
| liver | Liver | Digestive | Box | (0.2, 0.4, 0) | 0.22 |
| stomach | Stomach | Digestive | Sphere | (-0.15, 0.3, 0) | 0.18 |

### Technology Stack
- **Three.js:** v0.160.0 (CDN, ES modules)
- **JavaScript:** Vanilla ES6+ (no frameworks)
- **Build:** None (direct browser execution)

### Platform Support
- Desktop web browsers only
- No mobile support
- No backend required

---

## Interaction Modes

### Normal Mode (Default)
- All visible systems displayed
- Click organs to select
- Camera orbit/pan/zoom enabled
- Hover shows tooltip

### Focus Mode (Toggle with F)
- Camera focuses on selected organ
- Smooth animated transition
- Press F again to exit
- Requires a selected organ

### Isolate System Mode (Press I once)
- Only selected system's organs visible
- All other systems hidden
- Press I again to cycle modes
- Requires a selected organ in a system

### Isolate Organ Mode (Press I twice)
- Only selected organ visible
- All other organs hidden
- Press I again to return to normal
- Requires a selected organ

---

## Extending the Project

### Adding a New Organ

Edit `src/data/organsData.js`:

```javascript
export const ORGANS_DATA = [
  // ... existing organs
  {
    id: 'kidney',                     // Unique identifier
    name: 'Kidney',                   // Display name
    system: 'Urinary',                // System name
    function: 'Filters blood',        // Description
    meshName: 'Kidney',               // Three.js object name
    position: { x: 0.15, y: 0.35, z: -0.1 },  // World position
    color: 0x8B4513,                  // Hex color
    originalColor: null,              // (reserved)
    geometry: 'sphere',               // primitive type
    size: 0.12,                       // base size
    scale: { x: 1.0, y: 1.0, z: 1.0 }, // scaling
    systemId: 'urinary',              // system reference
    groupId: 'urinary-organs',        // group reference
    visible: true,
    opacity: 1.0
  }
];
```

### Adding a New Body System

1. Edit `src/data/systemsData.js`:

```javascript
export const BODY_SYSTEMS = [
  // ... existing systems
  {
    id: 'urinary',                    // Unique ID
    name: 'Urinary System',           // Display name
    description: 'Filters waste from blood',
    color: '#9b59b6',                 // System color
    organs: ['kidney', 'bladder'],    // Associated organs
    group: null,                      // (set at runtime)
    visible: true,
    opacity: 1.0
  }
];
```

2. Update `index.html` to add the system toggle:

```html
<div class="system-toggle" data-system="urinary">
    <input type="checkbox" id="urinary-toggle" checked>
    <label for="urinary-toggle">7. Urinary</label>
</div>
```

3. Update keyboard shortcuts in `src/managers/InteractionManager.js`

### Customizing Visual Effects

Edit `src/managers/SelectionManager.js` to adjust highlight parameters:

```javascript
// In applyHighlightEffect() method
const effects = {
  selected: {
    scale: 1.1,        // Change selection scale
    emissive: 0.4,     // Change glow intensity
    duration: 300      // Animation duration (ms)
  },
  hovered: {
    scale: 1.05,
    emissive: 0.2
  }
};
```

### Adding New Interactions

The pattern follows: Input -> InteractionManager -> SystemManager/SelectionManager

```javascript
// In src/managers/InteractionManager.js
handleKeyPress(event) {
  switch(event.key.toLowerCase()) {
    case 'x':  // New interaction
      this.handleNewInteraction();
      break;
  }
}
```

---

## Roadmap

### Phase 3: Advanced Interactions (Planned)
- Multi-organ selection with Shift+Click
- System relationships visualization
- Advanced camera behaviors (auto-rotate, cinematic transitions)
- Context-aware help system

### Phase 4: Content Expansion (Planned)
- Replace placeholder geometry with real GLB models
- Add more organs (50+ target)
- Detailed organ information panels
- Anatomical labels and markers

### Phase 5: UI & UX Polish (Planned)
- Modern UI component library
- Responsive design for tablets
- Loading screens and transitions
- Accessibility improvements

**Note:** The monorepo structure (packages/) mentioned in early planning is NOT implemented.

---

## Development & Debugging

### Console Logging

Each manager prefixes its logs for easy filtering:

```
[InteractionManager] Keyboard pressed: f
[InteractionManager] Toggle focus mode
[SystemManager] Setting visibility for nervous: false
[SelectionManager] Organ selected: brain
```

### Debugging Commands

Open browser console and run:

```javascript
// Check current state
window.app?.interactionManager.state

// Inspect all organs
window.app?.systemManager.organs

// Check system visibility
window.app?.systemManager.systems

// Manually trigger system toggle
window.app?.interactionManager.toggleSystem('nervous')
```

### Performance Notes

- Scene traversal: O(n) where n = number of organs
- Raycasting: O(m) where m = visible objects only
- Animation: Uses requestAnimationFrame, ~60fps target
- Memory: No explicit cleanup needed for current scale

---

## Troubleshooting

### Organs not visible

**Check:**
1. Is the organ's system toggled on? (Press 1-6 or use checkboxes)
2. Are you in isolation mode? (Press I to cycle out)
3. Is the organ in the scene? (Check console logs during init)

**Debug:**
```javascript
// Check system state
console.log(window.app?.systemManager.systems)
```

### Selection not working

**Check:**
1. Is JavaScript enabled? (Check browser console for errors)
2. Is the organ visible? (Hidden organs can't be selected)
3. Is raycaster working? (Hover should show tooltip)

**Debug:**
```javascript
// Check selection state
console.log(window.app?.selectionManager.state)
```

### Camera not focusing

**Check:**
1. Is an organ selected? (Focus requires selection)
2. Is focus mode enabled? (Press F to toggle)
3. Is camera animation blocked? (Check for animation conflicts)

**Debug:**
```javascript
// Check interaction state
console.log(window.app?.interactionManager.state)
```

### System toggles not updating

**Check:**
1. Do checkbox IDs match system IDs? (Check index.html)
2. Are event listeners attached? (Check console for errors)
3. Is SystemManager initialized? (Check init logs)

---

## Project Structure

```
phase2-test/
├── index.html                  # UI structure, keyboard shortcuts
├── main.js                     # Entry point, initialization
├── README.md                   # This file
└── src/
    ├── managers/
    │   ├── InteractionManager.js   # Main coordinator
    │   ├── SystemManager.js        # Scene & visibility
    │   └── SelectionManager.js     # Selection & highlights
    ├── utils/
    │   ├── EnhancedRaycaster.js    # Visibility-aware raycasting
    │   └── AnimationUtils.js       # Camera animations
    └── data/
        ├── organsData.js           # 5 organ definitions
        ├── systemsData.js          # 6 body systems
        └── interactionState.js     # Shared state constants
```

### Architectural Decisions

**Why 3 managers?**
- **Separation of concerns:** Each manager has a single responsibility
- **Testability:** Managers can be tested in isolation
- **Maintainability:** Changes to visibility don't affect selection logic

**Why centralized state?**
- **Predictability:** Single source of truth prevents state drift
- **Debugging:** State inspection is straightforward
- **Mode management:** Interaction modes require global coordination

**Why placeholder geometry?**
- **Rapid prototyping:** Test interactions without waiting for assets
- **Performance:** Simple geometry loads instantly
- **Clarity:** Makes it obvious this is a proof-of-concept

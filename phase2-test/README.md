# Phase 2: Anatomy Interaction Layer (Debug Mode Enabled)

## Overview

Phase 2 introduces the Anatomy Interaction Layer, improving anatomical exploration and interaction logic. This phase focuses on functionality rather than visuals, implementing body systems, organ-to-system mapping, system toggling, isolation modes, and enhanced interaction feedback.

## Features

### Body Systems
- **7 Body Systems:** Skeletal, Muscular, Nervous, Circulatory, Digestive, Respiratory, Urinary
- **System Groups:** Each system has its own THREE.Group for organized scene structure
- **Organ Mapping:** All organs are mapped to their respective systems
- **Visibility Control:** Toggle systems on/off with checkboxes or keyboard shortcuts (1-7)

### Interaction Modes
1. **Normal Mode:** Default viewing mode with all visible systems shown
2. **Focus Mode:** Camera focused on selected organ with smooth transitions
3. **Isolate System Mode:** Only one system visible, all other systems hidden
4. **Isolate Organ Mode:** Only one organ visible, all other organs hidden

### Controls

#### Keyboard Shortcuts
- **F** - Toggle Focus Mode
- **D** - Reset to Default (camera and selection)
- **I** - Toggle Isolation Mode (cycles: none → system → organ → none)
- **1-7** - Quick Toggle Systems
- **Esc** - Cancel Selection

#### Mouse Controls
- **Left Click + Drag** - Rotate camera
- **Right Click + Drag** - Pan camera
- **Scroll** - Zoom in/out
- **Left Click on Organ** - Select organ (respects current mode)
- **Hover on Organ** - Show hover feedback with tooltip

### Visual Feedback
- **Hover:** Scale up (1.05x), emissive glow, tooltip with organ name
- **Selected:** Scale up (1.1x), emissive glow (intensity 0.4)
- **Isolated:** Scale up (1.05x), emissive glow (intensity 0.3)
- **Hidden:** Opacity 0.0

## Architecture

### 3-Manager Architecture

```
InteractionManager (Coordinator)
├── SystemManager (Scene & Visibility)
│   └── Manages: SystemGroups, OrganMeshes, Visibility, Opacity
└── SelectionManager (Selection & Highlight)
    └── Manages: Selection, Hover, Highlight Effects
```

### Manager Responsibilities

#### SystemManager
- Create and manage system groups in scene
- Map organs to systems
- Toggle system visibility and opacity
- Handle isolation modes (system/organ)
- Provide system and organ queries

#### SelectionManager
- Handle organ selection and deselection
- Manage hover state and feedback
- Apply highlight effects (selected/hovered/isolated)
- Handle selection in different interaction modes
- Restore original appearances

#### InteractionManager
- Coordinate all interactions between SystemManager and SelectionManager
- Handle user input (mouse clicks, hover, keyboard)
- Manage interaction state (mode, selection, isolation)
- Route events to appropriate managers
- Handle mode transitions (Normal/Focus/Isolation)

## Data Structures

### Organs Data
- Extended from Phase 1 with `systemId` and `groupId` fields
- 6 organs with placeholder geometry (sphere, cylinder, box)
- Each organ has position, color, scale, and system reference

### Body Systems Data
- 7 body systems with colors and organ associations
- Each system has visibility and opacity state
- System groups are created and managed at runtime

### Interaction State
- Centralized state management for all interactions
- Includes: selectedOrgan, hoveredOrgan, isFocusMode, isolationMode, visibleSystems

## Scene Structure

```
Scene
└── BodyGroup (THREE.Group)
    ├── SkeletalSystemGroup (THREE.Group)
    ├── MuscularSystemGroup (THREE.Group)
    ├── NervousSystemGroup (THREE.Group)
    ├── CirculatorySystemGroup (THREE.Group)
    ├── DigestiveSystemGroup (THREE.Group)
    ├── RespiratorySystemGroup (THREE.Group)
    └── UrinarySystemGroup (THREE.Group)
        └── OrganMeshes (THREE.Mesh)
```

## File Structure

```
phase2-test/
├── index.html              # Updated with system controls and mode indicator
├── main.js                 # Main entry point
├── README.md               # This file
└── src/
    ├── managers/
    │   ├── SystemManager.js
    │   ├── SelectionManager.js
    │   └── InteractionManager.js
    ├── utils/
    │   ├── EnhancedRaycaster.js
    │   └── AnimationUtils.js
    └── data/
        ├── organsData.js
        ├── systemsData.js
        └── interactionState.js
```

## Usage

### Running Phase 2

1. Open `phase2-test/index.html` in a web browser
2. The 3D scene will initialize with debug meshes for organs
3. Use the UI controls to:
   - Toggle body systems on/off
   - Select organs by clicking on them
   - Use keyboard shortcuts for quick access
   - Cycle through interaction modes

### Debug Mode

Debug mode is **enabled by default** with detailed console logging:
- Every manager logs initialization steps
- Event handling logs all user interactions
- State changes are logged with details
- Camera positions and targets are logged
- System and organ visibility is logged
- All logs are prefixed with manager name for easy debugging

### Testing Features

1. **System Toggling:**
   - Click checkboxes in the System Controls panel
   - Use keyboard shortcuts 1-7
   - Verify systems show/hide correctly
   - Check console logs for system visibility changes

2. **Organ Selection:**
   - Click on organs to select them
   - Verify highlighting works correctly
   - Check hover feedback
   - Check console logs for selection state

3. **Focus Mode:**
   - Press F to toggle focus mode
   - Verify camera focuses on selected organ
   - Press F again to exit focus mode
   - Check console logs for focus mode state

4. **Isolation Modes:**
   - Press I to cycle through isolation modes
   - Verify only selected system/organ is visible
   - Press I again to cycle to next mode
   - Check console logs for isolation mode state

5. **Reset:**
   - Press D to reset to default
   - Verify camera returns to default position
   - Verify selection is cleared
   - Check console logs for reset operations

## Constraints

- **Web only:** No backend, no mobile, no Micro/Nano
- **Three.js vanilla:** No React Three Fiber, pure vanilla implementation
- **Placeholder geometry:** Debug meshes (sphere, cylinder, box) for testing
- **No UI polish:** Functional controls only, no fancy animations or styling
- **Phase 1 preserved:** All Phase 1 behavior is maintained

## Technical Notes

### Raycasting
- Enhanced raycaster with visibility filtering
- Only intersects with visible objects
- Respects parent group visibility
- Checks material opacity

### Camera Controls
- Professional Blender-style controls
- Smooth orbit, fast zoom, intuitive pan
- Damping enabled for smooth movement
- Zoom limits adjusted for better organ visibility

### Animation
- Smooth camera transitions with easing functions
- Focus animations with cancelation support
- No automatic camera reset during interaction

### Performance
- Efficient scene traversals
- Minimal raycasting operations
- Optimized highlight management
- Proper cleanup of animations

## Migration from Phase 1

### What Changed
1. **Data Structure:**
   - ORGANS_DATA: Added systemId and groupId fields
   - Added BODY_SYSTEMS constant
   - Added INTERACTION_STATE object

2. **Scene Structure:**
   - Wrapped all organs in BodyGroup
   - Created system groups
   - Reorganized organ meshes into system groups

3. **Code Organization:**
   - Extracted SystemManager class (includes visibility logic)
   - Extracted SelectionManager class (includes highlight logic)
   - Extracted InteractionManager class (coordinates both)

4. **Interaction Logic:**
   - Added system toggling
   - Added isolation modes
   - Enhanced hover feedback
   - Improved raycasting

### What Stayed the Same
1. **Phase 1 Core Features:**
   - Three.js scene setup
   - OrbitControls configuration
   - Camera focus animation
   - Basic organ selection
   - Keyboard shortcuts (F, D)
   - UI panels (info, selected organ)

2. **Phase 1 Behavior:**
   - Camera controls (rotate, pan, zoom)
   - Focus mode toggle (F key)
   - Reset to default (D key)
   - Organ selection highlighting
   - Info panel display

## Next Steps

After Phase 2 completion:

1. **Phase 3:** Advanced interactions
   - Multi-organ selection
   - System relationships visualization
   - Advanced camera behaviors

2. **Phase 4:** Content expansion
   - More organs
   - More systems
   - Detailed organ information

3. **Phase 5:** UI polish
   - Better visual design
   - Animations
   - Responsive design

## Known Limitations

1. **Placeholder Geometry:** Debug meshes are temporary and will be replaced with real GLB models
2. **Limited Organs:** Only 6 organs are implemented in Phase 2
3. **No Backend:** All data is client-side only
4. **No Mobile:** Desktop web only

## Troubleshooting

### Common Issues

1. **Organs not visible:**
   - Check if system is toggled on
   - Check if organ is in isolation mode
   - Verify system group visibility

2. **Selection not working:**
   - Check console for errors
   - Verify raycaster is initialized
   - Check if organ is selectable

3. **Camera not focusing:**
   - Verify focus mode is on
   - Check if organ is selected
   - Verify camera animation is not blocked

4. **UI not updating:**
   - Check if DOM elements exist
   - Verify element IDs match
   - Check for JavaScript errors

## Credits

Phase 2 implementation based on approved technical plan in `plans/phase2-anatomy-interaction-layer.md`

Architecture: Simplified 3-manager design
- SystemManager: Scene & Visibility
- SelectionManager: Selection & Highlight
- InteractionManager: Coordination & User Input

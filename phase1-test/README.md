# Phase 1 Human Body 3D Engine - Test Environment

## Overview

This is a minimal test environment for the Phase 1 Human Body 3D Engine. It includes only the core 3D engine features:

- Three.js scene setup with renderer
- Camera controls (rotate, zoom, pan) using OrbitControls
- **Temporary debug meshes** for 6 organs (Heart, Lungs, Brain, Liver, Stomach, Kidneys)
- Raycasting for click detection
- Single organ selection
- Visual highlighting of selected organ
- Console logging for clicked organs
- Data schema for 6 organs

**Note:** This is a Phase 1 test environment. No UI polish, backend, mobile, or extra features are included.

**Important:** The debug meshes are temporary placeholders for testing. They will be replaced with real GLB models in production.

---

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (see setup options below)

**Note:** No GLB model is required for testing. The environment creates temporary debug meshes automatically.

---

## Setup Instructions

### Option 1: Using VS Code Live Server (Recommended)

1. **Install Live Server Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click "Install"

2. **Open the Project**
   - Open VS Code
   - File → Open Folder → Select the `phase1-test` folder

3. **Start Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The browser will open automatically at `http://127.0.0.1:5500`

### Option 2: Using Python Simple HTTP Server

1. **Open Terminal**
   - Navigate to the `phase1-test` folder:
     ```bash
     cd path/to/human-body/phase1-test
     ```

2. **Start Python Server**
   - Python 3:
     ```bash
     python -m http.server 8000
     ```
   - Python 2:
     ```bash
     python -m SimpleHTTPServer 8000
     ```

3. **Open Browser**
   - Navigate to: `http://localhost:8000`

### Option 3: Using Node.js HTTP Server

1. **Install http-server globally** (if not already installed):
   ```bash
   npm install -g http-server
   ```

2. **Navigate to the phase1-test folder**:
   ```bash
   cd path/to/human-body/phase1-test
   ```

3. **Start the server**:
   ```bash
   http-server -p 8000
   ```

4. **Open Browser**
   - Navigate to: `http://localhost:8000`

---

## Testing Instructions

### Step 1: Verify Debug Meshes Load

1. Open the test environment in your browser
2. Wait for the "Loading 3D model..." message to disappear
3. You should see **6 colored shapes** in the scene:
   - **Heart** (Red sphere) - Upper chest area
   - **Lungs** (Blue box) - Chest area
   - **Brain** (Orange sphere) - Head area
   - **Liver** (Purple box) - Right side of abdomen
   - **Stomach** (Green sphere) - Left side of abdomen
   - **Kidneys** (Pink box) - Lower back area

4. Open the browser console (F12 or right-click → Inspect → Console)
5. Look for initialization messages:
   ```
   ========================================
   Phase 1 Human Body 3D Engine
   ========================================
   Initializing...
   [Phase 1] Initializing Three.js scene...
   [Phase 1] Scene initialized successfully
   [Phase 1] Setting up lighting...
   [Phase 1] Lighting setup complete
   [Phase 1] Setting up camera controls...
   [Phase 1] Camera controls setup complete
   [Phase 1] Setting up raycasting...
   [Phase 1] Raycasting setup complete
   [Phase 1] Creating temporary debug meshes for organs...
   [Phase 1] Created debug mesh: Heart at (0.05, 0.3, 0.15)
   [Phase 1] Created debug mesh: Lungs at (0, 0.4, 0.1)
   [Phase 1] Created debug mesh: Brain at (0, 0.65, 0.05)
   [Phase 1] Created debug mesh: Liver at (-0.08, 0.25, 0.1)
   [Phase 1] Created debug mesh: Stomach at (0.06, 0.2, 0.08)
   [Phase 1] Created debug mesh: Kidneys at (0, 0.15, -0.05)
   [Phase 1] Debug meshes created successfully. Total organs: 6
   [Phase 1] Available organs: Heart, Lungs, Brain, Liver, Stomach, Kidneys
   [Phase 1] Initialization complete
   ========================================
   ```

### Step 2: Test Camera Controls

**Rotate the Camera:**
- Left-click and drag on the scene
- The camera should rotate around the debug meshes

**Zoom In/Out:**
- Use the mouse scroll wheel
- The camera should zoom in and out

**Pan the Camera:**
- Right-click and drag on the scene
- The camera should pan left, right, up, and down

### Step 3: Test Organ Selection

1. Click on different debug meshes (colored shapes) in the scene
2. You should see console logs for each selected organ:
   ```
   [Phase 1] Selected organ: Heart
   [Phase 1] System: Circulatory
   [Phase 1] Function: Pumps blood throughout the body
   [Phase 1] Position: (0.05, 0.3, 0.15)
   ```

3. The selected organ should be highlighted with a colored glow
4. An information panel should appear at the bottom-left showing:
   - Organ name
   - System
   - Function

### Step 4: Verify Only 6 Organs Are Selectable

1. Click on each of the 6 debug meshes
2. Only these 6 organs should be selectable:
   - **Heart** (Red highlight)
   - **Lungs** (Blue highlight)
   - **Brain** (Orange highlight)
   - **Liver** (Purple highlight)
   - **Stomach** (Green highlight)
   - **Kidneys** (Pink highlight)

3. Clicking on empty space outside the debug meshes should deselect the current organ

4. Verify console logs only show these 6 organs

### Step 5: Test Deselection

1. Select an organ (e.g., Heart)
2. Click on empty space outside the debug meshes
3. The organ should be deselected
4. The highlight should disappear
5. The information panel should disappear
6. Console should show:
   ```
   [Phase 1] Deselected organ: Heart
   ```

---

## Understanding the Debug Meshes

### What Are Debug Meshes?

Debug meshes are temporary 3D shapes created for testing purposes. They allow you to test the Phase 1 engine without requiring a real GLB model.

**Why Use Debug Meshes?**
- Test raycasting and click detection
- Verify organ selection and highlighting
- Test camera controls
- Validate console logging
- No need to find or purchase GLB models

**When Will They Be Replaced?**
- In production, these debug meshes will be replaced with real GLB models
- The mesh names must match the organ names exactly
- The positions will be adjusted to match the real anatomy

### Debug Mesh Details

| Organ | Shape | Color | Position |
|-------|-------|-------|----------|
| Heart | Sphere | Red | Upper chest (x: 0.05, y: 0.3, z: 0.15) |
| Lungs | Box | Blue | Chest (x: 0, y: 0.4, z: 0.1) |
| Brain | Sphere | Orange | Head (x: 0, y: 0.65, z: 0.05) |
| Liver | Box | Purple | Right abdomen (x: -0.08, y: 0.25, z: 0.1) |
| Stomach | Sphere | Green | Left abdomen (x: 0.06, y: 0.2, z: 0.08) |
| Kidneys | Box | Pink | Lower back (x: 0, y: 0.15, z: -0.05) |

---

## Troubleshooting

### Issue: "No debug meshes visible"

**Possible Causes:**
- Camera is positioned incorrectly
- Debug meshes are too small to see
- Lighting is too dark

**Solutions:**
1. Check the browser console for initialization messages
2. Try zooming in/out with the mouse scroll wheel
3. Rotate the camera to find the debug meshes
4. Verify the console shows "Debug meshes created successfully. Total organs: 6"

### Issue: "Organ not selectable"

**Possible Causes:**
- Raycasting is not detecting the mesh
- The mesh does not have the `userData.organId` property

**Solutions:**
1. Check the console for "Created debug mesh" messages
2. Try clicking directly on the colored shapes
3. Verify the mesh names match the organ names exactly
4. Check the console for JavaScript errors

### Issue: "Highlight not visible"

**Possible Causes:**
- The emissive intensity is too low
- The highlight color is too similar to the base color

**Solutions:**
1. Check that the selected organ changes color
2. Increase the `emissiveIntensity` in the `selectOrgan` function (line 295)
3. Try a different highlight color in the `ORGANS_DATA` array

### Issue: "Camera controls not working"

**Possible Causes:**
- OrbitControls is not loaded correctly
- The controls are disabled

**Solutions:**
1. Check the browser console for JavaScript errors
2. Verify that the importmap is correct in `index.html`
3. Try refreshing the page

### Issue: "Console shows no messages"

**Possible Causes:**
- JavaScript is disabled
- There's a syntax error in the code

**Solutions:**
1. Enable JavaScript in your browser
2. Check the browser console for error messages
3. Verify that `main.js` is loaded correctly

---

## File Structure

```
phase1-test/
├── index.html          # Main HTML file with Three.js and OrbitControls from CDN
├── main.js            # Phase 1 engine code with debug meshes
└── README.md          # This file with testing instructions
```

---

## Key Features Explained

### 1. Three.js Scene Setup

The scene is initialized with:
- WebGL renderer with antialiasing and shadow mapping
- Perspective camera with 45° field of view
- Ambient, directional, and fill lights for realistic lighting

### 2. Camera Controls

OrbitControls provides:
- **Rotate**: Left-click and drag
- **Zoom**: Mouse scroll wheel
- **Pan**: Right-click and drag
- **Damping**: Smooth movement with inertia
- **Limits**: Restricted zoom and rotation angles

### 3. Debug Mesh Creation

The `createDebugMeshes()` function creates temporary 3D shapes:
- Uses simple geometries (spheres and boxes)
- Assigns exact mesh names matching organ names
- Positions them visibly and non-overlapping
- Enables shadows on all meshes

### 4. Raycasting & Selection

Raycasting detects clicks on the debug meshes:
- Converts mouse coordinates to 3D ray
- Intersects with debug meshes
- Identifies organs by mesh names
- Selects only one organ at a time

### 5. Visual Highlighting

Selected organs are highlighted:
- Changes material color to organ-specific color
- Adds emissive glow effect
- Restores original color on deselection

### 6. Data Schema

The `ORGANS_DATA` array defines 6 organs:
- Each organ has: id, name, system, function, meshName, position, color, geometry, size
- Extensible structure for adding more organs
- Mesh names must match the debug mesh names exactly

### 7. Console Logging

All interactions are logged to console:
- Initialization steps
- Debug mesh creation
- Organ selection/deselection
- Error messages

---

## Customization

### Change Debug Mesh Positions

Edit the `position` property in `ORGANS_DATA` (line 23-78):
```javascript
position: { x: 0, y: 0.3, z: 0.15 }
```

### Change Debug Mesh Sizes

Edit the `size` property in `ORGANS_DATA`:
```javascript
size: 0.15 // Larger value = bigger mesh
```

### Change Debug Mesh Shapes

Edit the `geometry` property in `ORGANS_DATA`:
```javascript
geometry: 'sphere', // Use 'sphere' or 'box'
```

### Change Highlight Colors

Edit the `color` property in `ORGANS_DATA`:
```javascript
color: 0xff4444, // Red
color: 0x44aaff, // Blue
color: 0xffaa44, // Orange
// etc.
```

### Add More Organs

Add to `ORGANS_DATA` array (line 23-78):
```javascript
{
    id: 'new-organ',
    name: 'New Organ',
    system: 'System Name',
    function: 'Organ function',
    meshName: 'NewOrgan', // Must match mesh name exactly
    position: { x: 0, y: 0, z: 0 },
    color: 0x00ff00,
    originalColor: null,
    geometry: 'sphere',
    size: 0.15
}
```

### Adjust Camera Position

Edit `main.js` line 95:
```javascript
camera.position.set(0, 1, 3); // x, y, z
```

### Change Background Color

Edit `main.js` line 90:
```javascript
scene.background = new THREE.Color(0x1a1a2e); // Dark blue
```

---

## Replacing Debug Meshes with Real GLB Models

When you're ready to use real GLB models:

1. **Obtain GLB models** with properly named meshes
2. **Replace the `createDebugMeshes()` function** with `loadBodyModel()`:
   ```javascript
   function loadBodyModel() {
       const loader = new GLTFLoader();
       const modelPath = 'path/to/your/model.glb';
       
       loader.load(modelPath, (gltf) => {
           bodyModel = gltf.scene;
           bodyModel.scale.set(1, 1, 1);
           bodyModel.position.set(0, 0, 0);
           
           bodyModel.traverse((child) => {
               if (child.isMesh) {
                   child.castShadow = true;
                   child.receiveShadow = true;
                   child.userData.originalMaterial = child.material.clone();
                   checkOrganMesh(child);
               }
           });
           
           scene.add(bodyModel);
           console.log('[Phase 1] Model loaded successfully');
       });
   }
   ```

3. **Ensure mesh names match** the organ names in `ORGANS_DATA`
4. **Adjust organ positions** to match the real anatomy

---

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note:** Requires WebGL support. Check [caniuse.com](https://caniuse.com/webgl) for detailed compatibility.

---

## Next Steps (Phase 2)

Once Phase 1 is complete and tested, the next steps are:

1. **Replace debug meshes** with real GLB models
2. **Add Body System Layers**: Toggle visibility for 10 body systems
3. **Implement Search**: Search by organ name and system
4. **Create UI Components**: Header, sidebar, information panels
5. **Add Hover Effects**: Show organ name on hover
6. **Implement Dark/Light Mode**: Theme switching
7. **Optimize Performance**: LOD, lazy loading, compression

**Note:** These features are NOT included in Phase 1.

---

## Support

For issues or questions:
1. Check the browser console for error messages
2. Review the troubleshooting section above
3. Verify that all prerequisites are met
4. Ensure the debug meshes are visible in the scene

---

## License

This test environment is part of the Human Body Educational App project.

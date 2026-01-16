/**
 * Phase 1 Human Body 3D Engine
 * Core 3D engine with basic organ selection and highlighting
 * 
 * Features:
 * - Three.js scene setup with renderer
 * - Professional Blender-style camera controls (smooth orbit, fast zoom, intuitive pan)
 * - Temporary debug meshes for 6 organs with realistic shapes and positions
 * - Raycasting for click detection
 * - Single organ selection
 * - Visual highlighting of selected organ
 * - Console logging for clicked organs
 * - Data schema for 6 organs
 * - Improved lighting for better visibility
 * - Readable info popup with organ details
 * - Camera focus on selected organ with smooth animation (toggle with "F" key)
 * - Separate "D" key to reset camera to default position
 * - No automatic camera reset during interaction
 * - Smooth focus transitions with animation cancellation
 * - UI state synchronized with camera state
 * 
 * Note: The debug meshes are temporary placeholders for testing.
 * They will be replaced with real GLB models in production.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================================
// DATA SCHEMA - 6 Organs (Phase 1 Only)
// ============================================================================

/**
 * Organ data schema with 3D positions and metadata
 * This is extensible data structure for Phase 1
 * Positions and shapes are approximated to resemble real human anatomy
 */
const ORGANS_DATA = [
    {
        id: 'heart',
        name: 'Heart',
        system: 'Circulatory',
        function: 'Pumps blood throughout body',
        meshName: 'Heart', // Must match mesh name exactly
        position: { x: 0.05, y: 0.35, z: 0.12 }, // Upper chest, slightly left
        color: 0xff4444, // Highlight color (red)
        originalColor: null, // Will be set from material
        geometry: 'sphere', // Debug mesh geometry type
        size: 0.12, // Base size
        scale: { x: 1.2, y: 1.0, z: 1.0 } // Scale to make it slightly wider
    },
    {
        id: 'lungs',
        name: 'Lungs',
        system: 'Respiratory',
        function: 'Exchange oxygen and carbon dioxide',
        meshName: 'Lungs',
        position: { x: 0, y: 0.45, z: 0.08 }, // Chest area
        color: 0x44aaff, // Highlight color (blue)
        originalColor: null,
        geometry: 'cylinder', // Cylindrical shape for lungs
        size: 0.15,
        scale: { x: 1.5, y: 0.8, z: 1.0 } // Wider and shorter
    },
    {
        id: 'brain',
        name: 'Brain',
        system: 'Nervous',
        function: 'Controls body functions and thinking',
        meshName: 'Brain',
        position: { x: 0, y: 0.75, z: 0.05 }, // Head area
        color: 0xffaa44, // Highlight color (orange)
        originalColor: null,
        geometry: 'sphere',
        size: 0.14,
        scale: { x: 1.0, y: 0.85, z: 1.0 } // Slightly flattened
    },
    {
        id: 'liver',
        name: 'Liver',
        system: 'Digestive',
        function: 'Filters blood and produces bile',
        meshName: 'Liver',
        position: { x: -0.12, y: 0.28, z: 0.08 }, // Right side of abdomen
        color: 0xaa44ff, // Highlight color (purple)
        originalColor: null,
        geometry: 'box',
        size: 0.16,
        scale: { x: 1.0, y: 0.8, z: 1.2 } // Wider in depth
    },
    {
        id: 'stomach',
        name: 'Stomach',
        system: 'Digestive',
        function: 'Breaks down food with acids',
        meshName: 'Stomach',
        position: { x: 0.08, y: 0.22, z: 0.06 }, // Left side of abdomen
        color: 0x44ffaa, // Highlight color (green)
        originalColor: null,
        geometry: 'sphere',
        size: 0.11,
        scale: { x: 1.0, y: 1.3, z: 0.8 } // Elongated
    },
    {
        id: 'kidneys',
        name: 'Kidneys',
        system: 'Urinary',
        function: 'Filter blood and produce urine',
        meshName: 'Kidneys',
        position: { x: 0, y: 0.18, z: -0.08 }, // Lower back area
        color: 0xff44aa, // Highlight color (pink)
        originalColor: null,
        geometry: 'box',
        size: 0.10,
        scale: { x: 1.8, y: 0.6, z: 0.8 } // Wider horizontally
    }
];

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

let scene, camera, renderer, controls;
let bodyModel = null;
let raycaster, mouse;
let selectedOrgan = null;
let organMeshes = {}; // Map of organ ID to mesh
let cameraAnimation = null; // Camera animation state
let isFocusMode = false; // Focus mode toggle state

// Default camera settings
const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 0.8, 2.5);
const DEFAULT_TARGET = new THREE.Vector3(0, 0.4, 0);
const MIN_ZOOM_DISTANCE = 0.3; // Reduced for closer zoom
const MAX_ZOOM_DISTANCE = 15; // Increased for wider view

// ============================================================================
// SCENE SETUP
// ============================================================================

/**
 * Initialize Three.js scene
 */
function initScene() {
    console.log('[Phase 1] Initializing Three.js scene...');

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        50, // Field of view (slightly wider for better visibility)
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.copy(DEFAULT_CAMERA_POSITION);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add renderer to DOM
    const container = document.getElementById('canvas-container');
    container.appendChild(renderer.domElement);

    console.log('[Phase 1] Scene initialized successfully');
}

// ============================================================================
// LIGHTING
// ============================================================================

/**
 * Setup improved lighting for better visibility
 */
function setupLighting() {
    console.log('[Phase 1] Setting up improved lighting...');

    // Ambient light (soft fill light) - Increased intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Main directional light (sun-like) - Increased intensity
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    // Fill light from the opposite side - Increased intensity
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Rim light for edge definition - New
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    // Hemisphere light for natural sky/ground color - New
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    console.log('[Phase 1] Improved lighting setup complete');
}

// ============================================================================
// CAMERA CONTROLS (BLENDER-STYLE)
// ============================================================================

/**
 * Setup professional Blender-style camera controls
 * Features: smooth orbit, fast zoom, intuitive pan
 */
function setupCameraControls() {
    console.log('[Phase 1] Setting up professional camera controls...');

    // Create OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    
    // Enable damping for smooth movement
    controls.enableDamping = true;
    controls.dampingFactor = 0.05; // Reduced for even smoother feel
    
    // Control settings - Optimized for Blender-like experience
    controls.rotateSpeed = 0.6; // Slightly slower for precision
    controls.zoomSpeed = 12; // Fast zoom speed (fixed, as requested)
    controls.panSpeed = 0.6; // Moderate pan speed
    
    // Enable zoom
    controls.enableZoom = true;
    
    // Limit zoom distances - Adjusted to see top and bottom of organs
    controls.minDistance = MIN_ZOOM_DISTANCE;
    controls.maxDistance = MAX_ZOOM_DISTANCE;
    
    // Limit vertical rotation - Adjusted to see top and bottom
    controls.maxPolarAngle = Math.PI * 0.9; // Increased to see from below
    controls.minPolarAngle = 0.05; // Reduced to see from above
    
    // Enable smooth transitions
    controls.enablePan = true;
    controls.screenSpacePanning = false; // World space panning
    
    // Disable auto-rotate
    controls.autoRotate = false;
    
    // Set initial target
    controls.target.copy(DEFAULT_TARGET);
    
    // Update controls
    controls.update();

    console.log('[Phase 1] Professional camera controls setup complete');
}

// ============================================================================
// CAMERA FOCUS ANIMATION
// ============================================================================

/**
 * Focus camera on selected organ with smooth animation
 * This function animates camera to move closer to organ and center it in view
 * 
 * @param {Object} organ - The organ data object
 */
function focusOnOrgan(organ) {
    // Cancel any ongoing camera animation
    if (cameraAnimation) {
        cancelAnimationFrame(cameraAnimation);
        cameraAnimation = null;
    }

    // Calculate target camera position (in front of organ)
    const offset = 1.0; // Distance from organ
    const targetPosition = new THREE.Vector3(
        organ.position.x + offset,
        organ.position.y + 0.2, // Slightly above organ center
        organ.position.z + offset
    );

    // Calculate target look-at position (the organ itself)
    const targetLookAt = new THREE.Vector3(
        organ.position.x,
        organ.position.y,
        organ.position.z
    );

    // Store initial camera position and controls target
    const startPosition = camera.position.clone();
    const startLookAt = controls.target.clone();

    // Animation duration in milliseconds
    const duration = 1000; // 1 second for smooth transition
    const startTime = performance.now();

    // Animation function with ease-in-out
    function animateCamera(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-in-out cubic) for smoother transitions
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3);

        // Interpolate camera position
        camera.position.lerpVectors(startPosition, targetPosition, easeProgress);

        // Interpolate controls target
        controls.target.lerpVectors(startLookAt, targetLookAt, easeProgress);

        // Update controls
        controls.update();

        // Continue animation or finish
        if (progress < 1) {
            cameraAnimation = requestAnimationFrame(animateCamera);
        } else {
            cameraAnimation = null;
            console.log(`[Phase 1] Camera focused on: ${organ.name}`);
        }
    }

    // Start animation
    cameraAnimation = requestAnimationFrame(animateCamera);
}

/**
 * Reset camera to default position with smooth animation
 * This is a separate action triggered by "D" key only
 * Also resets selection and UI state to synchronize with camera state
 */
function resetToDefaultCamera() {
    // Cancel any ongoing camera animation
    if (cameraAnimation) {
        cancelAnimationFrame(cameraAnimation);
        cameraAnimation = null;
    }

    // Store initial camera position and controls target
    const startPosition = camera.position.clone();
    const startLookAt = controls.target.clone();

    // Animation duration in milliseconds
    const duration = 1000; // 1 second for smooth transition
    const startTime = performance.now();

    // Animation function with ease-in-out
    function animateCamera(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-in-out cubic) for smoother transitions
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3);

        // Interpolate camera position
        camera.position.lerpVectors(startPosition, DEFAULT_CAMERA_POSITION, easeProgress);

        // Interpolate controls target
        controls.target.lerpVectors(startLookAt, DEFAULT_TARGET, easeProgress);

        // Update controls
        controls.update();

        // Continue animation or finish
        if (progress < 1) {
            cameraAnimation = requestAnimationFrame(animateCamera);
        } else {
            cameraAnimation = null;
            console.log('[Phase 1] Camera reset to default position');
            
            // Reset focus mode state
            isFocusMode = false;
            updateFocusModeUI();
            
            // Clear selected organ state
            if (selectedOrgan) {
                // Restore original color
                const mesh = organMeshes[selectedOrgan.id];
                if (mesh) {
                    if (selectedOrgan.originalColor !== null) {
                        mesh.material.color.setHex(selectedOrgan.originalColor);
                    }
                    mesh.material.emissive = new THREE.Color(0x000000);
                    mesh.material.emissiveIntensity = 0;
                    
                    console.log(`[Phase 1] Deselected organ: ${selectedOrgan.name}`);
                }
                
                // Clear selected organ
                selectedOrgan = null;
            }
            
            // Hide UI
            hideSelectedOrganUI();
        }
    }

    // Start animation
    cameraAnimation = requestAnimationFrame(animateCamera);
}

// ============================================================================
// FOCUS MODE TOGGLE
// ============================================================================

/**
 * Toggle focus mode on/off
 * When ON: Camera moves to focus on selected organ
 * When OFF: Camera stays exactly where it is (no movement)
 * UI state remains synchronized with selection state
 */
function toggleFocusMode() {
    isFocusMode = !isFocusMode;
    
    if (isFocusMode) {
        console.log('[Phase 1] Focus mode: ON');
        // If an organ is selected, focus camera on it
        if (selectedOrgan) {
            focusOnOrgan(selectedOrgan);
        }
    } else {
        console.log('[Phase 1] Focus mode: OFF');
        // Camera stays exactly where it is - NO movement
        // Do NOT reset camera or clear selection
    }
    
    // Update UI to show focus mode state
    updateFocusModeUI();
}

/**
 * Update UI to show focus mode state
 */
function updateFocusModeUI() {
    const infoElement = document.getElementById('info');
    
    if (isFocusMode) {
        infoElement.style.border = '2px solid #ff4444';
        infoElement.style.background = 'rgba(255, 68, 68, 0.8)';
    } else {
        infoElement.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        infoElement.style.background = 'rgba(0, 0, 0, 0.8)';
    }
}

// ============================================================================
// DEBUG MESH CREATION (TEMPORARY)
// ============================================================================

/**
 * Create temporary debug meshes for 6 organs with realistic shapes and positions
 * These are simple geometric shapes for testing without a real GLB model
 * 
 * Note: These are TEMPORARY debug meshes for Phase 1 testing.
 * They will be replaced with real GLB models in production.
 */
function createDebugMeshes() {
    console.log('[Phase 1] Creating improved debug meshes for organs...');

    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    loadingElement.classList.add('hidden');

    // Create a group to hold all organ meshes
    bodyModel = new THREE.Group();
    bodyModel.name = 'HumanBody';

    // Create debug meshes for each organ
    ORGANS_DATA.forEach(organ => {
        // Create geometry based on organ type
        let geometry;
        if (organ.geometry === 'sphere') {
            geometry = new THREE.SphereGeometry(organ.size, 32, 32);
        } else if (organ.geometry === 'cylinder') {
            geometry = new THREE.CylinderGeometry(
                organ.size * 0.8, // Top radius
                organ.size, // Bottom radius
                organ.size * 1.5, // Height
                32 // Radial segments
            );
        } else {
            geometry = new THREE.BoxGeometry(
                organ.size * 2,
                organ.size * 2,
                organ.size * 2
            );
        }

        // Create material with improved appearance
        const material = new THREE.MeshStandardMaterial({
            color: 0xcccccc, // Light gray base color
            metalness: 0.2, // Reduced for more organic look
            roughness: 0.6, // Increased for more matte appearance
            flatShading: false, // Smooth shading
        });

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        
        // Set mesh name to match organ name exactly (for raycasting)
        mesh.name = organ.meshName;
        
        // Position mesh
        mesh.position.set(organ.position.x, organ.position.y, organ.position.z);
        
        // Apply scale for more realistic organ shapes
        mesh.scale.set(organ.scale.x, organ.scale.y, organ.scale.z);
        
        // Enable shadows
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Store original material for highlighting
        mesh.userData.originalMaterial = material.clone();
        mesh.userData.organId = organ.id;
        
        // Add to body model group
        bodyModel.add(mesh);
        
        // Store reference to mesh
        organMeshes[organ.id] = mesh;
        
        // Store original color from material
        organ.originalColor = material.color.getHex();
        
        console.log(`[Phase 1] Created debug mesh: ${organ.name} (${organ.geometry}) at (${organ.position.x}, ${organ.position.y}, ${organ.position.z})`);
    });

    // Add body model to scene
    scene.add(bodyModel);

    console.log(`[Phase 1] Improved debug meshes created successfully. Total organs: ${Object.keys(organMeshes).length}`);
    console.log('[Phase 1] Available organs:', ORGANS_DATA.map(o => o.name).join(', '));
}

// ============================================================================
// RAYCASTING & SELECTION
// ============================================================================

/**
 * Setup raycasting for click detection
 */
function setupRaycasting() {
    console.log('[Phase 1] Setting up raycasting...');

    // Create raycaster
    raycaster = new THREE.Raycaster();
    
    // Create mouse vector
    mouse = new THREE.Vector2();

    // Add click event listener
    renderer.domElement.addEventListener('click', onMouseClick, false);

    console.log('[Phase 1] Raycasting setup complete');
}

/**
 * Handle mouse clicks for organ selection
 * @param {MouseEvent} event - The mouse event
 */
function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with body model
    if (bodyModel) {
        const intersects = raycaster.intersectObjects(bodyModel.children, true);

        if (intersects.length > 0) {
            // Get the first intersected object
            const clickedMesh = intersects[0].object;

            // Check if this mesh belongs to an organ
            if (clickedMesh.userData.organId) {
                const organId = clickedMesh.userData.organId;
                selectOrgan(organId);
            } else {
                // Clicked on non-organ part of the body
                // Do NOT reset focus or move camera
                console.log('[Phase 1] Clicked on non-organ part');
            }
        } else {
            // Clicked outside of the model
            // Do NOT reset focus or move camera
            console.log('[Phase 1] Clicked outside model');
        }
    }
}

/**
 * Select an organ and highlight it
 * @param {string} organId - The ID of organ to select
 */
function selectOrgan(organId) {
    // Find organ data
    const organ = ORGANS_DATA.find(org => org.id === organId);
    
    if (!organ) {
        console.warn(`[Phase 1] Organ not found: ${organId}`);
        return;
    }

    // Deselect previous organ if any (without resetting camera)
    if (selectedOrgan && selectedOrgan.id !== organId) {
        deselectOrgan(false); // false = don't reset camera
    }

    // Get the organ mesh
    const mesh = organMeshes[organId];
    
    if (mesh) {
        // Highlight the selected organ
        mesh.material.color.setHex(organ.color);
        mesh.material.emissive = new THREE.Color(organ.color);
        mesh.material.emissiveIntensity = 0.4; // Increased for better visibility

        console.log(`[Phase 1] Selected organ: ${organ.name}`);
        console.log(`[Phase 1] System: ${organ.system}`);
        console.log(`[Phase 1] Function: ${organ.function}`);
        console.log(`[Phase 1] Position: (${organ.position.x}, ${organ.position.y}, ${organ.position.z})`);

        // Update UI
        updateSelectedOrganUI(organ);

        // Store selected organ
        selectedOrgan = organ;
        
        // Focus camera on selected organ ONLY if focus mode is ON
        if (isFocusMode) {
            focusOnOrgan(organ);
        }
    } else {
        console.warn(`[Phase 1] Mesh not found for organ: ${organ.name}`);
    }
}

/**
 * Deselect the currently selected organ
 * @param {boolean} resetCameraFlag - Whether to reset camera (default: false)
 */
function deselectOrgan(resetCameraFlag = false) {
    if (selectedOrgan) {
        const mesh = organMeshes[selectedOrgan.id];
        
        if (mesh) {
            // Restore original color
            if (selectedOrgan.originalColor !== null) {
                mesh.material.color.setHex(selectedOrgan.originalColor);
            }
            mesh.material.emissive = new THREE.Color(0x000000);
            mesh.material.emissiveIntensity = 0;

            console.log(`[Phase 1] Deselected organ: ${selectedOrgan.name}`);
        }

        // Hide UI
        hideSelectedOrganUI();

        // Reset camera to default position ONLY if focus mode is ON and flag is true
        // NOTE: This is only used when explicitly requested (e.g., deselecting all)
        if (isFocusMode && resetCameraFlag) {
            resetToDefaultCamera();
        }

        // Clear selected organ
        selectedOrgan = null;
    }
}

// ============================================================================
// UI UPDATES
// ============================================================================

/**
 * Update UI to show selected organ information
 * @param {Object} organ - The organ data object
 */
function updateSelectedOrganUI(organ) {
    const uiElement = document.getElementById('selected-organ');
    const nameElement = document.getElementById('organ-name');
    const systemElement = document.getElementById('organ-system');
    const functionElement = document.getElementById('organ-function');

    // Update UI elements
    nameElement.textContent = organ.name;
    systemElement.textContent = organ.system;
    functionElement.textContent = organ.function;

    // Show UI
    uiElement.style.display = 'block';
}

/**
 * Hide the selected organ UI
 */
function hideSelectedOrganUI() {
    const uiElement = document.getElementById('selected-organ');
    uiElement.style.display = 'none';
}

// ============================================================================
// WINDOW RESIZE HANDLING
// ============================================================================

/**
 * Handle window resize events
 */
function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add resize event listener
window.addEventListener('resize', onWindowResize, false);

// ============================================================================
// KEYBOARD EVENT HANDLING
// ============================================================================

/**
 * Setup keyboard event listeners
 */
function setupKeyboardControls() {
    console.log('[Phase 1] Setting up keyboard controls...');
    
    // Add keydown event listener for "F" and "D" keys
    window.addEventListener('keydown', (event) => {
        // Check if "F" key is pressed (toggle focus mode)
        if (event.key === 'f' || event.key === 'F') {
            toggleFocusMode();
        }
        
        // Check if "D" key is pressed (reset to default camera)
        if (event.key === 'd' || event.key === 'D') {
            resetToDefaultCamera();
        }
    });
    
    console.log('[Phase 1] Keyboard controls setup complete');
    console.log('[Phase 1] Press "F" to toggle focus mode');
    console.log('[Phase 1] Press "D" to reset camera to default position');
}

// ============================================================================
// ANIMATION LOOP
// ============================================================================

/**
 * Animation loop for rendering
 */
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the Phase 1 engine
 */
function init() {
    console.log('========================================');
    console.log('Phase 1 Human Body 3D Engine');
    console.log('========================================');
    console.log('Initializing...');

    // Initialize scene
    initScene();

    // Setup improved lighting
    setupLighting();

    // Setup professional camera controls
    setupCameraControls();

    // Setup raycasting
    setupRaycasting();

    // Setup keyboard controls
    setupKeyboardControls();

    // Create improved debug meshes for organs
    createDebugMeshes();

    // Start animation loop
    animate();

    console.log('[Phase 1] Initialization complete');
    console.log('[Phase 1] Press "F" to toggle focus mode');
    console.log('[Phase 1] Press "D" to reset camera to default position');
    console.log('========================================');
}

// Start the engine when the page loads
window.addEventListener('DOMContentLoaded', init);

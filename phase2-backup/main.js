/**
 * Phase 2 Human Body 3D Engine
 * Anatomy Interaction Layer
 * 
 * Features:
 * - Three.js scene setup with renderer
 * - Professional Blender-style camera controls (smooth orbit, fast zoom, intuitive pan)
 * - Body systems (skeletal, muscular, nervous, circulatory, digestive, respiratory, urinary)
 * - Organ-to-system mapping
 * - System visibility toggling (1-7 keys)
 * - Interaction modes: Normal, Focus, Isolate System, Isolate Organ
 * - Organ selection and highlighting
 * - Hover feedback with tooltip
 * - Camera focus on selected organ (toggle with "F" key)
 * - Separate "D" key to reset camera to default position
 * - "I" key to cycle through isolation modes
 * - Enhanced raycasting with visibility filtering
 * - Clean scene structure with BodyGroup and SystemGroups
 * 
 * Note: The debug meshes are temporary placeholders for testing.
 * They will be replaced with real GLB models in production.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { InteractionManager } from './src/managers/InteractionManager.js';
import { ORGANS_DATA } from './src/data/organsData.js';
import { BODY_SYSTEMS } from './src/data/systemsData.js';

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

let scene, camera, renderer, controls;
let interactionManager = null;

// Default camera settings (adjusted for new organ layout: y=0.3 to y=1.4)
const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 0.85, 3.0);
const DEFAULT_TARGET = new THREE.Vector3(0, 0.85, 0);
const MIN_ZOOM_DISTANCE = 0.3;
const MAX_ZOOM_DISTANCE = 15;

// ============================================================================
// SCENE SETUP
// ============================================================================

/**
 * Initialize Three.js scene
 */
function initScene() {
    console.log('[Phase 2] Initializing Three.js scene...');

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        50, // Field of view
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

    console.log('[Phase 2] Scene initialized successfully');
}

// ============================================================================
// LIGHTING
// ============================================================================

/**
 * Setup improved lighting for better visibility
 */
function setupLighting() {
    console.log('[Phase 2] Setting up improved lighting...');

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

    console.log('[Phase 2] Improved lighting setup complete');
}

// ============================================================================
// CAMERA CONTROLS (BLENDER-STYLE)
// ============================================================================

/**
 * Setup professional Blender-style camera controls
 * Features: smooth orbit, fast zoom, intuitive pan
 */
function setupCameraControls() {
    console.log('[Phase 2] Setting up professional camera controls...');

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

    console.log('[Phase 2] Professional camera controls setup complete');
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
 * Initialize the Phase 2 engine
 */
function init() {
    console.log('========================================');
    console.log('Phase 2 Human Body 3D Engine');
    console.log('Anatomy Interaction Layer');
    console.log('========================================');
    console.log('Initializing...');

    // Initialize scene
    initScene();

    // Setup improved lighting
    setupLighting();

    // Setup professional camera controls
    setupCameraControls();

    // Initialize interaction manager (this will initialize SystemManager and SelectionManager)
    interactionManager = new InteractionManager(scene, camera, controls, renderer, ORGANS_DATA, BODY_SYSTEMS);
    interactionManager.initialize();
    
    // Hide loading popup
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.classList.add('hidden');
    }
    
    // Start animation loop
    animate();
    
    console.log('[Phase 2] Initialization complete');
    console.log('[Phase 2] Available systems:', BODY_SYSTEMS.map(s => s.name).join(', '));
    console.log('[Phase 2] Available organs:', ORGANS_DATA.map(o => o.name).join(', '));
    console.log('[Phase 2] Keyboard controls:');
    console.log('  Press "F" to toggle focus mode');
    console.log('  Press "D" to reset camera to default position');
    console.log('  Press "I" to toggle isolation mode');
    console.log('  Press "1-7" to quick toggle systems');
    console.log('  Press "Esc" to cancel selection');
    console.log('========================================');
}

// Start the engine when the page loads
window.addEventListener('DOMContentLoaded', init);

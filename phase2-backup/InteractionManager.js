/**
 * Interaction Manager - Phase 2
 * Coordinates all interactions between SystemManager and SelectionManager
 * Handles user input and manages interaction state
 */

import * as THREE from 'three';
import { EnhancedRaycaster } from '../utils/EnhancedRaycaster.js';
import { animateVector3, lerpVector3 } from '../utils/AnimationUtils.js';
import { INTERACTION_STATE, updateInteractionState, resetInteractionState } from '../data/interactionState.js';
import { BODY_SYSTEMS } from '../data/systemsData.js';

export class InteractionManager {
  constructor(scene, camera, controls, renderer, organsData, systemsData) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.organsData = organsData;
    this.systemsData = systemsData;
    
    // Default camera settings (adjusted for new organ layout: y=0.3 to y=1.4)
    this.DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 0.85, 3.0);
    this.DEFAULT_TARGET = new THREE.Vector3(0, 0.85, 0);
    
    // Initialize managers (will be set in initialize())
    this.systemManager = null;
    this.selectionManager = null;
    
    // Initialize raycaster
    this.raycaster = new EnhancedRaycaster(scene, camera);
    
    // Camera animation state
    this.cameraAnimation = null;
  }

  /**
   * Initialize all managers and event listeners
   */
  initialize() {
    console.log('[InteractionManager] Initializing...');
    
    // Import managers dynamically to avoid circular dependencies
    import('./SystemManager.js').then(({ SystemManager }) => {
      this.systemManager = new SystemManager(this.scene, this.organsData, this.systemsData);
      this.systemManager.initializeSystemGroups();
      
      // Create debug meshes for organs
      this.createDebugMeshes();
      
      // Then initialize SelectionManager
      import('./SelectionManager.js').then(({ SelectionManager }) => {
        this.selectionManager = new SelectionManager(this.systemManager, INTERACTION_STATE);
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('[InteractionManager] Initialization complete');
      });
    });
  }

  /**
   * Create debug meshes for organs (placeholder geometry)
   */
  createDebugMeshes() {
    console.log('[InteractionManager] Creating debug meshes for organs...');
    
    this.organsData.forEach(organ => {
      // Create geometry based on organ type
      let geometry;
      if (organ.geometry === 'sphere') {
        geometry = new THREE.SphereGeometry(organ.size, 32, 32);
      } else if (organ.geometry === 'cylinder') {
        geometry = new THREE.CylinderGeometry(
          organ.size * 0.8,
          organ.size,
          organ.size * 1.5,
          32
        );
      } else {
        geometry = new THREE.BoxGeometry(
          organ.size * 2,
          organ.size * 2,
          organ.size * 2
        );
      }

      // Create material with matte, anatomical appearance
      const material = new THREE.MeshStandardMaterial({
        color: organ.color,
        metalness: 0.0,
        roughness: 0.85,
        flatShading: false,
      });

      // Create mesh
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = organ.meshName;
      mesh.position.set(organ.position.x, organ.position.y, organ.position.z);
      mesh.scale.set(organ.scale.x, organ.scale.y, organ.scale.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Store organ ID in userData
      mesh.userData.organId = organ.id;
      
      // Add to system group
      this.systemManager.addOrganToSystem(mesh, organ.systemId);
      
      // Store mesh reference
      this.systemManager.storeOrganMesh(organ.id, mesh);
      
      // Store original color
      organ.originalColor = material.color.getHex();
      
      console.log(`[InteractionManager] Created debug mesh: ${organ.name} (${organ.geometry})`);
    });
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Validate renderer
    if (!this.renderer) {
      console.warn('[InteractionManager] Renderer not initialized in setupEventListeners');
      return;
    }

    // Click event
    this.renderer.domElement.addEventListener('click', (e) => this.handleClick(e));

    // Hover events
    this.renderer.domElement.addEventListener('mousemove', (e) => this.handleHover(e));

    // Keyboard events
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // System toggle checkboxes
    const systemIds = ['skeletal', 'muscular', 'nervous', 'circulatory', 'digestive', 'respiratory'];
    systemIds.forEach(systemId => {
      const checkbox = document.getElementById(`${systemId}-toggle`);
      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          const isVisible = e.target.checked;
          this.systemManager.toggleSystemVisibility(systemId, isVisible);
          console.log(`[InteractionManager] System ${systemId} toggled via checkbox: ${isVisible}`);
        });
      }
    });

    console.log('[InteractionManager] Event listeners setup complete');
  }

  /**
   * Handle click event
   * @param {Event} event - Mouse event
   */
  handleClick(event) {
    // Validate raycaster and selection manager
    if (!this.raycaster || !this.selectionManager) {
      console.warn('[InteractionManager] Raycaster or selection manager not initialized in handleClick');
      return;
    }

    const intersects = this.raycaster.getIntersectedOrgans(event, true);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;
      const organId = clickedMesh.userData.organId;

      if (organId) {
        // Select organ (this will deselect previous organ if different)
        this.selectionManager.selectOrgan(organId);

        // Focus camera if focus mode is on
        if (INTERACTION_STATE.isFocusMode) {
          const organData = this.organsData.find(o => o.id === organId);
          if (organData) {
            this.focusOnOrgan(organData);
          }
        }

        // Update UI
        this.updateSelectedOrganUI(organId);
      }
    } else {
      // Clicked outside of organs
      console.log('[InteractionManager] Clicked outside of organs');
    }
  }

  /**
   * Handle hover event
   * @param {Event} event - Mouse event
   */
  handleHover(event) {
    // Validate raycaster, selection manager, and renderer
    if (!this.raycaster || !this.selectionManager || !this.renderer) {
      console.warn('[InteractionManager] Raycaster, selection manager, or renderer not initialized in handleHover');
      return;
    }

    const intersects = this.raycaster.getIntersectedOrgans(event, true);

    if (intersects.length > 0) {
      const hoveredMesh = intersects[0].object;
      const organId = hoveredMesh.userData.organId;

      if (organId) {
        this.selectionManager.setHoveredOrgan(organId);

        // Change cursor
        this.renderer.domElement.style.cursor = 'pointer';

        // Update tooltip (optional)
        this.updateTooltip(event, organId);
      }
    } else {
      // No organ hovered
      this.selectionManager.clearHover();
      this.renderer.domElement.style.cursor = 'default';
      this.hideTooltip();
    }
  }

  /**
   * Handle keyboard events
   * @param {Event} event - Keyboard event
   */
  handleKeyboard(event) {
    // F key - Toggle focus mode
    if (event.key === 'f' || event.key === 'F') {
      this.toggleFocusMode();
    }

    // D key - Reset to default
    if (event.key === 'd' || event.key === 'D') {
      this.resetToDefault();
    }

    // I key - Toggle isolation mode
    if (event.key === 'i' || event.key === 'I') {
      this.toggleIsolationMode();
    }

    // A key - Toggle all systems ON/OFF
    if ((event.key === 'a' || event.key === 'A') && !event.shiftKey) {
      this.toggleAllSystems();
    }

    // 1-6 keys - Quick toggle system
    const keyNum = parseInt(event.key);
    if (keyNum >= 1 && keyNum <= 6) {
      const systemIds = ['skeletal', 'muscular', 'nervous', 'circulatory', 'digestive', 'respiratory'];
      const systemId = systemIds[keyNum - 1];
      if (systemId) {
        this.toggleSystemQuick(systemId);
      }
    }

    // Esc key - Cancel (fully reset interaction state) - REMOVED: No longer used
    // Note: D key now handles full reset
  }

  /**
   * Toggle focus mode (F key)
   */
  toggleFocusMode() {
    INTERACTION_STATE.isFocusMode = !INTERACTION_STATE.isFocusMode;
    console.log(`[InteractionManager] Focus mode: ${INTERACTION_STATE.isFocusMode ? 'ON' : 'OFF'}`);

    // If focus mode is on and organ is selected, focus camera
    if (INTERACTION_STATE.isFocusMode && INTERACTION_STATE.selectedOrgan) {
      this.focusOnOrgan(INTERACTION_STATE.selectedOrgan);
    }

    // Update UI
    this.updateModeIndicator();
  }

  /**
   * Toggle isolation mode cycle (I key): none -> system -> organ -> none
   */
  toggleIsolationMode() {
    // Validate system manager
    if (!this.systemManager) {
      console.warn('[InteractionManager] System manager not initialized in toggleIsolationMode');
      return;
    }

    const modes = ['none', 'system', 'organ'];
    const currentIndex = modes.indexOf(INTERACTION_STATE.isolationMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const nextMode = modes[nextIndex];

    INTERACTION_STATE.isolationMode = nextMode;
    console.log(`[InteractionManager] Isolation mode: ${nextMode}`);

    // Handle mode transitions
    if (nextMode === 'none') {
      // Show all systems
      this.systemManager.showAll();
      INTERACTION_STATE.isolatedSystemId = null;
      INTERACTION_STATE.isolatedOrganId = null;
    } else if (nextMode === 'system' && INTERACTION_STATE.selectedOrgan) {
      // Isolate system of selected organ
      const organData = this.organsData.find(o => o.id === INTERACTION_STATE.selectedOrgan.id);
      if (organData) {
        this.systemManager.isolateSystem(organData.systemId);
        INTERACTION_STATE.isolatedSystemId = organData.systemId;
        INTERACTION_STATE.isolatedOrganId = null;
      }
    } else if (nextMode === 'organ' && INTERACTION_STATE.selectedOrgan) {
      // Isolate selected organ
      this.systemManager.isolateOrgan(INTERACTION_STATE.selectedOrgan.id);
      INTERACTION_STATE.isolatedSystemId = null;
      INTERACTION_STATE.isolatedOrganId = INTERACTION_STATE.selectedOrgan.id;
    }

    // Update UI
    this.updateModeIndicator();
    this.updateAllSystemToggleUIs();
  }

  /**
   * Reset to default (D key)
   */
  resetToDefault() {
    console.log('[InteractionManager] Resetting to default...');

    // Validate camera and controls
    if (!this.camera || !this.controls) {
      console.warn('[InteractionManager] Camera or controls not initialized in resetToDefault');
      return;
    }

    // Validate system manager and selection manager
    if (!this.systemManager || !this.selectionManager) {
      console.warn('[InteractionManager] System manager or selection manager not initialized in resetToDefault');
      return;
    }

    // Cancel any ongoing camera animation
    if (this.cameraAnimation) {
      this.cameraAnimation();
      this.cameraAnimation = null;
    }

    // Reset camera to default position
    const startPosition = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const duration = 1000; // 1 second

    this.cameraAnimation = animateVector3(startPosition, this.DEFAULT_CAMERA_POSITION, duration, (currentPos) => {
      this.camera.position.copy(currentPos);

      // Interpolate target
      const progress = (performance.now() - (performance.now() - duration)) / duration;
      const currentTarget = lerpVector3(startTarget, this.DEFAULT_TARGET, Math.min(progress, 1));
      this.controls.target.copy(currentTarget);
      this.controls.update();
    });

    // Reset interaction state
    this.selectionManager.deselectOrgan();
    INTERACTION_STATE.isFocusMode = false;
    INTERACTION_STATE.isolationMode = 'none';
    INTERACTION_STATE.isolatedSystemId = null;
    INTERACTION_STATE.isolatedOrganId = null;

    // Show all systems
    this.systemManager.showAll();

    // Update UI
    this.hideSelectedOrganUI();
    this.updateModeIndicator();
    this.updateAllSystemToggleUIs();

    console.log('[InteractionManager] Reset complete');
  }

  /**
   * Quick toggle system (1-7 keys)
   * @param {string} systemId - System ID
   */
  toggleSystemQuick(systemId) {
    // Validate system manager
    if (!this.systemManager) {
      console.warn('[InteractionManager] System manager not initialized in toggleSystemQuick');
      return;
    }

    const isVisible = this.systemManager.isSystemVisible(systemId);
    const newVisibility = !isVisible;
    this.systemManager.toggleSystemVisibility(systemId, newVisibility);

    // Note: SystemManager.toggleSystemVisibility() now updates INTERACTION_STATE.visibleSystems
    // So we don't need to update it here

    console.log(`[InteractionManager] Toggled system ${systemId}: ${newVisibility}`);

    // Update UI from SystemManager state
    this.updateSystemToggleUIFromState(systemId);
  }

  /**
   * Enable all systems (A key)
   */
  enableAllSystems() {
    // Validate system manager
    if (!this.systemManager) {
      console.warn('[InteractionManager] System manager not initialized in enableAllSystems');
      return;
    }

    // Exit isolation mode
    if (INTERACTION_STATE.isolationMode !== 'none') {
      INTERACTION_STATE.isolationMode = 'none';
      INTERACTION_STATE.isolatedSystemId = null;
      INTERACTION_STATE.isolatedOrganId = null;
      this.systemManager.showAll();
      console.log('[InteractionManager] Isolation mode exited by enable all systems');
    }

    // Clear any organ selection
    if (this.selectionManager && INTERACTION_STATE.selectedOrgan) {
      this.selectionManager.deselectOrgan();
    }

    // Enable all systems
    this.systemManager.enableAllSystems();

    // Update UI
    this.updateModeIndicator();
    this.updateAllSystemToggleUIs();

    console.log('[InteractionManager] Enabled all systems');
  }

  /**
   * Toggle all systems ON/OFF (A key)
   */
  toggleAllSystems() {
    // Validate system manager
    if (!this.systemManager) {
      console.warn('[InteractionManager] System manager not initialized in toggleAllSystems');
      return;
    }

    // Check current state: if all systems are visible, disable them; otherwise, enable them
    const allVisible = INTERACTION_STATE.visibleSystems.size === this.systemsData.length;
    
    if (allVisible) {
      // All systems are visible - disable all
      this.systemManager.disableAllSystems();
      console.log('[InteractionManager] Toggled all systems: OFF');
    } else {
      // Some systems are hidden - enable all
      this.systemManager.enableAllSystems();
      console.log('[InteractionManager] Toggled all systems: ON');
    }

    // Update UI
    this.updateAllSystemToggleUIs();
  }

  /**
   * Focus camera on selected organ
   * @param {Object} organ - Organ data object
   */
  focusOnOrgan(organ) {
    // Validate organ parameter
    if (!organ || !organ.position) {
      console.warn('[InteractionManager] Invalid organ object in focusOnOrgan');
      return;
    }

    // Validate camera and controls
    if (!this.camera || !this.controls) {
      console.warn('[InteractionManager] Camera or controls not initialized in focusOnOrgan');
      return;
    }

    // Cancel any ongoing camera animation
    if (this.cameraAnimation) {
      this.cameraAnimation();
      this.cameraAnimation = null;
    }

    // Calculate target camera position (in front of organ)
    const offset = 1.0;
    const targetPosition = new THREE.Vector3(
      organ.position.x + offset,
      organ.position.y + 0.2,
      organ.position.z + offset
    );

    // Calculate target look-at position (the organ itself)
    const targetLookAt = new THREE.Vector3(
      organ.position.x,
      organ.position.y,
      organ.position.z
    );

    // Store initial camera position and controls target
    const startPosition = this.camera.position.clone();
    const startTarget = this.controls.target.clone();

    // Animation duration in milliseconds
    const duration = 1000;
    const startTime = performance.now();

    // Animation function
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-in-out cubic)
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Interpolate camera position
      this.camera.position.lerpVectors(startPosition, targetPosition, easeProgress);

      // Interpolate controls target
      this.controls.target.lerpVectors(startTarget, targetLookAt, easeProgress);

      // Update controls
      this.controls.update();

      // Continue animation or finish
      if (progress < 1) {
        this.cameraAnimation = requestAnimationFrame(animate);
      } else {
        this.cameraAnimation = null;
        console.log(`[InteractionManager] Camera focused on: ${organ.name}`);
      }
    };

    // Start animation
    this.cameraAnimation = requestAnimationFrame(animate);
  }

  /**
   * Get current interaction mode
   * @returns {string} Current mode
   */
  getInteractionMode() {
    if (INTERACTION_STATE.isFocusMode) {
      return 'focus';
    }
    if (INTERACTION_STATE.isolationMode !== 'none') {
      return `isolate-${INTERACTION_STATE.isolationMode}`;
    }
    return 'normal';
  }

  /**
   * Get current interaction state
   * @returns {Object} Current state
   */
  getState() {
    return { ...INTERACTION_STATE };
  }

  /**
   * Update interaction state
   * @param {Object} newState - New state updates
   */
  updateState(newState) {
    updateInteractionState(newState);
  }

  /**
   * Handle window resize
   */
  onWindowResize() {
    // Validate camera and renderer
    if (!this.camera || !this.renderer) {
      console.warn('[InteractionManager] Camera or renderer not initialized in onWindowResize');
      return;
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Update system toggle UI from SystemManager state
   * @param {string} systemId - System ID
   * @param {boolean} visible - Visibility state
   */
  updateSystemToggleUIFromState(systemId) {
    const isVisible = this.systemManager.isSystemVisible(systemId);
    const checkbox = document.getElementById(`${systemId}-toggle`);
    if (checkbox) {
      checkbox.checked = isVisible;
    }
  }

  /**
   * Update system toggle UI for all systems
   */
  updateAllSystemToggleUIs() {
    const systemIds = ['skeletal', 'muscular', 'nervous', 'circulatory', 'digestive', 'respiratory'];
    systemIds.forEach(systemId => {
      const isVisible = this.systemManager.isSystemVisible(systemId);
      this.updateSystemToggleUIFromState(systemId, isVisible);
    });
  }

  /**
   * Reset to neutral state (ESC key) - REMOVED: No longer used
   * Note: D key now handles full reset
   */
  resetToNeutralState() {
    console.log('[InteractionManager] Resetting to neutral state...');

    // Validate system manager and selection manager
    if (!this.systemManager || !this.selectionManager) {
      console.warn('[InteractionManager] System manager or selection manager not initialized in resetToNeutralState');
      return;
    }

    // Deselect any selected organ (this restores original color and scale)
    if (this.selectionManager.getSelectedOrgan()) {
      this.selectionManager.deselectOrgan();
    }

    // Remove ALL organ highlights and active materials
    this.selectionManager.restoreAllOriginals();

    // Close organ popup
    this.hideSelectedOrganUI();

    // Exit focus mode
    if (INTERACTION_STATE.isFocusMode) {
      INTERACTION_STATE.isFocusMode = false;
      console.log('[InteractionManager] Focus mode turned off by ESC');
    }

    // Exit isolation mode
    if (INTERACTION_STATE.isolationMode !== 'none') {
      INTERACTION_STATE.isolationMode = 'none';
      INTERACTION_STATE.isolatedSystemId = null;
      INTERACTION_STATE.isolatedOrganId = null;
      this.systemManager.showAll();
      console.log('[InteractionManager] Isolation mode exited by ESC');
    }

    // Restore visibility of all systems (unless isolation was active)
    // Note: showAll() already handles this, so we don't need to call it again

    // Reset internal flags (selectedOrgan, activeSystem, focusMode, isolationMode)
    // Note: selectedOrgan is already null from deselectOrgan() above
    // Note: focusMode and isolationMode are already reset above

    // Update UI
    this.updateModeIndicator();
    this.updateAllSystemToggleUIs();

    console.log('[InteractionManager] Reset to neutral state complete');
  }

  /**
   * Update selected organ UI
   * @param {string} organId - Organ ID
   */
  updateSelectedOrganUI(organId) {
    const organData = this.organsData.find(o => o.id === organId);
    if (!organData) return;

    const uiElement = document.getElementById('selected-organ');
    if (uiElement) {
      uiElement.style.display = 'block';
      document.getElementById('organ-name').textContent = organData.name;
      document.getElementById('organ-system').textContent = organData.system;
      document.getElementById('organ-function').textContent = organData.function;
    }
  }

  /**
   * Hide selected organ UI
   */
  hideSelectedOrganUI() {
    const uiElement = document.getElementById('selected-organ');
    if (uiElement) {
      uiElement.style.display = 'none';
    }
  }

  /**
   * Update mode indicator UI
   */
  updateModeIndicator() {
    const modeElement = document.getElementById('current-mode');
    if (modeElement) {
      const mode = this.getInteractionMode();
      modeElement.textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`;
    }
  }

  /**
   * Update system toggle UI
   * @param {string} systemId - System ID
   * @param {boolean} visible - Visibility state
   */
  updateSystemToggleUI(systemId, visible) {
    const checkbox = document.getElementById(`${systemId}-toggle`);
    if (checkbox) {
      checkbox.checked = visible;
    }
  }

  /**
   * Update tooltip
   * @param {Event} event - Mouse event
   * @param {string} organId - Organ ID
   */
  updateTooltip(event, organId) {
    const organData = this.organsData.find(o => o.id === organId);
    if (!organData) return;

    // Create or update tooltip
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'tooltip';
      tooltip.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        pointer-events: none;
        z-index: 1000;
        display: none;
      `;
      document.body.appendChild(tooltip);
    }

    tooltip.textContent = `${organData.name} (${organData.system})`;
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.clientX + 15}px`;
    tooltip.style.top = `${event.clientY + 15}px`;
  }

  /**
   * Hide tooltip
   */
  hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }
}

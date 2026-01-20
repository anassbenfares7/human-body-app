/**
 * System Manager - Phase 2
 * Manages system groups, visibility, opacity, and isolation
 */

import * as THREE from 'three';
import { BODY_SYSTEMS, SYSTEM_COLORS } from '../data/systemsData.js';
import { ORGANS_DATA } from '../data/organsData.js';
import { INTERACTION_STATE, updateInteractionState } from '../data/interactionState.js';

export class SystemManager {
  constructor(scene, organsData, systemsData) {
    this.scene = scene;
    this.organsData = organsData;
    this.systemsData = systemsData;

    // Store system groups
    this.systemGroups = {};

    // Store organ meshes
    this.organMeshes = {};

    // Store organ-to-system mapping
    this.organToSystemMap = organsData.reduce((acc, organ) => {
      acc[organ.id] = organ.systemId;
      return acc;
    }, {});

    // Store interaction state reference for UI updates
    this.interactionState = INTERACTION_STATE;
  }

  /**
   * Initialize all system groups
   */
  initializeSystemGroups() {
    console.log('[SystemManager] Initializing system groups...');

    // Create body group as main container
    this.bodyGroup = new THREE.Group();
    this.bodyGroup.name = 'HumanBody';
    this.scene.add(this.bodyGroup);

    // Create system groups
    this.systemsData.forEach(system => {
      this.createSystemGroup(system);
    });

    console.log('[SystemManager] System groups initialized');
  }

  /**
   * Create a system group
   * @param {Object} systemData - System data object
   */
  createSystemGroup(systemData) {
    const group = new THREE.Group();
    group.name = `${systemData.id}SystemGroup`;
    group.visible = systemData.visible;

    // Store group reference
    this.systemGroups[systemData.id] = group;
    systemData.group = group;

    this.bodyGroup.add(group);
    console.log(`[SystemManager] Created system group: ${systemData.name}`);
  }

  /**
   * Add organ mesh to system group
   * @param {THREE.Mesh} organMesh - Organ mesh
   * @param {string} systemId - System ID
   */
  addOrganToSystem(organMesh, systemId) {
    const group = this.systemGroups[systemId];
    if (group) {
      group.add(organMesh);
      console.log(`[SystemManager] Added organ to system: ${systemId}`);
    }
  }

  /**
   * Toggle system visibility
   * @param {string} systemId - System ID
   * @param {boolean} visible - Visibility state
   */
  toggleSystemVisibility(systemId, visible) {
    const group = this.systemGroups[systemId];
    if (group) {
      group.visible = visible;
      console.log(`[SystemManager] Toggled system ${systemId}: ${visible}`);
    }

    // Update interaction state
    this.interactionState.visibleSystems[visible ? 'add' : 'delete'](systemId);
  }

  /**
   * Set system opacity
   * @param {string} systemId - System ID
   * @param {number} opacity - Opacity value (0 to 1)
   */
  setSystemOpacity(systemId, opacity) {
    const group = this.systemGroups[systemId];
    if (group) {
      group.traverse((object) => {
        if (object.isMesh && object.material) {
          object.material.opacity = opacity;
          object.material.transparent = opacity < 1.0;
        }
      });
      console.log(`[SystemManager] Set system ${systemId} opacity: ${opacity}`);
    }
  }

  /**
   * Isolate: show only one system, hide others
   * @param {string} systemId - System ID to isolate
   */
  isolateSystem(systemId) {
    // Hide all systems
    Object.keys(this.systemGroups).forEach(id => {
      this.systemGroups[id].visible = (id === systemId);
    });

    // Update interaction state - only isolated system is visible
    this.interactionState.visibleSystems.clear();
    this.interactionState.visibleSystems.add(systemId);

    console.log(`[SystemManager] Isolated system: ${systemId}`);
  }

  /**
   * Isolate: show only one organ, hide others
   * @param {string} organId - Organ ID to isolate
   */
  isolateOrgan(organId) {
    // Hide all systems first
    Object.keys(this.systemGroups).forEach(id => {
      this.systemGroups[id].visible = false;
    });

    // Show only system containing isolated organ
    const systemId = this.organToSystemMap[organId];
    if (systemId) {
      this.systemGroups[systemId].visible = true;

      // Hide all organs in system except isolated one
      this.systemGroups[systemId].traverse((object) => {
        if (object.isMesh) {
          object.visible = (object.userData.organId === organId);
        }
      });

      // Update interaction state - only system containing isolated organ is visible
      this.interactionState.visibleSystems.clear();
      this.interactionState.visibleSystems.add(systemId);
    }
    console.log(`[SystemManager] Isolated organ: ${organId}`);
  }

  /**
   * Show all systems and organs
   */
  showAll() {
    Object.keys(this.systemGroups).forEach(id => {
      this.systemGroups[id].visible = true;

      // Show all organs in system
      this.systemGroups[id].traverse((object) => {
        if (object.isMesh) {
          object.visible = true;
        }
      });
    });

    // Update interaction state - all systems are visible
    this.interactionState.visibleSystems.clear();
    Object.keys(this.systemGroups).forEach(id => {
      this.interactionState.visibleSystems.add(id);
    });

    console.log('[SystemManager] Showed all systems and organs');
  }

  /**
   * Enable all systems
   */
  enableAllSystems() {
    Object.keys(this.systemGroups).forEach(id => {
      this.systemGroups[id].visible = true;

      // Show all organs in system
      this.systemGroups[id].traverse((object) => {
        if (object.isMesh) {
          object.visible = true;
        }
      });
    });

    // Update interaction state - all systems are visible
    this.interactionState.visibleSystems.clear();
    Object.keys(this.systemGroups).forEach(id => {
      this.interactionState.visibleSystems.add(id);
    });

    console.log('[SystemManager] Enabled all systems');
  }

  /**
   * Disable all systems
   */
  disableAllSystems() {
    Object.keys(this.systemGroups).forEach(id => {
      this.systemGroups[id].visible = false;
    });

    // Update interaction state - no systems are visible
    this.interactionState.visibleSystems.clear();

    console.log('[SystemManager] Disabled all systems');
  }

  /**
   * Get system group by ID
   * @param {string} systemId - System ID
   * @returns {THREE.Group|null} System group or null
   */
  getSystemGroup(systemId) {
    return this.systemGroups[systemId] || null;
  }

  /**
   * Get organ mesh by ID
   * @param {string} organId - Organ ID
   * @returns {THREE.Mesh|null} Organ mesh or null
   */
  getOrganMesh(organId) {
    return this.organMeshes[organId] || null;
  }

  /**
   * Get all organ meshes in a system
   * @param {string} systemId - System ID
   * @returns {Array} Array of organ meshes
   */
  getSystemOrgans(systemId) {
    const organs = [];
    const group = this.systemGroups[systemId];
    if (group) {
      group.traverse((object) => {
        if (object.isMesh && object.userData.organId) {
          organs.push(object);
        }
      });
    }
    return organs;
  }

  /**
   * Check if system is visible
   * @param {string} systemId - System ID
   * @returns {boolean} True if visible
   */
  isSystemVisible(systemId) {
    const group = this.systemGroups[systemId];
    return group ? group.visible : false;
  }

  /**
   * Check if organ is visible
   * @param {string} organId - Organ ID
   * @returns {boolean} True if visible
   */
  isOrganVisible(organId) {
    const mesh = this.getOrganMesh(organId);
    if (!mesh) return false;

    // Check mesh visibility
    if (!mesh.visible) return false;

    // Check parent group visibility
    let parent = mesh.parent;
    while (parent) {
      if (!parent.visible) return false;
      parent = parent.parent;
    }

    return true;
  }

  /**
   * Store organ mesh reference
   * @param {string} organId - Organ ID
   * @param {THREE.Mesh} mesh - Organ mesh
   */
  storeOrganMesh(organId, mesh) {
    this.organMeshes[organId] = mesh;
  }

  /**
   * Get system color
   * @param {string} systemId - System ID
   * @returns {string} Hex color code
   */
  getSystemColor(systemId) {
    return SYSTEM_COLORS[systemId] || '#ffffff';
  }
}

/**
 * Selection Manager - Phase 2
 * Handles organ selection, hover, and highlight effects
 */

import * as THREE from 'three';
import { INTERACTION_STATE } from '../data/interactionState.js';

export class SelectionManager {
  constructor(systemManager, interactionState) {
    this.systemManager = systemManager;
    this.interactionState = interactionState;
    
    // Store highlight states
    this.highlightedOrgans = new Set();
    
    // Store original materials
    this.originalMaterials = new Map();
  }

  /**
   * Select an organ
   * @param {string} organId - Organ ID
   */
  selectOrgan(organId) {
    // Check if organ is selectable
    if (!this.isOrganSelectable(organId)) {
      console.log(`[SelectionManager] Organ ${organId} is not selectable`);
      return;
    }

    // Deselect previous organ if any (ensure only one organ is highlighted at a time)
    if (this.interactionState.selectedOrgan) {
      const previousOrganId = this.interactionState.selectedOrgan.id;
      // Only deselect if it's a different organ
      if (previousOrganId !== organId) {
        this.deselectOrgan();
      }
    }

    // Get organ mesh
    const mesh = this.systemManager.getOrganMesh(organId);
    if (!mesh) {
      console.warn(`[SelectionManager] Mesh not found for organ: ${organId}`);
      return;
    }

    // Get organ data
    const organData = this.systemManager.organsData.find(o => o.id === organId);
    if (!organData) {
      console.warn(`[SelectionManager] Data not found for organ: ${organId}`);
      return;
    }

    // Store original material if not already stored
    if (!this.originalMaterials.has(organId)) {
      this.originalMaterials.set(organId, mesh.material.clone());
    }

    // Apply highlight (this updates color, scale, and emissive immediately)
    this.highlightOrgan(organId, 'selected');

    // Update interaction state
    this.interactionState.selectedOrgan = organData;

    console.log(`[SelectionManager] Selected organ: ${organData.name}`);

    // Handle selection in isolation mode
    this.handleSelectionInIsolation(organId);
  }

  /**
   * Deselect current organ
   */
  deselectOrgan() {
    if (!this.interactionState.selectedOrgan) {
      console.log('[SelectionManager] No organ to deselect');
      return;
    }

    const organId = this.interactionState.selectedOrgan.id;

    // Remove highlight (this restores original color, scale, and material properties)
    this.removeHighlight(organId);

    // Update interaction state
    this.interactionState.selectedOrgan = null;

    console.log(`[SelectionManager] Deselected organ: ${organId}`);
  }

  /**
   * Update hover state
   * @param {string} organId - Organ ID or null
   */
  setHoveredOrgan(organId) {
    // Clear previous hover
    if (this.interactionState.hoveredOrgan && 
        this.interactionState.hoveredOrgan.id !== organId) {
      this.clearHover();
    }

    if (!organId) return;

    // Check if organ is selectable
    if (!this.isOrganSelectable(organId)) {
      console.log(`[SelectionManager] Organ ${organId} is not selectable for hover`);
      return;
    }

    // Get organ data
    const organData = this.systemManager.organsData.find(o => o.id === organId);
    if (!organData) {
      console.warn(`[SelectionManager] Data not found for organ: ${organId}`);
      return;
    }

    // Apply hover highlight
    this.highlightOrgan(organId, 'hovered');

    // Update interaction state
    this.interactionState.hoveredOrgan = organData;

    console.log(`[SelectionManager] Hovered organ: ${organData.name}`);
  }

  /**
   * Clear hover state
   */
  clearHover() {
    if (this.interactionState.hoveredOrgan) {
      const organId = this.interactionState.hoveredOrgan.id;

      // Don't remove highlight if organ is selected
      if (this.interactionState.selectedOrgan && 
          this.interactionState.selectedOrgan.id === organId) {
        // Keep selected highlight
        this.highlightOrgan(organId, 'selected');
      } else {
        this.removeHighlight(organId);
      }

      this.interactionState.hoveredOrgan = null;
    }
  }

  /**
   * Apply highlight to organ
   * @param {string} organId - Organ ID
   * @param {string} type - Highlight type: 'selected' | 'hovered' | 'isolated'
   */
  highlightOrgan(organId, type) {
    const mesh = this.systemManager.getOrganMesh(organId);
    if (!mesh) return;

    const organData = this.systemManager.organsData.find(o => o.id === organId);
    if (!organData) return;

    // Get system color
    const systemColor = this.systemManager.getSystemColor(organData.systemId);
    const color = new THREE.Color(systemColor);

    // Apply highlight based on type (updates color, scale, and emissive immediately)
    switch (type) {
      case 'selected':
        mesh.material.color.setHex(organData.color);
        mesh.material.emissive = new THREE.Color(organData.color);
        mesh.material.emissiveIntensity = 0.4;
        mesh.scale.set(
          organData.scale.x * 1.1,
          organData.scale.y * 1.1,
          organData.scale.z * 1.1
        );
        break;
      case 'hovered':
        mesh.material.color.setHex(organData.color);
        mesh.material.emissive = new THREE.Color(organData.color);
        mesh.material.emissiveIntensity = 0.2;
        mesh.scale.set(
          organData.scale.x * 1.05,
          organData.scale.y * 1.05,
          organData.scale.z * 1.05
        );
        break;
      case 'isolated':
        mesh.material.color.setHex(organData.color);
        mesh.material.emissive = new THREE.Color(organData.color);
        mesh.material.emissiveIntensity = 0.3;
        mesh.scale.set(
          organData.scale.x * 1.05,
          organData.scale.y * 1.05,
          organData.scale.z * 1.05
        );
        break;
    }

    this.highlightedOrgans.add(organId);
  }

  /**
   * Remove highlight from organ
   * @param {string} organId - Organ ID
   */
  removeHighlight(organId) {
    const mesh = this.systemManager.getOrganMesh(organId);
    if (!mesh) return;

    const organData = this.systemManager.organsData.find(o => o.id === organId);
    if (!organData) return;

    // Restore original material properties (instead of replacing entire material)
    const originalMaterial = this.originalMaterials.get(organId);
    if (originalMaterial) {
      mesh.material.color.copy(originalMaterial.color);
      mesh.material.emissive.copy(originalMaterial.emissive);
      mesh.material.emissiveIntensity = originalMaterial.emissiveIntensity;
      mesh.material.metalness = originalMaterial.metalness;
      mesh.material.roughness = originalMaterial.roughness;
    } else {
      // Fallback: restore to default grey color (0xcccccc)
      mesh.material.color.setHex(0xcccccc);
      mesh.material.emissive = new THREE.Color(0x000000);
      mesh.material.emissiveIntensity = 0;
    }

    // Restore original scale
    mesh.scale.set(
      organData.scale.x,
      organData.scale.y,
      organData.scale.z
    );

    this.highlightedOrgans.delete(organId);
  }

  /**
   * Restore organ's original appearance
   * @param {string} organId - Organ ID
   */
  restoreOriginal(organId) {
    this.removeHighlight(organId);
  }

  /**
   * Restore all organs to original appearance
   */
  restoreAllOriginals() {
    this.highlightedOrgans.forEach(organId => {
      this.restoreOriginal(organId);
    });
    this.highlightedOrgans.clear();
  }

  /**
   * Get selected organ
   * @returns {Object|null} Selected organ or null
   */
  getSelectedOrgan() {
    return this.interactionState.selectedOrgan;
  }

  /**
   * Get hovered organ
   * @returns {Object|null} Hovered organ or null
   */
  getHoveredOrgan() {
    return this.interactionState.hoveredOrgan;
  }

  /**
   * Check if organ is selectable (respects visibility and isolation)
   * @param {string} organId - Organ ID
   * @returns {boolean} True if selectable
   */
  isOrganSelectable(organId) {
    // Check if organ is visible
    if (!this.systemManager.isOrganVisible(organId)) {
      return false;
    }

    // Check isolation mode
    if (this.interactionState.isolationMode === 'system') {
      // Only organs in isolated system are selectable
      const organData = this.systemManager.organsData.find(o => o.id === organId);
      if (!organData) return false;
      return organData.systemId === this.interactionState.isolatedSystemId;
    }

    if (this.interactionState.isolationMode === 'organ') {
      // Only isolated organ is selectable
      return organId === this.interactionState.isolatedOrganId;
    }

    return true;
  }

  /**
   * Handle selection in isolation mode
   * @param {string} organId - Selected organ ID
   */
  handleSelectionInIsolation(organId) {
    const isolationMode = this.interactionState.isolationMode;

    if (isolationMode === 'none') {
      // Normal selection - no special handling
      return;
    }

    if (isolationMode === 'system') {
      // Update isolated system
      const organData = this.systemManager.organsData.find(o => o.id === organId);
      if (organData) {
        this.interactionState.isolatedSystemId = organData.systemId;
      }
      return;
    }

    if (isolationMode === 'organ') {
      // Update isolated organ
      this.interactionState.isolatedOrganId = organId;
      return;
    }
  }
}

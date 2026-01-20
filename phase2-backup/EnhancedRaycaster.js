/**
 * Enhanced Raycaster - Phase 2
 * Raycasting with visibility filtering and improved detection
 */

import * as THREE from 'three';

export class EnhancedRaycaster {
  constructor(scene, camera) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.scene = scene;
    this.camera = camera;
  }

  /**
   * Get intersected organs (respects visibility)
   * @param {Event} event - Mouse event
   * @param {boolean} visibleOnly - Filter by visibility (default: true)
   * @returns {Array} Array of intersection objects
   */
  getIntersectedOrgans(event, visibleOnly = true) {
    this.updateMousePosition(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Get all organ meshes from scene
    const organMeshes = this.getOrganMeshes();
    
    // Check intersections
    const intersects = this.raycaster.intersectObjects(organMeshes, true);
    
    // Filter by visibility if needed
    if (visibleOnly) {
      return intersects.filter(intersect => 
        this.isMeshVisible(intersect.object)
      );
    }
    
    return intersects;
  }

  /**
   * Check if mesh is visible
   * @param {THREE.Mesh} mesh - Mesh to check
   * @returns {boolean} True if visible
   */
  isMeshVisible(mesh) {
    // Check mesh visibility
    if (!mesh.visible) return false;
    
    // Check parent group visibility
    let parent = mesh.parent;
    while (parent) {
      if (!parent.visible) return false;
      parent = parent.parent;
    }
    
    // Check opacity
    if (mesh.material && mesh.material.opacity === 0) return false;
    
    return true;
  }

  /**
   * Update mouse position from event
   * @param {Event} event - Mouse event
   */
  updateMousePosition(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  /**
   * Get all organ meshes from scene
   * @returns {Array} Array of organ meshes
   */
  getOrganMeshes() {
    const meshes = [];
    this.scene.traverse((object) => {
      if (object.isMesh && object.userData.organId) {
        meshes.push(object);
      }
    });
    return meshes;
  }

  /**
   * Get first intersected organ (if any)
   * @param {Event} event - Mouse event
   * @param {boolean} visibleOnly - Filter by visibility (default: true)
   * @returns {THREE.Mesh|null} First intersected organ or null
   */
  getFirstIntersectedOrgan(event, visibleOnly = true) {
    const intersects = this.getIntersectedOrgans(event, visibleOnly);
    return intersects.length > 0 ? intersects[0].object : null;
  }
}

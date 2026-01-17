/**
 * Interaction State - Phase 2
 * Centralized state management for all interactions
 */

export const INTERACTION_STATE = {
  // Selection
  selectedOrgan: null, // Organ object or null
  
  // Hover
  hoveredOrgan: null, // Organ object or null
  
  // Focus mode
  isFocusMode: false,
  
  // Isolation mode
  isolationMode: 'none', // 'none', 'system', 'organ'
  isolatedSystemId: null, // System ID or null
  isolatedOrganId: null, // Organ ID or null
  
  // System visibility
  visibleSystems: new Set(['skeletal', 'nervous', 'circulatory', 'digestive', 'respiratory', 'urinary']),
  
  // Camera state
  cameraPosition: null,
  cameraTarget: null,
  
  // Animation state
  isAnimating: false
};

// Helper functions to update state
export const updateInteractionState = (updates) => {
  Object.assign(INTERACTION_STATE, updates);
};

export const resetInteractionState = () => {
  INTERACTION_STATE.selectedOrgan = null;
  INTERACTION_STATE.hoveredOrgan = null;
  INTERACTION_STATE.isFocusMode = false;
  INTERACTION_STATE.isolationMode = 'none';
  INTERACTION_STATE.isolatedSystemId = null;
  INTERACTION_STATE.isolatedOrganId = null;
  INTERACTION_STATE.visibleSystems = new Set(['skeletal', 'nervous', 'circulatory', 'digestive', 'respiratory', 'urinary']);
  INTERACTION_STATE.cameraPosition = null;
  INTERACTION_STATE.cameraTarget = null;
  INTERACTION_STATE.isAnimating = false;
};

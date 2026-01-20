/**
 * Body Store
 * Zustand store for body interaction state
 */

import { create } from 'zustand';
import { ORGANS } from '../data/organs';
import { SYSTEMS, SYSTEM_COLORS } from '../data/systems';

// Interaction modes
export type IsolationMode = 'none' | 'system' | 'organ';

interface InteractionState {
  selectedOrgan: ORGANS[number] | null;
  hoveredOrgan: ORGANS[number] | null;
  isFocusMode: boolean;
  isResetting: boolean;
  isolationMode: IsolationMode;
  isolatedSystemId: string | null;
  isolatedOrganId: string | null;
  visibleSystems: Set<string>;
}

interface HighlightedOrgans {
  [organId: string]: {
    type: 'selected' | 'hovered' | 'isolated';
    systemColor: string;
    organColor: number;
  };
}

interface BodyState extends InteractionState {
  // Organ and system data
  organs: typeof ORGANS;
  systems: typeof SYSTEMS;
  systemColors: typeof SYSTEM_COLORS;

  // Original materials map
  originalMaterials: Map<string, any>;

  // Highlighted organs state
  highlightedOrgans: HighlightedOrgans;

  // Actions
  selectOrgan: (organId: string) => void;
  deselectOrgan: () => void;
  setHoveredOrgan: (organId: string | null) => void;
  clearHover: () => void;

  // Focus mode
  toggleFocusMode: () => void;
  focusOnOrgan: (organId: string) => void;
  resetCamera: () => void;

  // Isolation mode
  toggleIsolationMode: () => void;
  isolateSystem: (systemId: string) => void;
  isolateOrgan: (organId: string) => void;
  showAll: () => void;

  // System visibility
  toggleSystemVisibility: (systemId: string, visible: boolean) => void;
  isSystemVisible: (systemId: string) => boolean;
  isOrganVisible: (organId: string) => boolean;

  // Quick toggle (1-6 keys)
  toggleSystemQuick: (systemId: string) => void;
  toggleAllSystems: () => void;
  enableAllSystems: () => void;
  disableAllSystems: () => void;

  // Reset
  resetToDefault: () => void;

  // Highlighting
  highlightOrgan: (organId: string, type: 'selected' | 'hovered' | 'isolated') => void;
  removeHighlight: (organId: string) => void;
  restoreAllOriginals: () => void;

  // Material storage
  storeOriginalMaterial: (organId: string, material: any) => void;
  getOriginalMaterial: (organId: string) => any;
}

// Helper: Get organ by ID
const getOrganById = (id: string) => ORGANS.find(o => o.id === id);

// Helper: Get system color
const getSystemColor = (systemId: string) => SYSTEM_COLORS[systemId] || '#ffffff';

export const useBodyStore = create<BodyState>((set, get) => ({
  // Initial data
  organs: ORGANS,
  systems: SYSTEMS,
  systemColors: SYSTEM_COLORS,

  // Initial state
  selectedOrgan: null,
  hoveredOrgan: null,
  isFocusMode: false,
  isResetting: false,
  isolationMode: 'none',
  isolatedSystemId: null,
  isolatedOrganId: null,
  visibleSystems: new Set(['skeletal', 'nervous', 'circulatory', 'digestive', 'respiratory']),
  originalMaterials: new Map(),
  highlightedOrgans: {},

  // Select organ
  selectOrgan: (organId: string) => {
    const organ = getOrganById(organId);
    if (!organ) return;

    const { selectedOrgan, isolationMode, originalMaterials, isFocusMode } = get();

    // Deselect previous organ if different
    if (selectedOrgan && selectedOrgan.id !== organId) {
      get().removeHighlight(selectedOrgan.id);
    }

    // Store original material if not already stored
    if (!originalMaterials.has(organId)) {
      // Will be stored by the component
    }

    // Apply selected highlight
    get().highlightOrgan(organId, 'selected');

    // Update state
    set({ selectedOrgan: organ });

    // If focus mode is active, move camera to organ
    if (isFocusMode) {
      get().focusOnOrgan(organId);
    }

    // Handle isolation mode
    if (isolationMode === 'system') {
      set({ isolatedSystemId: organ.systemId });
    } else if (isolationMode === 'organ') {
      set({ isolatedOrganId: organId });
    }
  },

  // Deselect organ
  deselectOrgan: () => {
    const { selectedOrgan } = get();
    if (selectedOrgan) {
      get().removeHighlight(selectedOrgan.id);
    }
    set({ selectedOrgan: null });
  },

  // Set hovered organ
  setHoveredOrgan: (organId: string | null) => {
    const { hoveredOrgan, selectedOrgan } = get();

    // Clear previous hover
    if (hoveredOrgan && hoveredOrgan.id !== organId) {
      get().clearHover();
    }

    if (!organId) return;

    const organ = getOrganById(organId);
    if (!organ) return;

    // Don't apply hover if organ is selected (keep selected highlight)
    if (selectedOrgan && selectedOrgan.id === organId) {
      set({ hoveredOrgan: organ });
      return;
    }

    get().highlightOrgan(organId, 'hovered');
    set({ hoveredOrgan: organ });
  },

  // Clear hover
  clearHover: () => {
    const { hoveredOrgan, selectedOrgan } = get();
    if (!hoveredOrgan) return;

    const organId = hoveredOrgan.id;

    // Don't remove highlight if organ is selected
    if (selectedOrgan && selectedOrgan.id === organId) {
      get().highlightOrgan(organId, 'selected');
    } else {
      get().removeHighlight(organId);
    }

    set({ hoveredOrgan: null });
  },

  // Toggle focus mode (triggered by F key)
  toggleFocusMode: () => {
    const { isFocusMode } = get();
    const newFocusMode = !isFocusMode;
    set({ isFocusMode: newFocusMode, isResetting: false });
  },

  // Focus on organ (camera target)
  // Camera positioning is now handled by CameraFocus component
  // which has access to the actual THREE.js mesh for bounding box calculation
  // This function is kept for compatibility but no longer sets cameraTarget
  focusOnOrgan: (organId: string) => {
    const organ = getOrganById(organId);
    if (!organ) return;
    // Camera positioning is now handled by CameraFocus component
  },

  // Reset camera to default (triggered by D key)
  resetCamera: () => {
    // Deselect organ to close popup
    get().deselectOrgan();
    // Set resetting flag to trigger smooth reset animation
    set({ isResetting: true, isFocusMode: false });
  },

  // Toggle isolation mode (none -> system -> organ -> none)
  toggleIsolationMode: () => {
    const { isolationMode, selectedOrgan, visibleSystems } = get();
    const modes: IsolationMode[] = ['none', 'system', 'organ'];
    const currentIndex = modes.indexOf(isolationMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];

    if (nextMode === 'none') {
      get().showAll();
      set({ isolationMode: 'none', isolatedSystemId: null, isolatedOrganId: null });
    } else if (nextMode === 'system' && selectedOrgan) {
      get().isolateSystem(selectedOrgan.systemId);
      set({ isolationMode: 'system' });
    } else if (nextMode === 'organ' && selectedOrgan) {
      get().isolateOrgan(selectedOrgan.id);
      set({ isolationMode: 'organ' });
    } else {
      set({ isolationMode: nextMode });
    }
  },

  // Isolate system
  isolateSystem: (systemId: string) => {
    set({
      visibleSystems: new Set([systemId]),
      isolatedSystemId: systemId,
      isolatedOrganId: null,
      isolationMode: 'system'
    });
  },

  // Isolate organ
  isolateOrgan: (organId: string) => {
    const organ = getOrganById(organId);
    if (!organ) return;

    set({
      visibleSystems: new Set([organ.systemId]),
      isolatedSystemId: null,
      isolatedOrganId: organId,
      isolationMode: 'organ'
    });
  },

  // Show all systems
  showAll: () => {
    set({
      visibleSystems: new Set(SYSTEMS.map(s => s.id)),
      isolatedSystemId: null,
      isolatedOrganId: null,
      isolationMode: 'none'
    });
  },

  // Toggle system visibility
  toggleSystemVisibility: (systemId: string, visible: boolean) => {
    set((state) => {
      const newVisibleSystems = new Set(state.visibleSystems);
      if (visible) {
        newVisibleSystems.add(systemId);
      } else {
        newVisibleSystems.delete(systemId);
      }
      return { visibleSystems: newVisibleSystems };
    });
  },

  // Check if system is visible
  isSystemVisible: (systemId: string) => {
    return get().visibleSystems.has(systemId);
  },

  // Check if organ is visible
  isOrganVisible: (organId: string) => {
    const { visibleSystems, isolationMode, isolatedOrganId } = get();
    const organ = getOrganById(organId);
    if (!organ) return false;

    // Check if system is visible
    if (!visibleSystems.has(organ.systemId)) return false;

    // In organ isolation mode, only isolated organ is visible
    if (isolationMode === 'organ' && isolatedOrganId !== organId) {
      return false;
    }

    return true;
  },

  // Quick toggle system (1-6 keys)
  toggleSystemQuick: (systemId: string) => {
    const isVisible = get().isSystemVisible(systemId);
    get().toggleSystemVisibility(systemId, !isVisible);
  },

  // Toggle all systems
  toggleAllSystems: () => {
    const { visibleSystems } = get();
    const allVisible = visibleSystems.size === SYSTEMS.length;

    if (allVisible) {
      get().disableAllSystems();
    } else {
      get().enableAllSystems();
    }
  },

  // Enable all systems
  enableAllSystems: () => {
    // Exit isolation mode first
    const { isolationMode } = get();
    if (isolationMode !== 'none') {
      get().showAll();
    }
    set({ visibleSystems: new Set(SYSTEMS.map(s => s.id)) });
  },

  // Disable all systems
  disableAllSystems: () => {
    set({ visibleSystems: new Set() });
  },

  // Highlight organ
  highlightOrgan: (organId: string, type: 'selected' | 'hovered' | 'isolated') => {
    // This will be used by the component to apply visual changes
    // Store highlight type for the component to read
    const organ = getOrganById(organId);
    if (!organ) return;

    const systemColor = getSystemColor(organ.systemId);

    // Store highlight state
    set((state) => ({
      highlightedOrgans: {
        ...state.highlightedOrgans,
        [organId]: { type, systemColor, organColor: organ.color }
      }
    } as any));
  },

  // Remove highlight
  removeHighlight: (organId: string) => {
    set((state: any) => {
      const highlighted = { ...state.highlightedOrgans };
      delete highlighted[organId];
      return { highlightedOrgans: highlighted };
    });
  },

  // Restore all originals
  restoreAllOriginals: () => {
    set({ highlightedOrgans: {} as any });
  },

  // Store original material
  storeOriginalMaterial: (organId: string, material: any) => {
    set((state) => {
      const newMaterials = new Map(state.originalMaterials);
      newMaterials.set(organId, material);
      return { originalMaterials: newMaterials };
    });
  },

  // Get original material
  getOriginalMaterial: (organId: string) => {
    return get().originalMaterials.get(organId);
  },

  // Reset to default
  resetToDefault: () => {
    get().deselectOrgan();
    get().restoreAllOriginals();
    set({
      isFocusMode: false,
      isResetting: false,
      isolationMode: 'none',
      isolatedSystemId: null,
      isolatedOrganId: null,
      hoveredOrgan: null,
      visibleSystems: new Set(['skeletal', 'nervous', 'circulatory', 'digestive', 'respiratory']),
      highlightedOrgans: {},
    });
  }
}));

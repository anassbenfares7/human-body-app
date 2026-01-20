import { create } from 'zustand';
import { ViewMode } from '@human-body/shared';
import { ORGANS_DATA, BODY_SYSTEMS } from '@human-body/shared';

// Phase 2 Interaction Modes
export type InteractionMode = 'normal' | 'focus' | 'isolate-system' | 'isolate-organ';
export type IsolationMode = 'none' | 'system' | 'organ';

interface AppState {
  // === Existing State ===
  selectedGender: 'male' | 'female';
  selectedOrgan: string | null;
  visibleSystems: string[];
  viewMode: ViewMode;
  theme: 'light' | 'dark';
  searchQuery: string;
  isLoading: boolean;
  
  // === Phase 2 State ===
  // Interaction Mode
  interactionMode: InteractionMode;
  isolationMode: IsolationMode;
  isolatedSystemId: string | null;
  isolatedOrganId: string | null;
  
  // Hover State
  hoveredOrgan: string | null;
  
  // Focus Mode
  isFocusMode: boolean;
  cameraTarget: { x: number; y: number; z: number } | null;
  
  // System Opacity
  systemOpacity: Record<string, number>;
  
  // === Existing Actions ===
  setGender: (gender: 'male' | 'female') => void;
  selectOrgan: (organId: string | null) => void;
  toggleSystem: (systemId: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
  
  // === Phase 2 Actions ===
  // Interaction Mode
  setInteractionMode: (mode: InteractionMode) => void;
  setIsolationMode: (mode: IsolationMode) => void;
  setHoveredOrgan: (organId: string | null) => void;
  
  // Focus Mode
  toggleFocusMode: () => void;
  setCameraTarget: (target: { x: number; y: number; z: number } | null) => void;
  
  // Isolation
  isolateSystem: (systemId: string) => void;
  isolateOrgan: (organId: string) => void;
  showAllSystems: () => void;
  
  // System Opacity
  setSystemOpacity: (systemId: string, opacity: number) => void;
  
  // Quick Toggle
  toggleSystemQuick: (systemId: string) => void;
  
  // Reset Extended
  resetInteraction: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // === Initial State ===
  selectedGender: 'male',
  selectedOrgan: null,
  visibleSystems: BODY_SYSTEMS.map(s => s.id),
  viewMode: 'macro',
  theme: 'light',
  searchQuery: '',
  isLoading: false,
  
  // === Phase 2 Initial State ===
  interactionMode: 'normal',
  isolationMode: 'none',
  isolatedSystemId: null,
  isolatedOrganId: null,
  hoveredOrgan: null,
  isFocusMode: false,
  cameraTarget: null,
  systemOpacity: {},
  
  // === Existing Actions ===
  setGender: (gender) => set({ selectedGender: gender }),
  
  selectOrgan: (organId) => set({ selectedOrgan: organId }),
  
  toggleSystem: (systemId) =>
    set((state) => ({
      visibleSystems: state.visibleSystems.includes(systemId)
        ? state.visibleSystems.filter((id) => id !== systemId)
        : [...state.visibleSystems, systemId],
    })),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  setTheme: (theme) => set({ theme }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  reset: () => set({
    selectedGender: 'male',
    selectedOrgan: null,
    visibleSystems: ['skeletal', 'muscular'],
    viewMode: 'macro',
    searchQuery: '',
    isLoading: false,
  }),
  
  // === Phase 2 Actions ===
  setInteractionMode: (mode) => set({ interactionMode: mode }),
  
  setIsolationMode: (mode) => set({ isolationMode: mode }),
  
  setHoveredOrgan: (organId) => set({ hoveredOrgan: organId }),
  
  toggleFocusMode: () => set((state) => ({ 
    isFocusMode: !state.isFocusMode,
    interactionMode: !state.isFocusMode ? 'focus' : 'normal'
  })),
  
  setCameraTarget: (target) => set({ cameraTarget: target }),
  
  isolateSystem: (systemId) => set({
    isolationMode: 'system',
    isolatedSystemId: systemId,
    isolatedOrganId: null,
    visibleSystems: [systemId],
    interactionMode: 'isolate-system'
  }),
  
  isolateOrgan: (organId) => set((state) => {
    const organ = ORGANS_DATA.find(o => o.id === organId);
    return {
      isolationMode: 'organ',
      isolatedOrganId: organId,
      isolatedSystemId: null,
      visibleSystems: organ ? [organ.system] : [],
      interactionMode: 'isolate-organ'
    };
  }),
  
  showAllSystems: () => set({
    isolationMode: 'none',
    isolatedSystemId: null,
    isolatedOrganId: null,
    visibleSystems: BODY_SYSTEMS.map(s => s.id),
    interactionMode: 'normal'
  }),
  
  setSystemOpacity: (systemId, opacity) => set((state) => ({
    systemOpacity: { ...state.systemOpacity, [systemId]: opacity }
  })),
  
  toggleSystemQuick: (systemId) => set((state) => ({
    visibleSystems: state.visibleSystems.includes(systemId)
      ? state.visibleSystems.filter(id => id !== systemId)
      : [...state.visibleSystems, systemId]
  })),
  
  resetInteraction: () => set({
    interactionMode: 'normal',
    isolationMode: 'none',
    isolatedSystemId: null,
    isolatedOrganId: null,
    hoveredOrgan: null,
    isFocusMode: false,
    cameraTarget: null,
    selectedOrgan: null
  }),
}));

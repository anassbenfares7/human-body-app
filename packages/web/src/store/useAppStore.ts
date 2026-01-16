import { create } from 'zustand';
import { ViewMode } from '@human-body/shared';

interface AppState {
  // State
  selectedGender: 'male' | 'female';
  selectedOrgan: string | null;
  visibleSystems: string[];
  viewMode: ViewMode;
  theme: 'light' | 'dark';
  searchQuery: string;
  isLoading: boolean;
  
  // Actions
  setGender: (gender: 'male' | 'female') => void;
  selectOrgan: (organId: string | null) => void;
  toggleSystem: (systemId: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  selectedGender: 'male',
  selectedOrgan: null,
  visibleSystems: ['skeletal', 'muscular'],
  viewMode: 'macro',
  theme: 'light',
  searchQuery: '',
  isLoading: false,
  
  // Actions
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
}));

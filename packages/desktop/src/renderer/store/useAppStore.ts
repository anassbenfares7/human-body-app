import { create } from 'zustand';

interface AppState {
  selectedGender: 'male' | 'female';
  visibleSystems: string[];
  selectedOrgan: string | null;
  viewMode: 'macro' | 'micro' | 'nano';
  theme: 'light' | 'dark';
  isLoading: boolean;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  selectedGender: 'male',
  visibleSystems: ['skeletal', 'muscular'],
  selectedOrgan: null,
  viewMode: 'macro',
  theme: 'light',
  isLoading: false,
  
  // Actions
  setGender: (gender) => set({ selectedGender: gender }),
  toggleSystem: (systemId) =>
    set((state) => ({
      visibleSystems: state.visibleSystems.includes(systemId)
        ? state.visibleSystems.filter((id) => id !== systemId)
        : [...state.visibleSystems, systemId],
    })),
  selectOrgan: (organId) => set({ selectedOrgan: organId }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setTheme: (theme) => set({ theme }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

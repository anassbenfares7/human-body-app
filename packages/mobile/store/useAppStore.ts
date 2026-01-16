import { create } from 'zustand';

interface AppState {
  selectedGender: 'male' | 'female';
  visibleSystems: string[];
  selectedOrgan: string | null;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  selectedGender: 'male',
  visibleSystems: ['skeletal', 'muscular'],
  selectedOrgan: null,
  
  // Actions
  setGender: (gender) => set({ selectedGender: gender }),
  toggleSystem: (systemId) =>
    set((state) => ({
      visibleSystems: state.visibleSystems.includes(systemId)
        ? state.visibleSystems.filter((id) => id !== systemId)
        : [...state.visibleSystems, systemId],
    })),
  selectOrgan: (organId) => set({ selectedOrgan: organId }),
}));

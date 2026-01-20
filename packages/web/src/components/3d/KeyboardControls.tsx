import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

/**
 * KeyboardControls - Phase 3.1 Circulatory System Testing
 * Testing shortcuts for circulatory organs
 */
export default function KeyboardControls() {
  const { resetInteraction, selectOrgan } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // D key - Reset selection
      if (event.key === 'd' || event.key === 'D') {
        resetInteraction();
        console.log('[KeyboardControls] Reset triggered');
      }

      // Circulatory System Test Keys (Phase 3.1)
      // H key - Select heart
      if (event.key === 'h' || event.key === 'H') {
        selectOrgan('heart');
        console.log('[KeyboardControls] Heart selected via keyboard');
      }

      // A key - Select arteries
      if (event.key === 'a' || event.key === 'A') {
        selectOrgan('arteries');
        console.log('[KeyboardControls] Arteries selected via keyboard');
      }

      // V key - Select veins
      if (event.key === 'v' || event.key === 'V') {
        selectOrgan('veins');
        console.log('[KeyboardControls] Veins selected via keyboard');
      }

      // C key - Select capillaries
      if (event.key === 'c' || event.key === 'C') {
        selectOrgan('capillaries');
        console.log('[KeyboardControls] Capillaries selected via keyboard');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetInteraction, selectOrgan]);

  return null; // This component doesn't render anything
}

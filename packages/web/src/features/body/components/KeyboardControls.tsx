/**
 * Keyboard Controls Component
 * Handles keyboard shortcuts:
 * - F: Toggle focus mode
 * - D: Reset to default
 * - I: Toggle isolation mode (none -> system -> organ -> none)
 * - 1-6: Quick toggle system visibility
 * - A: Toggle all systems ON/OFF
 */

import { useEffect } from 'react';
import { useBodyStore } from '../store/useBodyStore';
import { SYSTEM_IDS } from '../data/systems';

export default function KeyboardControls() {
  const {
    toggleFocusMode,
    resetCamera,
    resetToDefault,
    toggleIsolationMode,
    toggleSystemQuick,
    toggleAllSystems
  } = useBodyStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // F key - Toggle focus mode
      if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFocusMode();
        return;
      }

      // D key - Reset camera to default
      if (event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        resetCamera();
        return;
      }

      // I key - Toggle isolation mode
      if (event.key === 'i' || event.key === 'I') {
        event.preventDefault();
        toggleIsolationMode();
        return;
      }

      // A key - Toggle all systems ON/OFF
      if ((event.key === 'a' || event.key === 'A') && !event.shiftKey) {
        event.preventDefault();
        toggleAllSystems();
        return;
      }

      // 1-6 keys - Quick toggle system
      const keyNum = parseInt(event.key);
      if (keyNum >= 1 && keyNum <= 6) {
        event.preventDefault();
        const systemId = SYSTEM_IDS[keyNum - 1];
        if (systemId) {
          toggleSystemQuick(systemId);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFocusMode, resetCamera, resetToDefault, toggleIsolationMode, toggleAllSystems, toggleSystemQuick]);

  return null;
}

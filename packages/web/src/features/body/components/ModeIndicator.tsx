/**
 * Mode Indicator Component
 * Shows current interaction mode (Normal, Focus, Isolate System, Isolate Organ)
 * Tailwind-styled UI
 */

import { useBodyStore } from '../store/useBodyStore';

export function ModeIndicator() {
  const { isFocusMode, isolationMode } = useBodyStore();

  const getInteractionMode = () => {
    if (isFocusMode) return 'Focus';
    if (isolationMode === 'system') return 'Isolate System';
    if (isolationMode === 'organ') return 'Isolate Organ';
    return 'Normal';
  };

  const getModeColor = () => {
    const mode = getInteractionMode();
    switch (mode) {
      case 'Focus':
        return 'bg-blue-500/20 text-blue-300 border-blue-500';
      case 'Isolate System':
        return 'bg-purple-500/20 text-purple-300 border-purple-500';
      case 'Isolate Organ':
        return 'bg-pink-500/20 text-pink-300 border-pink-500';
      default:
        return 'bg-gray-700/50 text-gray-300 border-gray-600';
    }
  };

  const mode = getInteractionMode();

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2">
      <div className={`px-4 py-2 rounded-lg border backdrop-blur-sm ${getModeColor()}`}>
        <span className="text-sm font-semibold">{mode} Mode</span>
      </div>
    </div>
  );
}

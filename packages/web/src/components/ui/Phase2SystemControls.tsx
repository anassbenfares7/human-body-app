/**
 * Phase 2 System Controls Component
 * Tailwind-styled UI for toggling body systems
 * Matches vanilla Phase 2 checkbox behavior
 */

import { usePhase2Store } from '@/store/usePhase2Store';
import { PHASE2_SYSTEMS, SYSTEM_IDS } from '@/data/phase2Systems';

export default function Phase2SystemControls() {
  const { isSystemVisible, toggleSystemVisibility } = usePhase2Store();

  const handleToggle = (systemId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleSystemVisibility(systemId, e.target.checked);
  };

  return (
    <div className="absolute top-20 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 text-white shadow-xl max-w-xs">
      <h3 className="text-sm font-semibold mb-3 text-gray-300">Body Systems</h3>
      <div className="space-y-2">
        {PHASE2_SYSTEMS.map((system, index) => {
          const isVisible = isSystemVisible(system.id);
          const keyNum = index + 1;

          return (
            <label
              key={system.id}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <input
                id={`${system.id}-toggle`}
                type="checkbox"
                checked={isVisible}
                onChange={handleToggle(system.id)}
                className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">[{keyNum}]</span>
                  <span className="text-sm font-medium">{system.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: system.color }}
                  />
                  <span className="text-xs text-gray-400">{system.description}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Keyboard hints */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs font-mono">F</kbd>
            <span>Toggle Focus Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs font-mono">D</kbd>
            <span>Reset to Default</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs font-mono">I</kbd>
            <span>Toggle Isolation Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs font-mono">A</kbd>
            <span>Toggle All Systems</span>
          </div>
        </div>
      </div>
    </div>
  );
}

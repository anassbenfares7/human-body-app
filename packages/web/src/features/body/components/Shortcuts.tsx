/**
 * Shortcuts Component
 * Displays keyboard shortcuts in a separate panel
 */
import { useBodyStore } from '../store/useBodyStore';

export function Shortcuts() {
  return (
    <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 text-white shadow-xl">
      <h3 className="text-sm font-semibold mb-2 text-gray-300">Shortcuts</h3>
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
  );
}

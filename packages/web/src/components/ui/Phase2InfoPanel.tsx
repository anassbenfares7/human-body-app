/**
 * Phase 2 Info Panel Component
 * Shows selected organ information
 * Tailwind-styled UI matching vanilla Phase 2 behavior
 */

import { usePhase2Store } from '@/store/usePhase2Store';

export default function Phase2InfoPanel() {
  const { selectedOrgan, deselectOrgan } = usePhase2Store();

  if (!selectedOrgan) {
    return null;
  }

  const organ = selectedOrgan as any;

  return (
    <div className="absolute top-20 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 text-white shadow-xl max-w-sm">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{organ.name}</h3>
        <button
          onClick={deselectOrgan}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wide">System</span>
          <p className="text-sm font-medium mt-1">{organ.system}</p>
        </div>

        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Function</span>
          <p className="text-sm mt-1">{organ.function}</p>
        </div>

        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wide">Position</span>
          <p className="text-xs font-mono mt-1 text-gray-300">
            x: {organ.position.x.toFixed(2)}, y: {organ.position.y.toFixed(2)}, z: {organ.position.z.toFixed(2)}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">D</kbd> to reset
          </p>
        </div>
      </div>
    </div>
  );
}

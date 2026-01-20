/**
 * Phase 2 App Component
 * Main app component for Phase 2 implementation
 * Brings together all Phase 2 3D and UI components
 */

import Phase2BodyViewer from './3d/Phase2BodyViewer';
import Phase2SystemControls from './ui/Phase2SystemControls';
import Phase2ModeIndicator from './ui/Phase2ModeIndicator';
import Phase2InfoPanel from './ui/Phase2InfoPanel';

export default function Phase2App() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* 3D Viewer */}
      <Phase2BodyViewer />

      {/* Mode Indicator */}
      <Phase2ModeIndicator />

      {/* System Controls */}
      <Phase2SystemControls />

      {/* Info Panel */}
      <Phase2InfoPanel />
    </div>
  );
}

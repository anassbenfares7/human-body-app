/**
 * App Component
 * Main app component
 * Brings together all 3D and UI components
 */

import { BodyViewer } from './features/body/components/BodyViewer';
import { SystemControls } from './features/body/components/SystemControls';
import { ModeIndicator } from './features/body/components/ModeIndicator';
import { InfoPanel } from './features/body/components/InfoPanel';
import { Shortcuts } from './features/body/components/Shortcuts';

export default function App() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#1a1a2e]">
      {/* 3D Viewer */}
      <BodyViewer />

      {/* Mode Indicator */}
      <ModeIndicator />

      {/* System Controls */}
      <SystemControls />

      {/* Info Panel */}
      <InfoPanel />

      {/* Shortcuts */}
      <Shortcuts />
    </div>
  );
}

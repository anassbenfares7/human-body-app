import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { useAppStore } from '@/store/useAppStore';
import OrganGroup from './OrganGroup';
import KeyboardControls from './KeyboardControls';
import { BODY_SYSTEMS } from '@human-body/shared';

/**
 * BodyViewer - Main 3D Scene Canvas
 * Phase 3.1: Multi-system rendering with OrganGroup components
 */
export default function BodyViewer() {
  const { viewMode, visibleSystems } = useAppStore();

  return (
    <div className="h-screen w-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {/* Environment */}
          <Environment preset="studio" />
          <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} />

          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={50} />

          {/* PHASE 3.1: All Body Systems (10 systems, 41 organs) */}
          {BODY_SYSTEMS.map(system => (
            <OrganGroup
              key={system.id}
              systemId={system.id}
            />
          ))}

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={viewMode === 'macro' ? 1 : 0.1}
            maxDistance={viewMode === 'macro' ? 10 : 2}
            target={[0, 1, 0]}
          />

          {/* Keyboard Controls */}
          <KeyboardControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

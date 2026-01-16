import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import BodyModel from './BodyModel';
import SystemLayer from './SystemLayer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function BodyViewer() {
  const { selectedGender, visibleSystems, viewMode } = useAppStore();
  const [cameraPosition, setCameraPosition] = useState([0, 1.5, 3]);

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
          <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
          
          {/* 3D Models */}
          <BodyModel gender={selectedGender} />
          
          {/* System Layers */}
          {visibleSystems.map((systemId) => (
            <SystemLayer key={systemId} systemId={systemId} />
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
        </Suspense>
      </Canvas>
      
      {/* Loading Overlay */}
      <Suspense fallback={<LoadingSpinner />}>
        <></>
      </Suspense>
    </div>
  );
}

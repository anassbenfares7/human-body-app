/**
 * Phase 2 Body Viewer Component
 * Main 3D scene matching vanilla Phase 2 behavior exactly
 * - Default camera position: (0, 0.85, 3.0)
 * - Default target: (0, 0.85, 0)
 * - Professional Blender-style camera controls
 * - 6 body systems with 5 organs
 */

import { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Vector3, MathUtils } from 'three';
import { usePhase2Store } from '@/store/usePhase2Store';
import { PHASE2_SYSTEMS } from '@/data/phase2Systems';
import Phase2SystemLayer from './Phase2SystemLayer';
import Phase2KeyboardControls from './Phase2KeyboardControls';

// Camera settings matching vanilla Phase 2
const DEFAULT_CAMERA_POSITION = new Vector3(0, 0.85, 3.0);
const DEFAULT_TARGET = new Vector3(0, 0.85, 0);
const MIN_ZOOM_DISTANCE = 0.3;
const MAX_ZOOM_DISTANCE = 15;

// Camera focus animation
function CameraFocus() {
  const { camera, controls } = useThree();
  const { cameraTarget, isFocusMode, selectedOrgan } = usePhase2Store();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isFocusMode || !selectedOrgan || !cameraTarget) {
      // Reset to default when not in focus mode
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }

      const startPos = camera.position.clone();
      const startTarget = controls?.target.clone() || DEFAULT_TARGET.clone();
      const duration = 1000;
      const startTime = performance.now();

      const animateReset = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-in-out cubic
        const easeProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        camera.position.lerpVectors(startPos, DEFAULT_CAMERA_POSITION, easeProgress);
        if (controls) {
          controls.target.lerpVectors(startTarget, DEFAULT_TARGET, easeProgress);
          controls.update();
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateReset);
        }
      };

      animationRef.current = requestAnimationFrame(animateReset);
      return;
    }

    // Focus on organ
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startPos = camera.position.clone();
    const startTarget = controls?.target.clone() || DEFAULT_TARGET.clone();
    const targetPosition = new Vector3(cameraTarget.x, cameraTarget.y, cameraTarget.z);
    const targetLookAt = new Vector3(
      selectedOrgan.position.x,
      selectedOrgan.position.y,
      selectedOrgan.position.z
    );
    const duration = 1000;
    const startTime = performance.now();

    const animateFocus = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-in-out cubic
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      camera.position.lerpVectors(startPos, targetPosition, easeProgress);
      if (controls) {
        controls.target.lerpVectors(startTarget, targetLookAt, easeProgress);
        controls.update();
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateFocus);
      }
    };

    animationRef.current = requestAnimationFrame(animateFocus);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isFocusMode, selectedOrgan, cameraTarget, camera, controls]);

  return null;
}

interface Phase2BodyViewerProps {
  className?: string;
}

export default function Phase2BodyViewer({ className = '' }: Phase2BodyViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading after initialization
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`h-screen w-full bg-[#1a1a2e] ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#1a1a2e]">
          <div className="text-white text-lg">Loading 3D Scene...</div>
        </div>
      )}

      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false
        }}
      >
        {/* Lighting setup matching vanilla Phase 2 */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 10, 7]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <directionalLight position={[0, 5, -10]} intensity={0.3} />
        <hemisphereLight args={[0xffffff, 0x444444, 0.6]} position={[0, 50, 0]} />

        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={[0, 0.85, 3.0]}
          fov={50}
          near={0.1}
          far={1000}
        />

        {/* Phase 2 Body Systems (6 systems, 5 organs) */}
        {PHASE2_SYSTEMS.map(system => (
          <Phase2SystemLayer
            key={system.id}
            systemId={system.id}
          />
        ))}

        {/* Camera Controls - Blender-style matching vanilla Phase 2 */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.6}
          zoomSpeed={12}
          panSpeed={0.6}
          enableZoom
          minDistance={MIN_ZOOM_DISTANCE}
          maxDistance={MAX_ZOOM_DISTANCE}
          maxPolarAngle={Math.PI * 0.9}
          minPolarAngle={0.05}
          enablePan
          screenSpacePanning={false}
          autoRotate={false}
          target={[0, 0.85, 0]}
        />

        {/* Camera Focus Animation */}
        <CameraFocus />

        {/* Keyboard Controls */}
        <Phase2KeyboardControls />
      </Canvas>
    </div>
  );
}

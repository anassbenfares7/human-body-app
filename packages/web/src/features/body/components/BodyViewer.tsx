/**
 * Body Viewer Component
 * Main 3D scene
 * - Default camera position: (0, 0.85, 3.0)
 * - Default target: (0, 0.85, 0)
 * - Professional Blender-style camera controls
 * - 6 body systems with 5 organs
 */

import { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useBodyStore } from '../store/useBodyStore';
import { SYSTEMS } from '../data/systems';
import SystemLayer from './SystemLayer';
import KeyboardControls from './KeyboardControls';

// Camera settings
const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 0.85, 3.0);
const DEFAULT_TARGET = new THREE.Vector3(0, 0.85, 0);
const MIN_ZOOM_DISTANCE = 0.3;
const MAX_ZOOM_DISTANCE = 15;

// Camera focus animation
function CameraFocus() {
  const { camera, controls, scene } = useThree();
  const { isFocusMode, isResetting, selectedOrgan, resetToDefault } = useBodyStore();
  const animationRef = useRef<number>();

  useEffect(() => {
    // Cancel any ongoing animation when state changes
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }

    // Handle reset to default
    if (isResetting) {
      const startPos = camera.position.clone();
      const startTarget = controls?.target.clone() || DEFAULT_TARGET.clone();
      const duration = 2000; // Slower, more readable
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
        } else {
          // Animation complete, fully reset state
          resetToDefault();
        }
      };

      animationRef.current = requestAnimationFrame(animateReset);
      return;
    }

    // Handle focus on organ using actual mesh bounding box
    if (!isFocusMode || !selectedOrgan) {
      return;
    }

    // Get the organ mesh from the scene
    const organMesh = scene.getObjectByName(selectedOrgan.meshName);

    // Check that the mesh exists and is a valid Object3D
    if (!organMesh) return;

    try {
      // Compute world-space bounding box
      const boundingBox = new THREE.Box3();
      boundingBox.setFromObject(organMesh);

      // Get bounding box center (visual center of organ)
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      // Get bounding box size
      const size = new THREE.Vector3();
      boundingBox.getSize(size);

      // Calculate max dimension for framing
      const maxDimension = Math.max(size.x, size.y, size.z);

      // Guard against invalid dimensions
      if (!isFinite(maxDimension) || maxDimension <= 0) return;

      // Calculate framing distance based on camera FOV (50 degrees)
      const fovRad = (50 * Math.PI) / 180;
      const framingDistance = (maxDimension / 2) / Math.tan(fovRad / 2) * 1.5;

      // Camera position: shortest path to organ from slightly above and front
      // Position: horizontally centered (X/Z), slightly above (Y), at proper distance
      const targetPosition = new THREE.Vector3(
        center.x,           // Horizontally centered
        center.y + size.y * 0.3,  // Slightly above organ (30% of height)
        center.z + framingDistance  // In front of organ along Z
      );

      // Animate camera
      const startPos = camera.position.clone();
      const startTarget = controls?.target.clone() || DEFAULT_TARGET.clone();
      const targetLookAt = center.clone();  // Look at bounding box center
      const duration = 2000;
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
    } catch (error) {
      console.warn('Failed to focus on organ:', error);
      return;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isFocusMode, isResetting, selectedOrgan, camera, controls, scene, resetToDefault]);

  return null;
}

interface BodyViewerProps {
  className?: string;
}

export function BodyViewer({ className = '' }: BodyViewerProps) {
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
        {/* Lighting setup */}
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

        {/* Body Systems (6 systems, 5 organs) */}
        {SYSTEMS.map(system => (
          <SystemLayer
            key={system.id}
            systemId={system.id}
          />
        ))}

        {/* Camera Controls - Blender-style */}
        <OrbitControls
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={0.2}
          zoomSpeed={0.4}
          panSpeed={0.2}
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
        <KeyboardControls />
      </Canvas>
    </div>
  );
}

/**
 * Organ Mesh Component
 * Renders individual organs with placeholder geometry
 * Matches visual feedback exactly
 */

import { useRef, useEffect, useMemo } from 'react';
import { Mesh, Material } from 'three';
import { useThree } from '@react-three/fiber';
import { useBodyStore } from '../store/useBodyStore';
import { Organ } from '../data/organs';

interface OrganMeshProps {
  organ: Organ;
  onClick?: (organId: string) => void;
  onHover?: (organId: string | null) => void;
}

export default function OrganMesh({ organ, onClick, onHover }: OrganMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<Material>(null);
  const { highlightedOrgans, isOrganVisible, storeOriginalMaterial } = useBodyStore();

  const isVisible = isOrganVisible(organ.id);
  const highlight = highlightedOrgans[organ.id];

  // Create geometry based on organ type
  const geometry = useMemo(() => {
    switch (organ.geometry) {
      case 'sphere':
        return <sphereGeometry args={[organ.size, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[organ.size * 0.8, organ.size, organ.size * 1.5, 32]} />;
      case 'box':
        return <boxGeometry args={[organ.size * 2, organ.size * 2, organ.size * 2]} />;
      default:
        return <sphereGeometry args={[organ.size, 32, 32]} />;
    }
  }, [organ.geometry, organ.size]);

  // Store original material on mount
  useEffect(() => {
    if (materialRef.current) {
      storeOriginalMaterial(organ.id, {
        color: materialRef.current.color.getHex(),
        emissive: materialRef.current.emissive?.getHex() || 0,
        emissiveIntensity: materialRef.current.emissiveIntensity || 0,
        metalness: materialRef.current.metalness || 0,
        roughness: materialRef.current.roughness || 0.85
      });
    }
  }, [organ.id, storeOriginalMaterial]);

  // Apply highlight effects
  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    if (!isVisible) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;

    if (highlight) {
      // Apply highlight based on type
      switch (highlight.type) {
        case 'selected':
          meshRef.current.scale.set(
            organ.scale.x * 1.1,
            organ.scale.y * 1.1,
            organ.scale.z * 1.1
          );
          if (materialRef.current.emissive) {
            materialRef.current.emissive.setHex(organ.color);
            materialRef.current.emissiveIntensity = 0.4;
          }
          break;
        case 'hovered':
          meshRef.current.scale.set(
            organ.scale.x * 1.05,
            organ.scale.y * 1.05,
            organ.scale.z * 1.05
          );
          if (materialRef.current.emissive) {
            materialRef.current.emissive.setHex(organ.color);
            materialRef.current.emissiveIntensity = 0.2;
          }
          break;
        case 'isolated':
          meshRef.current.scale.set(
            organ.scale.x * 1.05,
            organ.scale.y * 1.05,
            organ.scale.z * 1.05
          );
          if (materialRef.current.emissive) {
            materialRef.current.emissive.setHex(organ.color);
            materialRef.current.emissiveIntensity = 0.3;
          }
          break;
      }
    } else {
      // Restore original scale and material
      meshRef.current.scale.set(organ.scale.x, organ.scale.y, organ.scale.z);
      if (materialRef.current.emissive) {
        materialRef.current.emissive.setHex(0x000000);
        materialRef.current.emissiveIntensity = 0;
      }
    }
  }, [highlight, organ, isVisible]);

  // Pointer events
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (isVisible && onClick) {
      onClick(organ.id);
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    if (isVisible && onHover) {
      onHover(organ.id);
    }
  };

  const handlePointerOut = () => {
    if (onHover) {
      onHover(null);
    }
  };

  return (
    <mesh
      ref={meshRef}
      name={organ.meshName}
      position={[organ.position.x, organ.position.y, organ.position.z]}
      userData={{ organId: organ.id }}
      castShadow
      receiveShadow
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      visible={isVisible}
    >
      {geometry}
      <meshStandardMaterial
        ref={materialRef}
        color={organ.color}
        metalness={0}
        roughness={0.85}
        flatShading={false}
      />
    </mesh>
  );
}

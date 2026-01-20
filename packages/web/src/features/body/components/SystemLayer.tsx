/**
 * System Layer Component
 * Renders all organs for a specific body system
 * Matches SystemManager behavior
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useBodyStore } from '../store/useBodyStore';
import { ORGANS } from '../data/organs';
import { Organ } from '../data/organs';
import OrganMesh from './OrganMesh';

interface SystemLayerProps {
  systemId: string;
}

export default function SystemLayer({ systemId }: SystemLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isSystemVisible, toggleSystemVisibility } = useBodyStore();

  const isVisible = isSystemVisible(systemId);

  // Get organs for this system
  const systemOrgans = ORGANS.filter(organ => organ.systemId === systemId);

  // Update group visibility when state changes
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
  }, [isVisible]);

  const handleOrganClick = (organId: string) => {
    useBodyStore.getState().selectOrgan(organId);
  };

  const handleOrganHover = (organId: string | null) => {
    useBodyStore.getState().setHoveredOrgan(organId);
  };

  return (
    <group
      ref={groupRef}
      name={`${systemId}SystemGroup`}
      visible={isVisible}
    >
      {systemOrgans.map(organ => (
        <OrganMesh
          key={organ.id}
          organ={organ}
          onClick={handleOrganClick}
          onHover={handleOrganHover}
        />
      ))}
    </group>
  );
}

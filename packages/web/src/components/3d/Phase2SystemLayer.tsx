/**
 * Phase 2 System Layer Component
 * Renders all organs for a specific body system
 * Matches vanilla Phase 2 SystemManager behavior
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePhase2Store } from '@/store/usePhase2Store';
import { PHASE2_ORGANS } from '@/data/phase2Organs';
import { Phase2Organ } from '@/data/phase2Organs';
import Phase2OrganMesh from './Phase2OrganMesh';

interface Phase2SystemLayerProps {
  systemId: string;
}

export default function Phase2SystemLayer({ systemId }: Phase2SystemLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { isSystemVisible, toggleSystemVisibility } = usePhase2Store();

  const isVisible = isSystemVisible(systemId);

  // Get organs for this system
  const systemOrgans = PHASE2_ORGANS.filter(organ => organ.systemId === systemId);

  // Update group visibility when state changes
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
  }, [isVisible]);

  const handleOrganClick = (organId: string) => {
    usePhase2Store.getState().selectOrgan(organId);
  };

  const handleOrganHover = (organId: string | null) => {
    usePhase2Store.getState().setHoveredOrgan(organId);
  };

  return (
    <group
      ref={groupRef}
      name={`${systemId}SystemGroup`}
      visible={isVisible}
    >
      {systemOrgans.map(organ => (
        <Phase2OrganMesh
          key={organ.id}
          organ={organ}
          onClick={handleOrganClick}
          onHover={handleOrganHover}
        />
      ))}
    </group>
  );
}

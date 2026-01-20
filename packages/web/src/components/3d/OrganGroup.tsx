import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';
import OrganMesh from './OrganMesh';

interface OrganGroupProps {
  systemId: string;
}

export default function OrganGroup({ systemId }: OrganGroupProps) {
  const { 
    visibleSystems, 
    systemOpacity, 
    selectedOrgan, 
    hoveredOrgan,
    isolationMode,
    isolatedSystemId,
    isolatedOrganId
  } = useAppStore();
  
  const systemData = BODY_SYSTEMS.find(s => s.id === systemId);
  if (!systemData) return null;
  
  const isVisible = visibleSystems.includes(systemId);
  const opacity = systemOpacity[systemId] ?? 1;
  
  // Determine highlight state for organs in this system
  const getHighlightState = (organId: string): 'none' | 'hovered' | 'selected' | 'isolated' => {
    if (selectedOrgan === organId) return 'selected';
    if (hoveredOrgan === organId) return 'hovered';
    if (isolationMode === 'system' && isolatedSystemId === systemId) return 'isolated';
    if (isolationMode === 'organ' && isolatedOrganId === organId) return 'isolated';
    return 'none';
  };
  
  return (
    <group visible={isVisible}>
      {systemData.organs.map(organId => (
        <OrganMesh
          key={organId}
          organId={organId}
          visible={isVisible}
          opacity={opacity}
          highlight={getHighlightState(organId)}
        />
      ))}
    </group>
  );
}

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';
import { ORGANS_DATA } from '@human-body/shared';

interface OrganMeshProps {
  organId: string;
  visible?: boolean;
  opacity?: number;
  highlight?: 'none' | 'hovered' | 'selected' | 'isolated';
}

export default function OrganMesh({ 
  organId, 
  visible = true, 
  opacity = 1,
  highlight = 'none' 
}: OrganMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { selectedOrgan, hoveredOrgan, selectOrgan, setHoveredOrgan } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const organData = ORGANS_DATA.find(o => o.id === organId);
  if (!organData) return null;
  
  const isSelected = selectedOrgan === organId;
  const isHoveredState = hoveredOrgan === organId;
  
  // Handle click
  const handleClick = (event: THREE.Event) => {
    event.stopPropagation();
    selectOrgan(organId);
  };
  
  // Handle hover
  const handlePointerOver = () => {
    setIsHovered(true);
    setHoveredOrgan(organId);
  };
  
  const handlePointerOut = () => {
    setIsHovered(false);
    setHoveredOrgan(null);
  };
  
  // Calculate scale based on highlight state
  const getScale = () => {
    if (highlight === 'selected') return 1.1;
    if (highlight === 'hovered' || isHovered) return 1.05;
    if (highlight === 'isolated') return 1.05;
    return 1.0;
  };
  
  // Calculate emissive intensity
  const getEmissiveIntensity = () => {
    if (highlight === 'selected') return 0.4;
    if (highlight === 'hovered' || isHovered) return 0.2;
    if (highlight === 'isolated') return 0.3;
    return 0;
  };
  
  // Get color based on system
  const getSystemColor = (system: string) => {
    const systemColors: Record<string, string> = {
      circulatory: '#ff4757',
      respiratory: '#2ed573',
      nervous: '#ffd93d',
      digestive: '#ffa502',
      urinary: '#00cec9',
      skeletal: '#e0e0e0',
      muscular: '#ff6b6b',
      endocrine: '#1e90ff',
      lymphatic: '#9b59b6',
      reproductive: '#fd79a8'
    };
    return systemColors[system] || '#cccccc';
  };
  
  const systemColor = getSystemColor(organData.system);
  
  return (
    <mesh
      ref={meshRef}
      position={[organData.position.x, organData.position.y, organData.position.z]}
      visible={visible}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={getScale()}
    >
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial
        color={systemColor}
        emissive={systemColor}
        emissiveIntensity={getEmissiveIntensity()}
        transparent={opacity < 1}
        opacity={opacity}
        metalness={0.2}
        roughness={0.6}
      />
    </mesh>
  );
}

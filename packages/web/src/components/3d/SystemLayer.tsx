import { useGLTF } from '@react-three/drei';
import { useAppStore } from '@/store/useAppStore';
import { BODY_SYSTEMS } from '@human-body/shared';

interface SystemLayerProps {
  systemId: string;
}

export default function SystemLayer({ systemId }: SystemLayerProps) {
  const visibleSystems = useAppStore((state) => state.visibleSystems);
  
  if (!visibleSystems.includes(systemId)) {
    return null;
  }
  
  const system = BODY_SYSTEMS.find((s) => s.id === systemId);
  if (!system) return null;
  
  const { scene } = useGLTF(system.modelPath);
  
  return (
    <primitive 
      object={scene} 
      position={[0, 0, 0]}
      opacity={0.8}
      transparent
    />
  );
}

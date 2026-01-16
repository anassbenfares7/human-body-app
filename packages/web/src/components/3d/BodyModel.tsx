import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

interface BodyModelProps {
  gender: 'male' | 'female';
}

export default function BodyModel({ gender }: BodyModelProps) {
  const modelPath = gender === 'male' 
    ? '/models/bodies/male-body.glb' 
    : '/models/bodies/female-body.glb';
  
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  
  return <primitive object={scene} position={[0, 0, 0]} />;
}

// Preload models
useGLTF.preload('/models/bodies/male-body.glb');
useGLTF.preload('/models/bodies/female-body.glb');

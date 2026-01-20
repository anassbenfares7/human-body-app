/**
 * Body Organs Data
 * 5 organs with exact positions
 */

export interface Organ {
  id: string;
  name: string;
  system: string;
  function: string;
  meshName: string;
  position: { x: number; y: number; z: number };
  color: number;
  geometry: 'sphere' | 'cylinder' | 'box';
  size: number;
  scale: { x: number; y: number; z: number };
  systemId: string;
  groupId: string;
}

export const ORGANS: Organ[] = [
  {
    id: 'brain',
    name: 'Brain',
    system: 'Nervous',
    function: 'Controls body functions and thinking',
    meshName: 'Brain',
    position: { x: 0, y: 1.4, z: 0 },
    color: 0xD4C4A8,
    geometry: 'sphere',
    size: 0.22,
    scale: { x: 1.0, y: 0.85, z: 1.0 },
    systemId: 'nervous',
    groupId: 'nervous-organs',
  },
  {
    id: 'lungs',
    name: 'Lungs',
    system: 'Respiratory',
    function: 'Exchange oxygen and carbon dioxide',
    meshName: 'Lungs',
    position: { x: 0, y: 0.8, z: 0 },
    color: 0xB5A8A8,
    geometry: 'cylinder',
    size: 0.25,
    scale: { x: 1.5, y: 0.7, z: 1.0 },
    systemId: 'respiratory',
    groupId: 'respiratory-organs',
  },
  {
    id: 'heart',
    name: 'Heart',
    system: 'Circulatory',
    function: 'Pumps blood throughout body',
    meshName: 'Heart',
    position: { x: -0.2, y: 0.65, z: 0.15 },
    color: 0xC27D7D,
    geometry: 'sphere',
    size: 0.18,
    scale: { x: 1.2, y: 1.0, z: 1.0 },
    systemId: 'circulatory',
    groupId: 'circulatory-organs',
  },
  {
    id: 'liver',
    name: 'Liver',
    system: 'Digestive',
    function: 'Filters blood and produces bile',
    meshName: 'Liver',
    position: { x: -0.15, y: 0.4, z: 0 },
    color: 0xA87868,
    geometry: 'box',
    size: 0.22,
    scale: { x: 1.0, y: 0.7, z: 1.2 },
    systemId: 'digestive',
    groupId: 'digestive-organs',
  },
  {
    id: 'stomach',
    name: 'Stomach',
    system: 'Digestive',
    function: 'Breaks down food with acids',
    meshName: 'Stomach',
    position: { x: 0.2, y: 0.3, z: 0 },
    color: 0xC4B090,
    geometry: 'sphere',
    size: 0.18,
    scale: { x: 1.0, y: 1.2, z: 0.8 },
    systemId: 'digestive',
    groupId: 'digestive-organs',
  }
];

// Create organ-to-system mapping
export const ORGAN_TO_SYSTEM_MAP = ORGANS.reduce((acc, organ) => {
  acc[organ.id] = organ.systemId;
  return acc;
}, {} as Record<string, string>);

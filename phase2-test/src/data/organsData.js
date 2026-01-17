/**
 * Organs Data - Phase 2
 * Extended from Phase 1 with systemId and groupId
 */

export const ORGANS_DATA = [
  {
    id: 'heart',
    name: 'Heart',
    system: 'Circulatory',
    function: 'Pumps blood throughout body',
    meshName: 'Heart',
    position: { x: 0.05, y: 0.35, z: 0.12 },
    color: 0xff4444,
    originalColor: null,
    geometry: 'sphere',
    size: 0.12,
    scale: { x: 1.2, y: 1.0, z: 1.0 },
    // Phase 2 additions
    systemId: 'circulatory',
    groupId: 'circulatory-organs',
    visible: true,
    opacity: 1.0
  },
  {
    id: 'lungs',
    name: 'Lungs',
    system: 'Respiratory',
    function: 'Exchange oxygen and carbon dioxide',
    meshName: 'Lungs',
    position: { x: 0, y: 0.45, z: 0.08 },
    color: 0x44aaff,
    originalColor: null,
    geometry: 'cylinder',
    size: 0.15,
    scale: { x: 1.5, y: 0.8, z: 1.0 },
    systemId: 'respiratory',
    groupId: 'respiratory-organs',
    visible: true,
    opacity: 1.0
  },
  {
    id: 'brain',
    name: 'Brain',
    system: 'Nervous',
    function: 'Controls body functions and thinking',
    meshName: 'Brain',
    position: { x: 0, y: 0.75, z: 0.05 },
    color: 0xffaa44,
    originalColor: null,
    geometry: 'sphere',
    size: 0.14,
    scale: { x: 1.0, y: 0.85, z: 1.0 },
    systemId: 'nervous',
    groupId: 'nervous-organs',
    visible: true,
    opacity: 1.0
  },
  {
    id: 'liver',
    name: 'Liver',
    system: 'Digestive',
    function: 'Filters blood and produces bile',
    meshName: 'Liver',
    position: { x: -0.12, y: 0.28, z: 0.08 },
    color: 0xaa44ff,
    originalColor: null,
    geometry: 'box',
    size: 0.16,
    scale: { x: 1.0, y: 0.8, z: 1.2 },
    systemId: 'digestive',
    groupId: 'digestive-organs',
    visible: true,
    opacity: 1.0
  },
  {
    id: 'stomach',
    name: 'Stomach',
    system: 'Digestive',
    function: 'Breaks down food with acids',
    meshName: 'Stomach',
    position: { x: 0.08, y: 0.22, z: 0.06 },
    color: 0x44ffaa,
    originalColor: null,
    geometry: 'sphere',
    size: 0.11,
    scale: { x: 1.0, y: 1.3, z: 0.8 },
    systemId: 'digestive',
    groupId: 'digestive-organs',
    visible: true,
    opacity: 1.0
  },
  {
    id: 'kidneys',
    name: 'Kidneys',
    system: 'Urinary',
    function: 'Filter blood and produce urine',
    meshName: 'Kidneys',
    position: { x: 0, y: 0.18, z: -0.08 },
    color: 0xff44aa,
    originalColor: null,
    geometry: 'box',
    size: 0.10,
    scale: { x: 1.8, y: 0.6, z: 0.8 },
    systemId: 'urinary',
    groupId: 'urinary-organs',
    visible: true,
    opacity: 1.0
  }
];

// Create organ-to-system mapping for quick lookup
export const ORGAN_TO_SYSTEM_MAP = ORGANS_DATA.reduce((acc, organ) => {
  acc[organ.id] = organ.systemId;
  return acc;
}, {});

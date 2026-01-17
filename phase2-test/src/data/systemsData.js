/**
 * Body Systems Data - Phase 2
 * 7 body systems with colors and organ associations
 */

export const BODY_SYSTEMS = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    description: 'Provides structure, protection, and support for the body',
    color: '#e0e0e0',
    organs: ['skull', 'spine', 'ribs', 'arms', 'legs', 'pelvis'],
    group: null, // THREE.Group reference (will be set at runtime)
    visible: true,
    opacity: 1.0
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    description: 'Enables movement and maintains posture',
    color: '#ff6b6b',
    organs: ['biceps', 'triceps', 'quadriceps', 'hamstrings', 'abdominals'],
    group: null,
    visible: false, // Start hidden
    opacity: 1.0
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'Controls and coordinates body activities',
    color: '#ffd93d',
    organs: ['brain', 'spinal-cord', 'nerves'],
    group: null,
    visible: true,
    opacity: 1.0
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    description: 'Transports blood, nutrients, and oxygen',
    color: '#ff4757',
    organs: ['heart', 'arteries', 'veins', 'capillaries'],
    group: null,
    visible: true,
    opacity: 1.0
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    description: 'Breaks down food and absorbs nutrients',
    color: '#ffa502',
    organs: ['stomach', 'intestines', 'liver', 'pancreas'],
    group: null,
    visible: true,
    opacity: 1.0
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    description: 'Facilitates breathing and gas exchange',
    color: '#2ed573',
    organs: ['lungs', 'trachea', 'bronchi', 'diaphragm'],
    group: null,
    visible: true,
    opacity: 1.0
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    description: 'Filters blood and removes waste',
    color: '#00cec9',
    organs: ['kidneys', 'bladder', 'ureters', 'urethra'],
    group: null,
    visible: true,
    opacity: 1.0
  }
];

// Create system color mapping for quick lookup
export const SYSTEM_COLORS = BODY_SYSTEMS.reduce((acc, system) => {
  acc[system.id] = system.color;
  return acc;
}, {});

// Create system-to-organs mapping for quick lookup
export const SYSTEM_TO_ORGANS_MAP = BODY_SYSTEMS.reduce((acc, system) => {
  acc[system.id] = system.organs;
  return acc;
}, {});

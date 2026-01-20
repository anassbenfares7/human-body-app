/**
 * Body Systems Data
 * 6 body systems with colors and organ associations
 */

export interface System {
  id: string;
  name: string;
  description: string;
  color: string;
  organs: string[];
  visible: boolean;
  opacity: number;
}

export const SYSTEMS: System[] = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    description: 'Provides structure, protection, and support for the body',
    color: '#e0e0e0',
    organs: ['skull', 'spine', 'ribs', 'arms', 'legs', 'pelvis'],
    visible: true,
    opacity: 1.0
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    description: 'Enables movement and maintains posture',
    color: '#ff6b6b',
    organs: ['biceps', 'triceps', 'quadriceps', 'hamstrings', 'abdominals'],
    visible: false,
    opacity: 1.0
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'Controls and coordinates body activities',
    color: '#ffd93d',
    organs: ['brain', 'spinal-cord', 'nerves'],
    visible: true,
    opacity: 1.0
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    description: 'Transports blood, nutrients, and oxygen',
    color: '#ff4757',
    organs: ['heart', 'arteries', 'veins', 'capillaries'],
    visible: true,
    opacity: 1.0
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    description: 'Breaks down food and absorbs nutrients',
    color: '#ffa502',
    organs: ['stomach', 'intestines', 'liver', 'pancreas'],
    visible: true,
    opacity: 1.0
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    description: 'Facilitates breathing and gas exchange',
    color: '#2ed573',
    organs: ['lungs', 'trachea', 'bronchi', 'diaphragm'],
    visible: true,
    opacity: 1.0
  }
];

// Create system color mapping
export const SYSTEM_COLORS = SYSTEMS.reduce((acc, system) => {
  acc[system.id] = system.color;
  return acc;
}, {} as Record<string, string>);

// Create system-to-organs mapping
export const SYSTEM_TO_ORGANS_MAP = SYSTEMS.reduce((acc, system) => {
  acc[system.id] = system.organs;
  return acc;
}, {} as Record<string, string[]>);

// System IDs for quick toggling (1-6 keys)
export const SYSTEM_IDS = ['skeletal', 'muscular', 'nervous', 'circulatory', 'digestive', 'respiratory'];

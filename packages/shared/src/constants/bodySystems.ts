import { BodySystem, SystemId } from '../types/system.types';

/**
 * Body systems data with colors and organ associations
 */
export const BODY_SYSTEMS: BodySystem[] = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    description: 'Provides structure, protection, and support for the body',
    color: '#e0e0e0',
    modelPath: '/models/systems/skeletal.glb',
    organs: ['skull', 'spine', 'ribs', 'arms', 'legs', 'pelvis']
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    description: 'Enables movement and maintains posture',
    color: '#ff6b6b',
    modelPath: '/models/systems/muscular.glb',
    organs: ['biceps', 'triceps', 'quadriceps', 'hamstrings', 'abdominals']
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'Controls and coordinates body activities',
    color: '#ffd93d',
    modelPath: '/models/systems/nervous.glb',
    organs: ['brain', 'spinal-cord', 'nerves']
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    description: 'Transports blood, nutrients, and oxygen',
    color: '#ff4757',
    modelPath: '/models/systems/circulatory.glb',
    organs: ['heart', 'arteries', 'veins', 'capillaries']
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    description: 'Breaks down food and absorbs nutrients',
    color: '#ffa502',
    modelPath: '/models/systems/digestive.glb',
    organs: ['stomach', 'intestines', 'liver', 'pancreas']
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    description: 'Facilitates breathing and gas exchange',
    color: '#2ed573',
    modelPath: '/models/systems/respiratory.glb',
    organs: ['lungs', 'trachea', 'bronchi', 'diaphragm']
  },
  {
    id: 'endocrine',
    name: 'Endocrine System',
    description: 'Produces hormones for body regulation',
    color: '#1e90ff',
    modelPath: '/models/systems/endocrine.glb',
    organs: ['pituitary', 'thyroid', 'adrenal', 'pancreas']
  },
  {
    id: 'lymphatic',
    name: 'Lymphatic/Immune System',
    description: 'Defends against infection and disease',
    color: '#9b59b6',
    modelPath: '/models/systems/lymphatic.glb',
    organs: ['lymph-nodes', 'spleen', 'thymus']
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    description: 'Filters blood and removes waste',
    color: '#00cec9',
    modelPath: '/models/systems/urinary.glb',
    organs: ['kidneys', 'bladder', 'ureters', 'urethra']
  },
  {
    id: 'reproductive',
    name: 'Reproductive System',
    description: 'Enables reproduction',
    color: '#fd79a8',
    modelPath: '/models/systems/reproductive.glb',
    organs: ['testes', 'ovaries', 'uterus', 'prostate']
  }
];

/**
 * System colors mapped by ID
 */
export const SYSTEM_COLORS: Record<SystemId, string> = BODY_SYSTEMS.reduce(
  (acc, system) => ({ ...acc, [system.id]: system.color }),
  {} as Record<SystemId, string>
);

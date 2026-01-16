import { Organ } from '../types/organ.types';

/**
 * Comprehensive organs data with medical information
 */
export const ORGANS_DATA: Organ[] = [
  {
    id: 'heart',
    name: 'Heart',
    system: 'circulatory',
    location: 'chest cavity, slightly left of center',
    function: 'pumps blood throughout the body',
    position: { x: -0.1, y: 1.2, z: 0.1 },
    modelPath: '/models/organs/heart.glb',
    info: {
      description: 'The heart is a muscular organ that pumps blood through the blood vessels of the circulatory system.',
      size: 'fist-sized',
      weight: '250-350 grams',
      facts: [
        'Beats approximately 100,000 times per day',
        'Pumps about 2,000 gallons of blood daily',
        'Has four chambers: left and right atria, left and right ventricles',
        'Can continue beating even when disconnected from the body'
      ]
    },
    relatedOrgans: ['lungs', 'arteries', 'veins', 'brain']
  },
  {
    id: 'lungs',
    name: 'Lungs',
    system: 'respiratory',
    location: 'chest cavity, on either side of the heart',
    function: 'facilitate gas exchange (oxygen and carbon dioxide)',
    position: { x: 0, y: 1.3, z: 0.2 },
    modelPath: '/models/organs/lungs.glb',
    info: {
      description: 'The lungs are the primary organs of the respiratory system, responsible for gas exchange.',
      size: 'about the size of a football',
      weight: '1-1.3 kg combined',
      facts: [
        'Contain approximately 300-500 million alveoli',
        'Breathe about 20,000 times per day',
        'Right lung is larger than the left lung',
        'Can float on water due to air content'
      ]
    },
    relatedOrgans: ['heart', 'trachea', 'diaphragm', 'bronchi']
  },
  {
    id: 'brain',
    name: 'Brain',
    system: 'nervous',
    location: 'skull, protected by the cranium',
    function: 'controls and coordinates body activities',
    position: { x: 0, y: 1.6, z: 0.1 },
    modelPath: '/models/organs/brain.glb',
    info: {
      description: 'The brain is the central organ of the nervous system, controlling all body functions.',
      size: 'about the size of a large grapefruit',
      weight: '1.3-1.4 kg',
      facts: [
        'Contains approximately 86 billion neurons',
        'Uses 20% of the body\'s energy',
        'Generates about 70,000 thoughts per day',
        'Is 75% water'
      ]
    },
    relatedOrgans: ['spinal-cord', 'nerves', 'heart', 'eyes']
  },
  {
    id: 'liver',
    name: 'Liver',
    system: 'digestive',
    location: 'upper right abdomen, below the diaphragm',
    function: 'detoxifies blood, produces bile, stores nutrients',
    position: { x: 0.3, y: 1.0, z: 0.1 },
    modelPath: '/models/organs/liver.glb',
    info: {
      description: 'The liver is the largest internal organ, performing over 500 vital functions.',
      size: 'about the size of a football',
      weight: '1.4-1.6 kg',
      facts: [
        'Can regenerate itself after damage',
        'Filters about 1.5 liters of blood per minute',
        'Produces about 1 liter of bile daily',
        'Stores vitamins A, D, E, and K'
      ]
    },
    relatedOrgans: ['stomach', 'intestines', 'pancreas', 'gallbladder']
  },
  {
    id: 'stomach',
    name: 'Stomach',
    system: 'digestive',
    location: 'upper left abdomen',
    function: 'breaks down food using acid and enzymes',
    position: { x: -0.2, y: 1.0, z: 0.1 },
    modelPath: '/models/organs/stomach.glb',
    info: {
      description: 'The stomach is a muscular organ that receives food from the esophagus and begins digestion.',
      size: 'about the size of a fist when empty',
      weight: '1-1.5 kg',
      facts: [
        'Can expand to hold about 1 liter of food',
        'Produces about 2-3 liters of gastric juice daily',
        'Has a pH of about 1.5-3.5 (very acidic)',
        'Can digest itself if the protective mucus layer is damaged'
      ]
    },
    relatedOrgans: ['esophagus', 'intestines', 'liver', 'pancreas']
  },
  {
    id: 'kidneys',
    name: 'Kidneys',
    system: 'urinary',
    location: 'lower back, one on each side of the spine',
    function: 'filter blood and produce urine',
    position: { x: 0, y: 0.8, z: -0.2 },
    modelPath: '/models/organs/kidneys.glb',
    info: {
      description: 'The kidneys filter waste products from the blood and produce urine.',
      size: 'about the size of a fist',
      weight: '120-150 grams each',
      facts: [
        'Filter about 180 liters of blood daily',
        'Produce about 1-2 liters of urine per day',
        'Can function with only one kidney',
        'Regulate blood pressure and red blood cell production'
      ]
    },
    relatedOrgans: ['bladder', 'ureters', 'heart', 'adrenal-glands']
  },
  {
    id: 'intestines',
    name: 'Intestines',
    system: 'digestive',
    location: 'abdominal cavity',
    function: 'absorb nutrients and water from digested food',
    position: { x: 0, y: 0.9, z: 0 },
    modelPath: '/models/organs/intestines.glb',
    info: {
      description: 'The intestines consist of the small and large intestine, responsible for nutrient absorption.',
      size: 'about 6-7 meters long combined',
      weight: '2-3 kg',
      facts: [
        'Small intestine is about 6 meters long',
        'Large intestine is about 1.5 meters long',
        'Contains trillions of beneficial bacteria',
        'Absorbs about 90% of nutrients from food'
      ]
    },
    relatedOrgans: ['stomach', 'liver', 'pancreas', 'rectum']
  },
  {
    id: 'pancreas',
    name: 'Pancreas',
    system: 'endocrine',
    location: 'behind the stomach, in the upper abdomen',
    function: 'produces insulin and digestive enzymes',
    position: { x: 0.1, y: 1.0, z: -0.1 },
    modelPath: '/models/organs/pancreas.glb',
    info: {
      description: 'The pancreas is both an endocrine and digestive gland.',
      size: 'about 6 inches long',
      weight: '70-100 grams',
      facts: [
        'Produces insulin to regulate blood sugar',
        'Produces about 1.5 liters of digestive enzymes daily',
        'Has both endocrine and exocrine functions',
        'Can function with only 10% of its tissue'
      ]
    },
    relatedOrgans: ['stomach', 'liver', 'intestines', 'spleen']
  },
  {
    id: 'spleen',
    name: 'Spleen',
    system: 'lymphatic',
    location: 'upper left abdomen, behind the stomach',
    function: 'filters blood, stores immune cells',
    position: { x: -0.25, y: 1.0, z: -0.15 },
    modelPath: '/models/organs/spleen.glb',
    info: {
      description: 'The spleen is part of the lymphatic system and immune system.',
      size: 'about the size of a fist',
      weight: '150-200 grams',
      facts: [
        'Filters old and damaged red blood cells',
        'Stores white blood cells and platelets',
        'Can be removed without major health issues',
        'Helps fight certain types of bacteria'
      ]
    },
    relatedOrgans: ['stomach', 'pancreas', 'kidneys', 'liver']
  },
  {
    id: 'gallbladder',
    name: 'Gallbladder',
    system: 'digestive',
    location: 'under the liver, right side of abdomen',
    function: 'stores and concentrates bile',
    position: { x: 0.35, y: 0.95, z: 0.05 },
    modelPath: '/models/organs/gallbladder.glb',
    info: {
      description: 'The gallbladder stores bile produced by the liver.',
      size: 'about 3-4 inches long',
      weight: '30-50 grams',
      facts: [
        'Stores about 50 ml of bile',
        'Releases bile when fat enters the small intestine',
        'Can be removed without major digestive issues',
        'Can develop gallstones from bile buildup'
      ]
    },
    relatedOrgans: ['liver', 'intestines', 'pancreas', 'stomach']
  }
];

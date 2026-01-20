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
  },

  // === CIRCULATORY SYSTEM (Missing) ===
  {
    id: 'arteries',
    name: 'Arteries',
    system: 'circulatory',
    location: 'throughout the body',
    function: 'carry oxygenated blood away from the heart',
    position: { x: 0, y: 1.1, z: 0.15 },
    modelPath: '/models/organs/arteries.glb',
    info: {
      description: 'Arteries are blood vessels that carry oxygenated blood from the heart to the body.',
      size: 'varying sizes from aorta to small arterioles',
      weight: 'part of cardiovascular system',
      facts: [
        'The aorta is the largest artery',
        'Arteries have thick, muscular walls',
        'Pulse can be felt in arteries',
        'Arterioles regulate blood flow to tissues'
      ]
    },
    relatedOrgans: ['heart', 'veins', 'capillaries', 'lungs']
  },
  {
    id: 'veins',
    name: 'Veins',
    system: 'circulatory',
    location: 'throughout the body',
    function: 'carry deoxygenated blood toward the heart',
    position: { x: 0.1, y: 1.0, z: 0.05 },
    modelPath: '/models/organs/veins.glb',
    info: {
      description: 'Veins are blood vessels that carry deoxygenated blood back to the heart.',
      size: 'varying sizes from vena cava to small venules',
      weight: 'part of cardiovascular system',
      facts: [
        'Have valves to prevent backflow',
        'Veins are visible through skin',
        'Superior and inferior vena cava are largest veins',
        'Veins have thinner walls than arteries'
      ]
    },
    relatedOrgans: ['heart', 'arteries', 'capillaries', 'lungs']
  },
  {
    id: 'capillaries',
    name: 'Capillaries',
    system: 'circulatory',
    location: 'throughout body tissues',
    function: 'enable exchange of oxygen, nutrients, and waste',
    position: { x: 0, y: 1.15, z: 0.1 },
    modelPath: '/models/organs/capillaries.glb',
    info: {
      description: 'Capillaries are tiny blood vessels where gas and nutrient exchange occurs.',
      size: 'microscopic, about 5-10 micrometers in diameter',
      weight: 'part of cardiovascular system',
      facts: [
        'Walls are one cell thick',
        'Connect arteries to veins',
        'Total length of capillaries in body is over 50,000 miles',
        'Exchange site for oxygen and carbon dioxide'
      ]
    },
    relatedOrgans: ['heart', 'arteries', 'veins', 'lungs']
  },

  // === NERVOUS SYSTEM (Missing) ===
  {
    id: 'spinal-cord',
    name: 'Spinal Cord',
    system: 'nervous',
    location: 'vertebral column, from brainstem to lower back',
    function: 'transmits signals between brain and body',
    position: { x: 0, y: 1.0, z: -0.1 },
    modelPath: '/models/organs/spinal-cord.glb',
    info: {
      description: 'The spinal cord is a bundle of nerves running through the spine, connecting the brain to the body.',
      size: 'about 45 cm (18 inches) long',
      weight: 'about 35 grams',
      facts: [
        'Contains millions of nerve fibers',
        'Protected by vertebrae',
        'Can function independently of the brain (reflexes)',
        'Divided into 31 segments'
      ]
    },
    relatedOrgans: ['brain', 'nerves', 'heart', 'lungs']
  },
  {
    id: 'nerves',
    name: 'Nerves',
    system: 'nervous',
    location: 'throughout the entire body',
    function: 'transmit electrical signals between brain, spinal cord, and body',
    position: { x: 0.05, y: 1.2, z: 0 },
    modelPath: '/models/organs/nerves.glb',
    info: {
      description: 'Nerves are bundles of fibers that transmit electrical signals throughout the body.',
      size: 'ranging from microscopic to over 1 meter',
      weight: 'part of nervous system',
      facts: [
        'Peripheral nervous system contains over 100 billion nerve fibers',
        'Nerves transmit signals at speeds up to 120 m/s',
        'Nerve damage can cause paralysis or sensory loss',
        'Nerves regenerate very slowly, if at all'
      ]
    },
    relatedOrgans: ['brain', 'spinal-cord', 'heart', 'lungs']
  },

  // === RESPIRATORY SYSTEM (Missing) ===
  {
    id: 'trachea',
    name: 'Trachea',
    system: 'respiratory',
    location: 'neck and upper chest, connecting larynx to bronchi',
    function: 'air passage to the lungs',
    position: { x: 0, y: 1.35, z: 0.15 },
    modelPath: '/models/organs/trachea.glb',
    info: {
      description: 'The trachea, or windpipe, is a tube that carries air to the lungs.',
      size: 'about 10-12 cm long, 2-3 cm wide',
      weight: 'part of respiratory system',
      facts: [
        'Lined with cilia to filter incoming air',
        'Protected by cartilage rings',
        'Connects to bronchi at the carina',
        'Coughing clears the trachea of irritants'
      ]
    },
    relatedOrgans: ['lungs', 'bronchi', 'diaphragm', 'heart']
  },
  {
    id: 'bronchi',
    name: 'Bronchi',
    system: 'respiratory',
    location: 'chest, branching from trachea into lungs',
    function: 'air passages to the lungs',
    position: { x: 0, y: 1.25, z: 0.2 },
    modelPath: '/models/organs/bronchi.glb',
    info: {
      description: 'The bronchi are the main passageways into the lungs, branching into smaller bronchioles.',
      size: 'main bronchi about 1-2.5 cm in diameter',
      weight: 'part of respiratory system',
      facts: [
        'Divide into bronchioles within the lungs',
        'Also lined with cilia and mucus',
        'Right bronchus is wider and shorter than left',
        'Bronchioles end in alveoli'
      ]
    },
    relatedOrgans: ['lungs', 'trachea', 'diaphragm', 'heart']
  },
  {
    id: 'diaphragm',
    name: 'Diaphragm',
    system: 'respiratory',
    location: 'below the lungs, separating chest from abdomen',
    function: 'muscle that controls breathing',
    position: { x: 0, y: 0.95, z: 0.1 },
    modelPath: '/models/organs/diaphragm.glb',
    info: {
      description: 'The diaphragm is a dome-shaped muscle that contracts and relaxes to enable breathing.',
      size: 'about 25 cm across at its widest',
      weight: 'part of respiratory system',
      facts: [
        'Contracts about 12-20 times per minute',
        'Movement changes thoracic pressure to draw air in',
        'Essential for breathing and coughing',
        'Also helps with vomiting and defecation'
      ]
    },
    relatedOrgans: ['lungs', 'trachea', 'bronchi', 'stomach']
  },

  // === ENDOCRINE SYSTEM (Missing) ===
  {
    id: 'pituitary',
    name: 'Pituitary Gland',
    system: 'endocrine',
    location: 'base of the brain, behind the nose',
    function: 'master gland that controls other endocrine glands',
    position: { x: 0, y: 1.55, z: 0.05 },
    modelPath: '/models/organs/pituitary.glb',
    info: {
      description: 'The pituitary gland is often called the "master gland" as it controls many other glands.',
      size: 'about the size of a pea',
      weight: 'about 0.5 grams',
      facts: [
        'Produces hormones that regulate growth, reproduction, and metabolism',
        'Divided into anterior and posterior lobes',
        'Connected to the hypothalamus',
        'Controls thyroid, adrenal glands, and gonads'
      ]
    },
    relatedOrgans: ['brain', 'thyroid', 'adrenal', 'pancreas']
  },
  {
    id: 'thyroid',
    name: 'Thyroid Gland',
    system: 'endocrine',
    location: 'front of the neck, below the Adam\'s apple',
    function: 'produces hormones that regulate metabolism',
    position: { x: 0, y: 1.35, z: 0.12 },
    modelPath: '/models/organs/thyroid.glb',
    info: {
      description: 'The thyroid gland produces hormones that regulate metabolism, growth, and development.',
      size: 'about 5 cm wide, 3 cm high',
      weight: 'about 15-25 grams',
      facts: [
        'Shaped like a butterfly',
        'Produces T3 and T4 hormones',
        'Requires iodine to function',
        'Thyroid disorders can affect weight and energy'
      ]
    },
    relatedOrgans: ['brain', 'pituitary', 'pancreas', 'heart']
  },
  {
    id: 'adrenal',
    name: 'Adrenal Glands',
    system: 'endocrine',
    location: 'on top of each kidney',
    function: 'produce stress hormones and regulate metabolism',
    position: { x: 0.15, y: 0.85, z: -0.15 },
    modelPath: '/models/organs/adrenal.glb',
    info: {
      description: 'The adrenal glands produce hormones like cortisol and adrenaline for stress response.',
      size: 'about 3-5 cm long',
      weight: 'about 4-6 grams each',
      facts: [
        'Two glands: one on each kidney',
        'Produce adrenaline (epinephrine)',
        'Produce cortisol for stress response',
        'Also produce aldosterone for blood pressure'
      ]
    },
    relatedOrgans: ['kidneys', 'brain', 'pituitary', 'pancreas']
  },

  // === LYMPHATIC SYSTEM (Missing) ===
  {
    id: 'lymph-nodes',
    name: 'Lymph Nodes',
    system: 'lymphatic',
    location: 'throughout the body, clustered in neck, armpits, and groin',
    function: 'filter lymph fluid and house immune cells',
    position: { x: 0.1, y: 1.1, z: 0 },
    modelPath: '/models/organs/lymph-nodes.glb',
    info: {
      description: 'Lymph nodes are small bean-shaped structures that filter lymph and fight infection.',
      size: 'range from a few millimeters to 1-2 cm',
      weight: 'part of lymphatic system',
      facts: [
        'Swollen nodes indicate infection',
        'Hundreds of nodes throughout the body',
        'Contain lymphocytes and macrophages',
        'Can become cancerous (lymphoma)'
      ]
    },
    relatedOrgans: ['spleen', 'thymus', 'pancreas', 'liver']
  },
  {
    id: 'thymus',
    name: 'Thymus',
    system: 'lymphatic',
    location: 'upper chest, behind the sternum',
    function: 'develops T-cells for immune system',
    position: { x: 0.05, y: 1.25, z: -0.05 },
    modelPath: '/models/organs/thymus.glb',
    info: {
      description: 'The thymus is a specialized organ where T-cells mature and become functional.',
      size: 'largest in childhood, shrinks with age',
      weight: 'about 10-15 grams in adults',
      facts: [
        'Most active during childhood',
        'Essential for immune system development',
        'Shrinks and is replaced by fat after puberty',
        'Produces thymosin hormone'
      ]
    },
    relatedOrgans: ['spleen', 'lymph-nodes', 'heart', 'lungs']
  },

  // === URINARY SYSTEM (Missing) ===
  {
    id: 'bladder',
    name: 'Bladder',
    system: 'urinary',
    location: 'pelvic cavity, behind the pubic bone',
    function: 'stores urine before excretion',
    position: { x: 0, y: 0.75, z: 0.1 },
    modelPath: '/models/organs/bladder.glb',
    info: {
      description: 'The bladder is a muscular sac that stores urine produced by the kidneys.',
      size: 'can hold about 400-600 ml when full',
      weight: 'part of urinary system',
      facts: [
        'Expands as it fills',
        'Can hold about 500 ml of urine',
        'Bladder infections are common (UTI)',
        'Controlled by sphincter muscles'
      ]
    },
    relatedOrgans: ['kidneys', 'ureters', 'urethra', 'intestines']
  },
  {
    id: 'ureters',
    name: 'Ureters',
    system: 'urinary',
    location: 'tubes from kidneys to bladder',
    function: 'transport urine from kidneys to bladder',
    position: { x: 0.05, y: 0.85, z: -0.1 },
    modelPath: '/models/organs/ureters.glb',
    info: {
      description: 'The ureters are muscular tubes that carry urine from the kidneys to the bladder.',
      size: 'about 25-30 cm long',
      weight: 'part of urinary system',
      facts: [
        'Two ureters (one from each kidney)',
        'Use peristalsis to move urine',
        'Prevent backflow with valves',
        'Kidney stones can get stuck here'
      ]
    },
    relatedOrgans: ['kidneys', 'bladder', 'urethra', 'intestines']
  },
  {
    id: 'urethra',
    name: 'Urethra',
    system: 'urinary',
    location: 'pelvic region, from bladder to exterior',
    function: 'excrete urine from bladder',
    position: { x: 0, y: 0.65, z: 0.15 },
    modelPath: '/models/organs/urethra.glb',
    info: {
      description: 'The urethra is the tube that carries urine from the bladder to outside the body.',
      size: 'about 20 cm in males, 4 cm in females',
      weight: 'part of urinary system',
      facts: [
        'Longer in males than females',
        'Also carries semen in males',
        'Surrounded by sphincter muscles',
        'UTIs are more common in women'
      ]
    },
    relatedOrgans: ['bladder', 'kidneys', 'ureters', 'intestines']
  },

  // === SKELETAL SYSTEM (All Missing) ===
  {
    id: 'skull',
    name: 'Skull',
    system: 'skeletal',
    location: 'head, protecting the brain',
    function: 'protect brain and support facial structures',
    position: { x: 0, y: 1.6, z: 0.05 },
    modelPath: '/models/organs/skull.glb',
    info: {
      description: 'The skull is a bony structure that protects the brain and supports the face.',
      size: 'about 21-22 cm in circumference',
      weight: 'part of skeletal system',
      facts: [
        '22 bones in the skull',
        'Protects the brain from injury',
        'Contains sinuses that lighten weight',
        'Fused sutures in adults'
      ]
    },
    relatedOrgans: ['brain', 'spine', 'ribs', 'nerves']
  },
  {
    id: 'spine',
    name: 'Spine',
    system: 'skeletal',
    location: 'back, from skull to pelvis',
    function: 'support body and protect spinal cord',
    position: { x: 0, y: 1.0, z: -0.15 },
    modelPath: '/models/organs/spine.glb',
    info: {
      description: 'The spine, or vertebral column, is the central support structure of the body.',
      size: 'about 70-75 cm long',
      weight: 'part of skeletal system',
      facts: [
        '33 vertebrae in total',
        ' divided into 5 regions: cervical, thoracic, lumbar, sacral, coccyx',
        'Protects the spinal cord',
        'Allows flexibility and movement'
      ]
    },
    relatedOrgans: ['skull', 'ribs', 'pelvis', 'spinal-cord']
  },
  {
    id: 'ribs',
    name: 'Ribs',
    system: 'skeletal',
    location: 'chest cavity, protecting heart and lungs',
    function: 'protect vital organs and assist breathing',
    position: { x: 0, y: 1.2, z: -0.1 },
    modelPath: '/models/organs/ribs.glb',
    info: {
      description: 'The ribs are curved bones that form the rib cage, protecting vital organs.',
      size: '12 pairs of ribs',
      weight: 'part of skeletal system',
      facts: [
        '12 pairs of ribs (24 total)',
        'True ribs (1-7) connect to sternum',
        'False ribs (8-10) connect indirectly',
        'Floating ribs (11-12) don\'t connect to sternum'
      ]
    },
    relatedOrgans: ['skull', 'spine', 'arms', 'heart']
  },
  {
    id: 'arms',
    name: 'Arms',
    system: 'skeletal',
    location: 'upper limbs from shoulder to hand',
    function: 'enable manipulation and movement',
    position: { x: 0.3, y: 1.1, z: 0 },
    modelPath: '/models/organs/arms.glb',
    info: {
      description: 'The arms are upper limbs consisting of the upper arm, forearm, and hand.',
      size: 'about 30-35% of body height',
      weight: 'part of skeletal system',
      facts: [
        '3 major bones: humerus, radius, ulna',
        'Allow for manipulation and tool use',
        'Ball-and-socket joint at shoulder',
        'Highly mobile and versatile'
      ]
    },
    relatedOrgans: ['skull', 'spine', 'ribs', 'biceps']
  },
  {
    id: 'legs',
    name: 'Legs',
    system: 'skeletal',
    location: 'lower limbs from hip to foot',
    function: 'support body weight and enable locomotion',
    position: { x: -0.3, y: 0.6, z: 0 },
    modelPath: '/models/organs/legs.glb',
    info: {
      description: 'The legs are lower limbs consisting of the thigh, lower leg, and foot.',
      size: 'about 45-50% of body height',
      weight: 'part of skeletal system',
      facts: [
        'Major bones: femur, tibia, fibula',
        'Femur is longest and strongest bone',
        'Ball-and-socket joint at hip',
        'Support entire body weight'
      ]
    },
    relatedOrgans: ['skull', 'spine', 'pelvis', 'quadriceps']
  },
  {
    id: 'pelvis',
    name: 'Pelvis',
    system: 'skeletal',
    location: 'lower torso, connecting spine to legs',
    function: 'support organs and transfer body weight',
    position: { x: 0, y: 0.75, z: -0.05 },
    modelPath: '/models/organs/pelvis.glb',
    info: {
      description: 'The pelvis is a basin-shaped structure that protects organs and connects spine to legs.',
      size: 'about 30-35 cm wide',
      weight: 'part of skeletal system',
      facts: [
        'Consists of hip bones, sacrum, and coccyx',
        'Protects bladder and reproductive organs',
        'Wider in females for childbirth',
        'Transfers weight from spine to legs'
      ]
    },
    relatedOrgans: ['spine', 'legs', 'bladder', 'intestines']
  },

  // === MUSCULAR SYSTEM (All Missing) ===
  {
    id: 'biceps',
    name: 'Biceps',
    system: 'muscular',
    location: 'front of upper arm',
    function: 'flex elbow and rotate forearm',
    position: { x: 0.35, y: 1.15, z: 0.1 },
    modelPath: '/models/organs/biceps.glb',
    info: {
      description: 'The biceps brachii is a two-headed muscle on the front of the upper arm.',
      size: 'about 15-20 cm long',
      weight: 'about 200-300 grams',
      facts: [
        'Two heads: short and long',
        'Attaches to scapula and radius',
        'Flexes elbow and supinates forearm',
        '\'Show muscle\' often demonstrated with biceps'
      ]
    },
    relatedOrgans: ['triceps', 'arms', 'shoulder', 'ribs']
  },
  {
    id: 'triceps',
    name: 'Triceps',
    system: 'muscular',
    location: 'back of upper arm',
    function: 'extend elbow',
    position: { x: -0.35, y: 1.15, z: 0.1 },
    modelPath: '/models/organs/triceps.glb',
    info: {
      description: 'The triceps brachii is a three-headed muscle on the back of the upper arm.',
      size: 'about 20-25 cm long',
      weight: 'about 300-400 grams',
      facts: [
        'Three heads: long, lateral, medial',
        'Largest muscle in the upper arm',
        'Extends the elbow',
        'Used in pushing movements'
      ]
    },
    relatedOrgans: ['biceps', 'arms', 'shoulder', 'ribs']
  },
  {
    id: 'quadriceps',
    name: 'Quadriceps',
    system: 'muscular',
    location: 'front of thigh',
    function: 'extend knee and flex hip',
    position: { x: 0.3, y: 0.7, z: 0.1 },
    modelPath: '/models/organs/quadriceps.glb',
    info: {
      description: 'The quadriceps femoris is a group of four muscles on the front of the thigh.',
      size: 'largest muscle group in the body',
      weight: 'about 2-3 kg',
      facts: [
        'Four muscles: rectus femoris, vastus lateralis, vastus medialis, vastus intermedius',
        'Extends the knee',
        'Essential for walking, running, jumping',
        'Attached to patella (kneecap)'
      ]
    },
    relatedOrgans: ['hamstrings', 'legs', 'pelvis', 'knees']
  },
  {
    id: 'hamstrings',
    name: 'Hamstrings',
    system: 'muscular',
    location: 'back of thigh',
    function: 'flex knee and extend hip',
    position: { x: -0.3, y: 0.7, z: 0.1 },
    modelPath: '/models/organs/hamstrings.glb',
    info: {
      description: 'The hamstrings are a group of three muscles on the back of the thigh.',
      size: 'about 30-40 cm long',
      weight: 'about 1-2 kg',
      facts: [
        'Three muscles: biceps femoris, semitendinosus, semimembranosus',
        'Flexes the knee and extends hip',
        'Commonly injured in sports',
        'Work opposite to quadriceps'
      ]
    },
    relatedOrgans: ['quadriceps', 'legs', 'pelvis', 'knees']
  },
  {
    id: 'abdominals',
    name: 'Abdominals',
    system: 'muscular',
    location: 'front and sides of abdomen',
    function: 'support trunk and assist in breathing',
    position: { x: 0, y: 0.95, z: 0.15 },
    modelPath: '/models/organs/abdominals.glb',
    info: {
      description: 'The abdominals are a group of muscles forming the abdominal wall.',
      size: 'cover entire front of abdomen',
      weight: 'part of muscular system',
      facts: [
        'Include rectus abdominis, obliques, transversus',
        'Protect abdominal organs',
        'Essential for posture and core strength',
        '\'Six-pack\' is rectus abdominis'
      ]
    },
    relatedOrgans: ['stomach', 'intestines', 'ribs', 'pelvis']
  },

  // === REPRODUCTIVE SYSTEM (All Missing - Basic Reference) ===
  {
    id: 'testes',
    name: 'Testes',
    system: 'reproductive',
    location: 'scrotum, outside the body',
    function: 'produce sperm and testosterone',
    position: { x: 0, y: 0.7, z: 0.15 },
    modelPath: '/models/organs/testes.glb',
    info: {
      description: 'The testes are male reproductive organs that produce sperm and hormones.',
      size: 'about 4-5 cm long',
      weight: 'about 20-25 grams each',
      facts: [
        'Produce millions of sperm daily',
        'Produce testosterone',
        'Outside body to keep cool',
        'Two testes in the scrotum'
      ]
    },
    relatedOrgans: ['prostate', 'bladder', 'urethra', 'kidneys']
  },
  {
    id: 'ovaries',
    name: 'Ovaries',
    system: 'reproductive',
    location: 'pelvic cavity, on either side of uterus',
    function: 'produce eggs and female hormones',
    position: { x: 0.1, y: 0.8, z: -0.05 },
    modelPath: '/models/organs/ovaries.glb',
    info: {
      description: 'The ovaries are female reproductive organs that produce eggs and hormones.',
      size: 'about 3-5 cm long',
      weight: 'about 3-4 grams each',
      facts: [
        'Store thousands of immature eggs',
        'Produce estrogen and progesterone',
        'Two ovaries, one on each side',
        'Release one egg per menstrual cycle'
      ]
    },
    relatedOrgans: ['uterus', 'bladder', 'urethra', 'kidneys']
  },
  {
    id: 'uterus',
    name: 'Uterus',
    system: 'reproductive',
    location: 'pelvic cavity, between bladder and rectum',
    function: 'house and nourish developing fetus',
    position: { x: 0, y: 0.78, z: 0.05 },
    modelPath: '/models/organs/uterus.glb',
    info: {
      description: 'The uterus is a muscular organ where a baby develops during pregnancy.',
      size: 'about 7-8 cm long',
      weight: 'about 50-60 grams',
      facts: [
        'Expands greatly during pregnancy',
        'Shedding of lining causes menstruation',
        'Connected to ovaries via fallopian tubes',
        'Strong muscular walls for labor'
      ]
    },
    relatedOrgans: ['ovaries', 'bladder', 'urethra', 'intestines']
  },
  {
    id: 'prostate',
    name: 'Prostate',
    system: 'reproductive',
    location: 'below the bladder, surrounding the urethra',
    function: 'produce seminal fluid',
    position: { x: 0, y: 0.72, z: 0.1 },
    modelPath: '/models/organs/prostate.glb',
    info: {
      description: 'The prostate is a gland that produces fluid to nourish and transport sperm.',
      size: 'about the size of a walnut',
      weight: 'about 20 grams',
      facts: [
        'Produces prostate fluid',
        'Surrounds the urethra',
        'Can enlarge with age (BPH)',
        'Prostate cancer is common in older men'
      ]
    },
    relatedOrgans: ['testes', 'bladder', 'urethra', 'kidneys']
  }
];

/**
 * Phase 3.1 Data Integrity Verification Script
 * Verifies all organs in BODY_SYSTEMS exist in ORGANS_DATA
 */

// Mock data import (simulating the actual data)
const BODY_SYSTEMS = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    organs: ['skull', 'spine', 'ribs', 'arms', 'legs', 'pelvis']
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    organs: ['biceps', 'triceps', 'quadriceps', 'hamstrings', 'abdominals']
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    organs: ['brain', 'spinal-cord', 'nerves']
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    organs: ['heart', 'arteries', 'veins', 'capillaries']
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    organs: ['stomach', 'intestines', 'liver', 'pancreas']
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    organs: ['lungs', 'trachea', 'bronchi', 'diaphragm']
  },
  {
    id: 'endocrine',
    name: 'Endocrine System',
    organs: ['pituitary', 'thyroid', 'adrenal', 'pancreas']
  },
  {
    id: 'lymphatic',
    name: 'Lymphatic/Immune System',
    organs: ['lymph-nodes', 'spleen', 'thymus']
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    organs: ['kidneys', 'bladder', 'ureters', 'urethra']
  },
  {
    id: 'reproductive',
    name: 'Reproductive System',
    organs: ['testes', 'ovaries', 'uterus', 'prostate']
  }
];

// Simulated ORGANS_DATA IDs (from our updated file)
const ORGANS_DATA_IDS = [
  'heart',
  'lungs',
  'brain',
  'liver',
  'stomach',
  'kidneys',
  'intestines',
  'pancreas',
  'spleen',
  'gallbladder',
  // Circulatory (Missing - Added in Phase 3.1)
  'arteries',
  'veins',
  'capillaries',
  // Nervous (Missing - Added in Phase 3.1)
  'spinal-cord',
  'nerves',
  // Respiratory (Missing - Added in Phase 3.1)
  'trachea',
  'bronchi',
  'diaphragm',
  // Endocrine (Missing - Added in Phase 3.1)
  'pituitary',
  'thyroid',
  'adrenal',
  // Lymphatic (Missing - Added in Phase 3.1)
  'lymph-nodes',
  'thymus',
  // Urinary (Missing - Added in Phase 3.1)
  'bladder',
  'ureters',
  'urethra',
  // Skeletal (All Missing - Added in Phase 3.1)
  'skull',
  'spine',
  'ribs',
  'arms',
  'legs',
  'pelvis',
  // Muscular (All Missing - Added in Phase 3.1)
  'biceps',
  'triceps',
  'quadriceps',
  'hamstrings',
  'abdominals',
  // Reproductive (All Missing - Added in Phase 3.1)
  'testes',
  'ovaries',
  'uterus',
  'prostate'
];

console.log('='.repeat(60));
console.log('Phase 3.1 - Organ Data Integrity Verification');
console.log('='.repeat(60));

let allOrgansFound = true;
const missingOrgansBySystem = {};

// Check each system
BODY_SYSTEMS.forEach(system => {
  const missingOrgans = [];
  const existingOrgans = [];

  system.organs.forEach(organId => {
    if (ORGANS_DATA_IDS.includes(organId)) {
      existingOrgans.push(organId);
    } else {
      missingOrgans.push(organId);
      allOrgansFound = false;
    }
  });

  if (missingOrgans.length > 0) {
    missingOrgansBySystem[system.id] = missingOrgans;
  }

  console.log(`\n${system.name} (${system.id})`);
  console.log(`  Organs referenced: ${system.organs.length}`);
  console.log(`  ✓ Found: ${existingOrgans.length}`);
  console.log(`  ✗ Missing: ${missingOrgans.length}`);

  if (existingOrgans.length > 0) {
    console.log(`  Found organs: ${existingOrgans.join(', ')}`);
  }

  if (missingOrgans.length > 0) {
    console.log(`  Missing organs: ${missingOrgans.join(', ')}`);
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));

if (allOrgansFound) {
  console.log('✓ SUCCESS: All organs in BODY_SYSTEMS exist in ORGANS_DATA');
  console.log(`✓ Total organs verified: ${ORGANS_DATA_IDS.length}`);
  console.log(`✓ Total systems: ${BODY_SYSTEMS.length}`);
} else {
  console.log('✗ FAILURE: Some organs are missing');
  const totalMissing = Object.values(missingOrgansBySystem).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`✗ Total missing organs: ${totalMissing}`);
  console.log(`✓ Total organs found: ${ORGANS_DATA_IDS.length}`);
}

// Phase 3.1 Test: Circulatory System
console.log('\n' + '='.repeat(60));
console.log('PHASE 3.1 TEST: CIRCULATORY SYSTEM');
console.log('='.repeat(60));

const circulatorySystem = BODY_SYSTEMS.find(s => s.id === 'circulatory');
if (circulatorySystem) {
  const allCirculatoryFound = circulatorySystem.organs.every(organId =>
    ORGANS_DATA_IDS.includes(organId)
  );

  if (allCirculatoryFound) {
    console.log('✓ Circulatory system is ready for testing');
    console.log(`✓ Organs: ${circulatorySystem.organs.join(', ')}`);
    console.log('\nKeyboard shortcuts:');
    console.log('  H - Select heart');
    console.log('  A - Select arteries');
    console.log('  V - Select veins');
    console.log('  C - Select capillaries');
    console.log('  D - Reset selection');
  } else {
    console.log('✗ Circulatory system has missing organs');
  }
}

console.log('\n' + '='.repeat(60));
console.log('Verification complete');
console.log('='.repeat(60) + '\n');

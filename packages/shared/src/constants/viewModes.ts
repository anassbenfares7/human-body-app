/**
 * View mode types and configurations
 */

export type ViewMode = 'macro' | 'micro' | 'nano';

export const VIEW_MODES = {
  macro: {
    name: 'Macro',
    description: 'Full body and organs',
    minDistance: 1,
    maxDistance: 10,
    cameraPosition: { x: 0, y: 1.5, z: 3 }
  },
  micro: {
    name: 'Micro',
    description: 'Cells and tissues',
    minDistance: 0.1,
    maxDistance: 2,
    cameraPosition: { x: 0, y: 0, z: 1 }
  },
  nano: {
    name: 'Nano',
    description: 'Neurons and atoms',
    minDistance: 0.01,
    maxDistance: 0.5,
    cameraPosition: { x: 0, y: 0, z: 0.2 }
  }
} as const;

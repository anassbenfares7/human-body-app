/**
 * Organ types and interfaces
 */

export interface Organ {
  id: string;
  name: string;
  system: string;
  location: string;
  function: string;
  position: { x: number; y: number; z: number };
  modelPath: string;
  info: {
    description: string;
    size: string;
    weight: string;
    facts: string[];
  };
  relatedOrgans: string[];
}

export interface OrganSelection {
  organId: string | null;
  timestamp: number;
}

export interface OrganHighlight {
  organId: string;
  color: string;
  intensity: number;
}

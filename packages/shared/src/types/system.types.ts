/**
 * Body system types and interfaces
 */

export interface BodySystem {
  id: string;
  name: string;
  description: string;
  color: string;
  modelPath: string;
  organs: string[];
}

export type SystemId =
  | 'skeletal'
  | 'muscular'
  | 'nervous'
  | 'circulatory'
  | 'digestive'
  | 'respiratory'
  | 'endocrine'
  | 'lymphatic'
  | 'urinary'
  | 'reproductive';

export interface SystemVisibility {
  systemId: SystemId;
  visible: boolean;
  opacity: number;
}

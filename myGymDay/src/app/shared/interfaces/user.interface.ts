import { Training } from './training.interface';

export interface UserProfile {
  uid: string;
  nombre: string;
  edad: number;
  sexo: string;
  trainings?: Training;
}

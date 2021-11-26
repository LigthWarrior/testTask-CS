import { Car } from '../types';

export interface CarOwner {
  id: number;
  aLastName: string;
  aFirstName: string;
  aMiddleName: string;
  aCars: Car[];
}

import { Car } from '../types';

export interface CarOwner {
  lastName: string;
  firstName: string;
  middleName: string;
  cars: Car[];
  id: number;
}

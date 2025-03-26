import { Passenger } from './passenger.model';

export interface Booking {
  referenceNumber: string;
  totalFare: number;
  passengers: Passenger[];
}

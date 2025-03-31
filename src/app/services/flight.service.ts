import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Flight } from '../models/flight.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // ✅ This makes the service available globally (no need to add to providers)
})
export class FlightService {
  private apiUrl = 'http://localhost:7002/api/Flight';  // ✅ Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  /** ✅ Fetch available flights based on From, To, and Date */
  getAvailableFlights(from: string, to: string, date: string): Observable<Flight[]> {
   // console.log('getAvailableFlights', from, to, date);
    return this.http.get<Flight[]>(`${this.apiUrl}/getFlight?from=${from}&to=${to}&date=${date}`);
  }

  /** ✅ Fetch flight details by Flight ID */
  getFlightById(flightId: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${flightId}`);
  }
    /** ✅ Add a new Flight */
   
    addFlight(flightData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/add`, flightData,{ responseType: 'text' });
    }
  
    /** ✅ Delete Flight by Code */
    deleteFlight(flightCode: string): Observable<any> {
    
        return this.http.delete(`${this.apiUrl}/del/${flightCode}`, { responseType: 'text' as 'json' });
      
      
    }
   
    updateSeats(seatUpdateData: { flightId: number; seatsToBook: number }) {
      console.log(seatUpdateData);
      return this.http.put(`${this.apiUrl}/update-seats`, seatUpdateData, { responseType: 'text' as 'json' });
    }
}

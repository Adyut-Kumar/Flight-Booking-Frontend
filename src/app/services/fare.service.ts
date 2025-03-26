import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FareService {
  private apiUrl = 'http://localhost:7003/api/Fare';  // ✅ Change this based on your backend API
  

  constructor(private http: HttpClient) {}

  /** ✅ Get fare details for a flight */
  getFareByFlightId(flightId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-fare-by-flight/${flightId}`);
  }
  addFare(fare: any): Observable<string> {
    
    return this.http.post(`${this.apiUrl}/add-fare`, fare, { responseType: 'text' });
   
  }
}

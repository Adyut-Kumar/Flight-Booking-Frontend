import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private apiUrl = 'http://localhost:7004/api/Booking';  // ✅ Update with your actual API URL

  constructor(private http: HttpClient) {}

  /** ✅ Send Booking Request */
  bookFlight(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/book`, bookingData);
  }

  getBookingByReference(referenceNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${referenceNumber}`);
  }
}

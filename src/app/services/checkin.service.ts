import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckInRequest {
  referenceNumber: string;
  passengers: string[];
}

export interface CheckInResponse {
  checkInId: string;
  referenceNumber: string;
  passengerName: string;
  seatNumber: string;
  checkInTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  private apiUrl = 'http://localhost:7005/api/CheckIn/checkin'; // ✅ Update with actual API URL
  
  constructor(private http: HttpClient) {}

  /** ✅ Perform check-in by reference number */
  checkIn(request: CheckInRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, request);
  }

  /** ✅ Get check-in details by reference number */
  getCheckInDetails(referenceNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCheckInDetails/${referenceNumber}`);
  }
}

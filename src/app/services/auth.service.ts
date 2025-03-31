import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:7006/api/Accounts';  // ✅ Replace with actual API URL

  constructor(private http: HttpClient) {}

  /** ✅ Admin Login (Directly uses credentials from Component) */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  /** ✅ Save Token in Session Storage */
  saveToken(token: string): void {
    sessionStorage.setItem('adminToken', token);
  }

  /** ✅ Retrieve Token */
  getToken(): string | null {
    return sessionStorage.getItem('adminToken');
  }
  

  /** ✅ Remove Token on Logout */
  logout(): void {
    sessionStorage.removeItem('adminToken');
  }
  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/validate`, { headers });
  }
}

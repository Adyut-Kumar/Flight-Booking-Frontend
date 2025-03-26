import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:7006/api/Accounts/login';  // ✅ Replace with actual API URL

  constructor(private http: HttpClient) {}

  /** ✅ Admin Login (Directly uses credentials from Component) */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, credentials);
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
}

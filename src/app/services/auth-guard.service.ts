import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();

    if (!token) {
      console.warn("No token found. Redirecting to login...");
      this.router.navigate(['/admin/login']);
      return of(false);
    }

    console.log("Token found in storage:", token);

    return this.authService.validateToken(token).pipe(
      map(response => {
        console.log("Token validation response:", response);

        if (response?.user) {
          return true; // ✅ Allow access if user exists
        }

        console.warn("Invalid token. Redirecting to login...");
        this.router.navigate(['/admin/login']);
        return false;
      }),
      catchError(error => {
        console.error("Token validation failed:", error);

        if (error.status === 401) {
          console.warn("Unauthorized. Redirecting to login...");
        }

        this.router.navigate(['/admin/login']);
        return of(false);
      })
    );
  }
}

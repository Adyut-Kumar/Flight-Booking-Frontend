import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

import {of,Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate():  Observable<boolean> {
    const token = this.authService.getToken() || '';
    if (!token) {
      console.log("token not fund from /login");
      //this.router.navigate(['/admin/admin-home']); // ✅ Redirect to admin home if already logged in
      return of(true);
    }
    
    console.log("Token found in storage:", token);

    return this.authService.validateToken(token).pipe(
      map(response => {
        console.log("Token validation response:", response);

        if (response?.user) {
          console.warn("User already logged in. Redirecting to admin home...");
          this.router.navigate(['/admin/admin-home']); // ✅ Redirect to home if user is already logged in
          return false;
        }

        console.log("Invalid token. Allowing access to login page.");
        return true; // ✅ Allow access if token is invalid
      }),
      catchError(error => {
        console.error("Token validation failed:", error);

        if (error.status === 401) {
          console.log("Unauthorized or invalid token. Allowing login. 401");
          // return of(true); // ✅ Allow login if token is invalid
        }

        return of(true);
      })
    );

    // this.router.navigate(['/admin/login']);
    // return true; // ✅ Allow access if no token
  }
}

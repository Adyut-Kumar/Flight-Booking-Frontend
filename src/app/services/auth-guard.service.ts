import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const token = this.authService.getToken();
    console.log('AuthGuard: Checking token for Admin Home:', token);

    if (!token) {
      this.router.navigate(['/admin/login']); // ✅ Redirect to login if no token
      return false; // ❌ Do not check again, prevent infinite loop
    }
    //check for token validation 
    console.log("validation search ....");
   
    
    return true; // ✅ Allow access if token is present
  }
}

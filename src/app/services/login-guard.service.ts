import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      this.router.navigate(['/admin/admin-home']); // ✅ Redirect to admin home if already logged in
      return false;
    }
    // this.router.navigate(['/admin/login']);
    return true; // ✅ Allow access if no token
  }
}

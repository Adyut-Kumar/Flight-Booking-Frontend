import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required!';
      return;
    }

    this.loading = true; // Show loading effect

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/admin/admin-home']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.loading = false; // Hide loading effect on error
      }
    );
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  continueAsGuest() {
    this.router.navigate(['/search-flight']);
  }

  loginAsAdmin() {
    this.router.navigate(['/admin/login']);
  }

  checkIn() {
    this.router.navigate(['/check-in']);
  }
}

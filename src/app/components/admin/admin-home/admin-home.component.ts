import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageCityComponent } from '../manage-city/manage-city.component';
import { ManageFlightComponent } from '../manage-flight/manage-flight.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageFareComponent } from '../manage-fare/manage-fare.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ManageCityComponent, ManageFlightComponent,ManageFareComponent]
})
export class AdminHomeComponent {

  constructor(private route: ActivatedRoute,
    private router: Router,) {}


  activeComponent: string = 'city'; // Track active component

  showComponent(component: string) {
    this.activeComponent = component;
  }

  logout() {
    sessionStorage.removeItem('adminToken'); // Clear token on logout
    window.location.href = '/admin/login'; // Redirect to login
  }
}

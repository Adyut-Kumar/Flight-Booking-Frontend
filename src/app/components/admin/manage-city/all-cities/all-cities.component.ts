import { Component, OnInit, inject } from '@angular/core';
import { CityService } from '../../../../services/city.service';
import { City } from '../../../../models/city.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-all-cities',
  templateUrl: './all-cities.component.html',
  styleUrls: ['./all-cities.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AllCitiesComponent implements OnInit {
  cities: City[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  private cityService = inject(CityService);

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities() {
    this.cityService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch cities.';
        console.error('Error fetching cities:', error);
        this.isLoading = false;
      }
    });
  }
}

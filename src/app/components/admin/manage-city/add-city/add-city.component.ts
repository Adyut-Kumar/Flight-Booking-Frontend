import { Component } from '@angular/core';
import { CityService } from '../../../../services/city.service';
import { City } from '../../../../models/city.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AddCityComponent {
  newCity: City = {
    cityId: 0,
    cityCode: '',
    cityName: '',
    state: '',
    airportCharge: 0,
    isActive: true
  };

  constructor(private cityService: CityService) {}

  addCity() {
    this.cityService.addCity(this.newCity).subscribe({
      next: (response) => {
        console.log('City added successfully:', response);
        alert('City added successfully!');
      },
      error: (error) => {
        console.error('Error adding city:', error);
        alert('Failed to add city.');
      }
    });
  }
}

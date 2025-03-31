import { Component } from '@angular/core';
import { CityService } from '../../../../services/city.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DeleteCityComponent {
  cityCode: string = '';

  constructor(private cityService: CityService) {}

  deleteCity() {
    if (!this.cityCode.trim()) {
      alert('Please enter a valid City Code.');
      return;
    }

    this.cityService.deleteCityByCode(this.cityCode).subscribe(
      (response) => {
        alert(`City with code ${this.cityCode} deleted successfully!`);
        const message = response?.body?.message || 'city deleted successfully.'; // ✅ Handle empty body
        // alert(message);
        this.cityCode = ''; // Clear input field after successful deletion
      },
      (error) => {
        alert(`Failed to delete city: ${error.error?.message || 'check wheather your city code is valid'}`);
      }
    );
  }
}

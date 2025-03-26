import { Component } from '@angular/core';
import { FareService } from '../../../../services/fare.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-fare',
  templateUrl: './add-fare.component.html',
  styleUrls: ['./add-fare.component.css'],
  imports:[CommonModule,FormsModule]
})
export class AddFareComponent {
  fare = {
    fareId: 0,
    flightId: 0,
    basePrice: 0,
    convenienceFee: 0
  };
  isLoading = false;
  message = '';

  constructor(private fareService: FareService) {}

  addFare() {
    if (!this.fare.flightId || this.fare.basePrice <= 0 || this.fare.convenienceFee < 0) {
      alert('Please enter valid fare details.');
      return;
    }

    this.isLoading = true;
    this.fareService.addFare(this.fare).subscribe(
      (response: string) => {
        this.message = response;
        alert(this.message);
        this.resetForm();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        alert('Error adding fare. Please try again.');
        this.isLoading = false;
      }
    );
  }

  resetForm() {
    this.fare = {
      fareId: 0,
      flightId: 0,
      basePrice: 0,
      convenienceFee: 0
    };
  }
}

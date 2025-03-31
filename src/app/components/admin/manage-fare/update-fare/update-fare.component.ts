import { Component } from '@angular/core';
import { FareService } from '../../../../services/fare.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-update-fare',
  templateUrl: './update-fare.component.html',
  styleUrls: ['./update-fare.component.css'],
  imports:[CommonModule,FormsModule]
})
export class UpdateFareComponent {
  fareData = {
    fareId: 0,
    flightId: null,
    basePrice: null,
    convenienceFee: null
  };
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private fareService: FareService) {}

  updateFare() {
    console.log("clicked");
    if (!this.fareData.flightId  || !this.fareData.basePrice || !this.fareData.convenienceFee) {
      this.errorMessage = 'All fields are required!';
      return;
    }
  
    this.isLoading = true;
    this.fareService.updateFare(this.fareData).subscribe(
      () => {
        alert('Fare Updated Successfully');
        this.isLoading = false;
        this.fareData = { fareId: 0, flightId: null, basePrice: null, convenienceFee: null };
      },
      () => {
        this.errorMessage = 'Update failed!';
        this.isLoading = false;
      }
    );
  }
}

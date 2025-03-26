import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PassengerDetailsComponent } from '../passenger-details/passenger-details.component';
import { Passenger } from '../../models/passenger.model';  // ✅ Import Passenger Model
import { BookingService } from '../../services/booking.service';  // ✅ Import BookingService 
import { Booking } from '../../models/booking.model';  // ✅ Import Booking Model
import { CheckinDetailsComponent } from './checkin-details/checkin-details.component';  // ✅ Import CheckinDetailsComponent
import { CheckinService, CheckInRequest, CheckInResponse } from '../../services/checkin.service';  // ✅ Import CheckinService

@Component({
  selector: 'app-check-in',
  standalone: true,  // ✅ Convert to standalone component
  imports: [CommonModule, FormsModule,PassengerDetailsComponent,CheckinDetailsComponent],  // ✅ Required for *ngIf and ngModel
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})

export class CheckInComponent {
  referenceNumber: string = '';
  checkInDetails: any = null;
  checkInConfirmed: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  bookingDetails: Booking | null = null;  // ✅ Update to Booking Model
  checkInResults!: CheckInResponse;  // ✅ Update to CheckInResponse Model

  constructor(private router: Router,private http: HttpClient,private bookingService: BookingService,private checkinService:CheckinService) {}

  fetchCheckInDetails() {
    if (!this.referenceNumber) {
      alert("Please enter a reference number.");
      return;
    }
    

    // Simulated API response
    // this.checkInDetails = {
    //   referenceNumber: this.referenceNumber,
    //   checkInId: 'CHK12345',
    //   seatNumber: 'A12',
    //   flight: 'AI-302',
    //   passenger: { name: 'John Doe', seatNumber: 'A12' }
    // };
    this.isLoading = true;
    this.errorMessage = '';

    this.bookingService.getBookingByReference(this.referenceNumber).subscribe(
      (response) => {
        this.bookingDetails = response;
        console.log(this.bookingDetails);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = "Booking not found. Please check your reference number.";
        alert(this.errorMessage);
        this.isLoading = false;
      }
    );
  }

  confirmCheckIn() {

    const request: CheckInRequest = {
      referenceNumber: this.referenceNumber,
      //get the passenger names from the booking details and add it to array
      passengers: this.bookingDetails?.passengers.map((passenger: Passenger) => passenger.name) || []
    };
    

    this.checkinService.checkIn(request).subscribe(
      (response) => {
        this.checkInResults = response[0];
        this.checkInConfirmed = true;
         
        console.log('Check-In Successful', response);
      },
      (error) => {
        console.error('Check-In Failed', error);
        console.error('Check-In Failed', error);
      }
    );

    
  }

  goHome() {
    this.router.navigate(['/']);
  }
}

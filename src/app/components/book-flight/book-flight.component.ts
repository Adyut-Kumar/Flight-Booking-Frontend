import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { FareService } from '../../services/fare.service';  
import { Flight } from '../../models/flight.model';
import { Passenger } from '../../models/passenger.model';
import {  BookingSummaryComponent } from './booking-summary/booking-summary.component';

@Component({
  selector: 'app-book-flight',
  standalone: true,
  imports: [CommonModule, FormsModule, BookingSummaryComponent],
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  flightId!: number;
  flight!: Flight;
  loading:boolean = true;
  priceloading:boolean = true;  
  bookingSuccess: boolean = false;
  bookingDetailsAdded: boolean = false;
  showErr:boolean=false;

  passenger: Passenger = {
    name: '',
    email: '',
    //age: 0,
    gender: 'Male',
    seatNumber: '' // ✅ Seat will be auto-assigned
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private fareService: FareService
  ) {}

  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightId = params['flightId'];
      this.loading = true;
      this.priceloading = true;
      this.getFlightDetails();
      
    });
  }

  /** ✅ Fetch Flight Details */
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  
  //uncomment below
  getFlightFare(){
    this.fareService.getFareByFlightId(this.flightId).subscribe(
      (data) => {
        console.log(data);
        this.flight.price = data;
        this.priceloading = false;
         
     
      },
      (err) => {
        console.log(err);
        alert('fare not found!');
        this.router.navigate(['/search-flight']);
      }
    );
  }
  loginAsAdmin() {
    this.router.navigate(['/admin/login']);
  }
  getFlightDetails() {
  

  
    this.flightService.getFlightById(this.flightId).subscribe(
      (data) => {
        this.flight = data;
        this.getFlightFare();
        this.loading = false;
      },
      () => {
        alert('Flight not found!');
        this.router.navigate(['/search-flight']);
      }
    );
   }

  /** ✅ Confirm Booking */
  Booking() {
    
    if (!this.passenger.name || !this.passenger.email ) {
      alert('Please fill all required fields.');
      return;
    }
    if (!this.validateEmail(this.passenger.email)) {
      this.showErr=true;
      return;
    }

    //this.assignSeat(); // ✅ Auto-assign seat
    //alert(`Booking confirmed for ${this.passenger.name}! Seat: ${this.passenger.seatNumber}`);
    this.bookingDetailsAdded = true;
    this.showErr=false;
  }
}

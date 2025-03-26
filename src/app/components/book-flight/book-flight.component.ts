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
  getFlightDetails() {
   //demmo
  //  setTimeout(() => {
  //   const demoFlight: Flight = {
  //     flightNumber: 'AI203',
  //     airline: 'Air India',
  //     departureTime: '2024-04-01T08:30:00',
  //     arrivalTime: '2024-04-01T10:45:00',
  //     price: 4999,
  //     from: 'New Delhi',
  //     to: 'Mumbai',
  //     date: '2024-04-01',
  //     flightId: 101
  //   };

  //   this.flight = demoFlight;  // ✅ Assign flight data after 3 seconds
  //   this.loading = false;  // ✅ Hide loading state
  // }, 3000);
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

  /** ✅ Simulate Seat Assignment */
  // assignSeat() {
  //   const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  //   const row = Math.floor(Math.random() * 30) + 1;
  //   const letter = seatLetters[Math.floor(Math.random() * seatLetters.length)];
  //   this.passenger.seatNumber = `${row}${letter}`;
  // }

  /** ✅ Confirm Booking */
  Booking() {
    if (!this.passenger.name || !this.passenger.email ) {
      alert('Please fill all required fields.');
      return;
    }

    //this.assignSeat(); // ✅ Auto-assign seat
    //alert(`Booking confirmed for ${this.passenger.name}! Seat: ${this.passenger.seatNumber}`);
    this.bookingDetailsAdded = true;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../models/flight.model';
import { Passenger } from '../../../models/passenger.model';
import { City } from '../../../models/city.model';
import { CityService } from '../../../services/city.service';
import { BookingService } from '../../../services/booking.service';
import { FlightService } from '../../../services/flight.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit {
  @Input() flight!: Flight;      // ✅ Get Flight Data from Parent
  @Input() passenger!: Passenger;  // ✅ Get Passenger Data from Parent
  city!: City;                   // ✅ City Fetched via Service
  loading: boolean = true;  
  gstAmount: number = 0;
  totalAmount: number = 0;
  isSubmitLoading: boolean = false;  // ✅ Loading Spinner

  constructor(private cityService: CityService,private bookingService:BookingService,private router:Router,private flightService: FlightService) {}

  ngOnInit(): void {
    if (this.flight) {
      console.log(this.flight);
      this.fetchCityDetails(this.flight.fromCity);  // ✅ Fetch city data using `fromCity`
    }
  }

  /** ✅ Fetch City Data from Service Using City Name */
  fetchCityDetails(cityName: string) {
    this.cityService.getCityByName(cityName).subscribe(
      (data) => {
        this.city = data;
        this.calculatePrice();  // ✅ Calculate Price
        this.loading = false;
        
      },
      () => {
        alert("City details not found!");
        this.loading = false;
      }
    );
  }
  calculatePrice() {
    this.gstAmount = this.flight.price * 0.18;  // ✅ 18% GST
    this.totalAmount = this.flight.price + this.gstAmount + this.city.airportCharge;
  }

  /** ✅ Confirm Booking Action */


  updateSeats(flightId: number, seatsToBook: number) {
    const seatUpdateData = {
      flightId: flightId,
      seatsToBook: seatsToBook
    };
  
    this.flightService.updateSeats(seatUpdateData).subscribe(
      (response) => {
        console.log("✅ Seats Updated Successfully:", response);
      
      },
      (error) => {
        console.error("❌ Failed to Update Seats:", error);
        
      }
    );
  }
  
    confirmBooking() {
      this.isSubmitLoading = true; // ✅ Show Loading Spinner

      const bookingData = {
        flightId: this.flight.flightId,
        passengers: [
          {
            name: this.passenger.name,
            email: this.passenger.email,
            gender: this.passenger.gender
          }
        ]
      };

  
      this.bookingService.bookFlight(bookingData).subscribe(
        (response) => {
          this.updateSeats(this.flight.flightId, 1);
          
          alert("🎉 Booking Confirmed! Your ticket is issued.");
          const referenceNumber = response.referenceNumber;  // ✅ Get Reference Number
          //this.router.navigate(['/book-flight', flight.flightId]); 
          
           this.router.navigate([`/final-confirmation`,referenceNumber]);  // ✅ Redirect with Reference Number
          console.log("Booking Response:", response);
          this.isSubmitLoading = false; // ✅ Hide Loading Spinner
        },
        (error) => {
          alert("❌ Booking Failed. Please try again.");
          console.error("Booking Error:", error);
          this.isSubmitLoading = false; // ✅ Hide Loading Spinner
        }
      );
    }
  
}

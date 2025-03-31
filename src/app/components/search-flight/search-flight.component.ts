import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../../models/flight.model';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { FlightListComponent } from './flight-list/flight-list.component';
import { CityService } from '../../services/city.service';
import { FareService } from '../../services/fare.service';
import { City } from '../../models/city.model';
import {  ViewEncapsulation } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-search-flight',
  standalone: true,
  imports: [CommonModule, FormsModule,FlightListComponent,NgSelectModule],  // ✅ Required for *ngIf, *ngFor, and ngModel
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class SearchFlightComponent {
  from: string = '';
  to: string = '';
  date: string = '';
  flights: Flight[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  //added for current date
  today: string = '';
  
  cities: string[] = []; // Original city list
  fromCities: string[] = []; // Filtered list for "From City"
  toCities: string[] = []; // Filtered list for "To City"
  selectedFlight = {
    fromCity: null,
    toCity: null
  };
  constructor(private http: HttpClient,private router: Router,private flightService: FlightService, private fareService: FareService,private cityService:CityService) {}//private fareService: FareService // Added
  ngOnInit() {
    this.loadCities();
    this.today = new Date().toISOString().split('T')[0];
   
  }
  loadCities() {
    this.cityService.getCities().subscribe(
      (data: City[]) => {
        this.cities = data.map((city: City) => city.cityName); // ✅ Use cityName only
        this.fromCities = [...this.cities]; 
        this.toCities = [...this.cities];   
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  onFromCityChange() {
    if (this.selectedFlight.fromCity) {
      this.toCities = this.cities.filter(city => city !== this.selectedFlight.fromCity);
    } else {
      this.toCities = [...this.cities]; // Reset list
    }
  
    if (this.selectedFlight.toCity === this.selectedFlight.fromCity) {
      this.selectedFlight.toCity = null;
    }
  }
  loginAsAdmin() {
    this.router.navigate(['/admin/login']);
  }
  onToCityChange() {
    if (this.selectedFlight.toCity) {
      this.fromCities = this.cities.filter(city => city !== this.selectedFlight.toCity);
    } else {
      this.fromCities = [...this.cities]; // Reset list
    }
  
    if (this.selectedFlight.fromCity === this.selectedFlight.toCity) {
      this.selectedFlight.fromCity = null;
    }
  }

  searchFlights() {
    if (!this.selectedFlight.fromCity || !this.selectedFlight.toCity || !this.date) {
      alert("Please select 'From', 'To', and 'Date' before searching.");
      return;
    }

    this.loading = true;
    this.errorMessage = '';


    //demo
    // const demoFlight: Flight = {
    //   flightNumber: 'AI203',
    //   airline: 'Air India',
    //   departureTime: '2024-04-01T08:30:00',
    //   arrivalTime: '2024-04-01T10:45:00',
    //   price: 4999,
    //   from: 'New Delhi',
    //   to: 'Mumbai',
    //   date: '2024-04-01',
    //   flightId: 101
    // };
    // this.flights = [demoFlight];
    // this.loading = false;
    
    
    
  //uncomment down
    this.flightService.getAvailableFlights(this.selectedFlight.fromCity, this.selectedFlight.toCity, this.date).subscribe(
      (data) => {
        this.flights = data;
        this.loading = false;

        //   // For each flight, fetch the corresponding fare
        //   const flightWithFaresRequests = this.flights.map(flight => {
        //     return this.fareService.getFareByFlightId(flight.flightId).pipe(
        //       // Merge the flight data with fare data
        //       map((fare: any) => ({ ...flight, fare }))
        //     );
        //   });

        //     // Use forkJoin to wait for all the fare requests to finish
        // forkJoin(flightWithFaresRequests).subscribe(
        //   (flightsWithFares) => {
        //     console.log('Flights with fares:', flightsWithFares); // Log the combined data
        //     // Passing data to SearchComponent
        //     this.router.navigate(['/search'], {
        //       state: { flights: flightsWithFares }
        //     });
        //   }
        // );
   
      },
      (error) => {
        this.errorMessage = "No flights found for the selected date.";
        this.flights = [];
        this.loading = false;
      }
    );
  }

  // Added current and next day date
  

  
    handleBookFlight(flight: Flight) {
      //alert(`Booking flight: ${flight.flightNumber} - ${flight.airline}`);
      this.router.navigate(['/book-flight', flight.flightId]); 
    }
  
}

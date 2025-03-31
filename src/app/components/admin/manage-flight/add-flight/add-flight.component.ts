import { Component ,ViewEncapsulation} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../../../services/flight.service';
import { CityService } from '../../../../services/city.service';
import { City } from '../../../../models/city.model';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports:[CommonModule,FormsModule,NgSelectModule]
})
export class AddFlightComponent {
  flight = {
    flightNo: '',
    fromCity: '',
    toCity: '',
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: 0,
    isActive: true
  };
  isLoading = false;


  message = '';
  today:string='';
    cities: string[] = []; // Original city list
    fromCities: string[] = []; // Filtered list for "From City"
    toCities: string[] = []; // Filtered list for "To City"
    selectedFlight = {
      fromCity: null,
      toCity: null
    };
 

  constructor(private flightService: FlightService,private cityService:CityService) {}


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
  
  
  addFlight() {
    if (!this.selectedFlight.fromCity || !this.selectedFlight.toCity || !this.flight.flightNo || !this.flight.departureDate || !this.flight.arrivalTime || !this.flight.availableSeats ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    this.flight.fromCity = this.selectedFlight.fromCity;
    this.flight.toCity = this.selectedFlight.toCity;
  
    this.isLoading = true;
    this.flightService.addFlight(this.flight).subscribe(
      (response: string) => {
        this.message = response;  
        alert(this.message);
        this.resetForm();
        this.isLoading = false;
      },
      (error) => {
        alert('Error adding flight. Please try again.');
        console.error(error);
        this.isLoading = false;
      }
    );
  }
  

  resetForm() {
    this.flight = {
      flightNo: '',
      fromCity: '',
      toCity: '',
      departureDate: '',
      departureTime: '',
      arrivalTime: '',
      availableSeats: 0,
      isActive: true
    };
  
    this.selectedFlight.fromCity = null;
    this.selectedFlight.toCity = null;
    this.fromCities = [...this.cities]; 
    this.toCities = [...this.cities]; 
  }
  
}

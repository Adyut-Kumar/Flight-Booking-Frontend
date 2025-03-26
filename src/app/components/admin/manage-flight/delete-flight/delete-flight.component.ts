import { Component } from '@angular/core';
import { FlightService } from '../../../../services/flight.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DeleteFlightComponent {
  flightCode: string = '';
  message: string = '';

  constructor(private flightService: FlightService) {}

  
    
  deleteFlight() {
    if (!this.flightCode.trim()) {
      alert('Please enter a valid Flight Code.');
      return;
    }
  
    this.flightService.deleteFlight(this.flightCode).subscribe(
      (response) => {
        const message = response?.body?.message || 'Flight deleted successfully.'; // ✅ Handle empty body
        alert(message);
        this.flightCode = ''; // ✅ Clear input field
      },
      () => {
        alert('Error deleting flight. Please cehck if flight id id correct.');
      }
    );
  }
  
}

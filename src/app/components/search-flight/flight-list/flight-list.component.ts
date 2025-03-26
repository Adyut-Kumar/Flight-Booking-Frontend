import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../models/flight.model';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent {
  @Input() flights: Flight[] = []; // ✅ Receive flight list from parent
  @Output() bookFlightEvent = new EventEmitter<Flight>(); // ✅ Send flight data to parent

  bookFlight(flight: Flight) {
    this.bookFlightEvent.emit(flight); // ✅ Emit the selected flight to parent
  }
}





// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Flight } from '../../../models/flight.model';

// @Component({
//   selector: 'app-flight-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './flight-list.component.html',
//   styleUrls: ['./flight-list.component.css']
// })
// export class FlightListComponent {
//   @Input() flights: Flight[] = []; // ✅ Receive flight list from parent
//   @Output() bookFlightEvent = new EventEmitter<Flight>(); // ✅ Send flight data to parent

//   searchPerformed: boolean = false; // ✅ New property to track if search is done

//   @Input() set searchedFlights(value: Flight[]) {
//     this.flights = value;
//     this.searchPerformed = true; // ✅ Mark search as performed when flights are received
//   }

//   bookFlight(flight: Flight) {
//     this.bookFlightEvent.emit(flight); // ✅ Emit the selected flight to parent
//   }
// }


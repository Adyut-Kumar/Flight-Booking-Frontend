import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Passenger } from '../../models/passenger.model'; // ✅ Import Passenger Model

@Component({
  selector: 'app-passenger-details',
  standalone: true,  // ✅ Make it standalone
  imports: [CommonModule],
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent {
  @Input() passenger : Passenger| null = null;;  // ✅ Accept passenger data from parent
}

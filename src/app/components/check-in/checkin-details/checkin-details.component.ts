import { Component, Input } from '@angular/core';
import { CheckInResponse } from '../../../services/checkin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkin-details',
  templateUrl: './checkin-details.component.html',
  styleUrls: ['./checkin-details.component.css'],
   imports: [CommonModule, FormsModule],
  host: { 'class': 'overlay' } // Ensures it appears in front of the parent
})
export class CheckinDetailsComponent {
  @Input() checkInResults!: CheckInResponse;

  ngOnInit(): void {
    console.log(this.checkInResults);
  }
  

  close() {
    //redirect to home page
    //console.log(this.checkInResults);
    window.location.href = '/';
  }
}

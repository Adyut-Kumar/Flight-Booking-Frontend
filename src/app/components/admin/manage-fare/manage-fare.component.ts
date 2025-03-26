import { Component } from '@angular/core';
import { AddFareComponent } from './add-fare/add-fare.component';
import { RemoveFareComponent } from './remove-fare/remove-fare.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-fare',
  templateUrl: './manage-fare.component.html',
  styleUrls: ['./manage-fare.component.css'],
  imports:[AddFareComponent,RemoveFareComponent,FormsModule,CommonModule]
})
export class ManageFareComponent {
  activeComponent: string = 'addFare'; // Default to 'Add Fare'

  showComponent(component: string) {
    this.activeComponent = component;
  }
}

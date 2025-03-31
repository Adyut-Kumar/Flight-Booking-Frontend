import { Component } from '@angular/core';
import { AddFareComponent } from './add-fare/add-fare.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateFareComponent } from './update-fare/update-fare.component';

@Component({
  selector: 'app-manage-fare',
  templateUrl: './manage-fare.component.html',
  styleUrls: ['./manage-fare.component.css'],
  imports:[AddFareComponent,UpdateFareComponent,FormsModule,CommonModule]
})
export class ManageFareComponent {
  activeComponent: string = ''; // Default to 'Add Fare'

  showComponent(component: string) {
    this.activeComponent = component;
  }
}

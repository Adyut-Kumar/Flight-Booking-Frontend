import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,AddFlightComponent,DeleteFlightComponent]
})
export class ManageFlightComponent {
  activeTab: string = '';

  showComponent(tab: string) {
    this.activeTab = tab;
  }
}

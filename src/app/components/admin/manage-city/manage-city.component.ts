import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCityComponent } from './add-city/add-city.component';
import { AllCitiesComponent } from './all-cities/all-cities.component';
import {DeleteCityComponent} from './delete-city/delete-city.component';
 
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-manage-city',
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,AddCityComponent,AllCitiesComponent,DeleteCityComponent]
})

export class ManageCityComponent {
  activeTab: string = ''; // Track which subcomponent is active

  showTab(tab: string) {
    this.activeTab = tab;
  }
}
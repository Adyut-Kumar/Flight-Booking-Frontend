import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // ✅ Required for *ngIf and *ngFor
import { FormsModule } from '@angular/forms';  // ✅ Required for ngModel
import { AppRoutingModule } from './app.routes';  // ✅ Routing Module
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CheckInComponent } from './components/check-in/check-in.component';  // ✅ Import CheckInComponent
import { SearchFlightComponent } from './components/search-flight/search-flight.component'; // ✅ Import FlightSearchComponent 
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { FinalConfirmationComponent } from './components/final-confirmation/final-confirmation.component'; 
import { AdminLoginComponent } from './components/admin-login/admin-login.component'; 
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';            // ✅ Import FinalConfirmationComponent
@NgModule({
  declarations: [
    
    // CheckInComponent  // ✅ Only declare this if it's NOT standalone
  ],
  imports: [
    BrowserModule,
    AppComponent,
    HomeComponent,
    CommonModule,  
    FormsModule,  // ✅ Required for ngModel
    AppRoutingModule,
    CheckInComponent, 
    AdminLoginComponent,
    BookFlightComponent,
    FinalConfirmationComponent,
    AdminHomeComponent,
    SearchFlightComponent// ✅ Import CheckInComponent as it is standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

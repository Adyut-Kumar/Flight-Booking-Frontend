import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { FinalConfirmationComponent } from './components/final-confirmation/final-confirmation.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { L } from '@angular/cdk/keycodes';
//import { AbcComponent } from './components/abc/abc.component';
// import { SearchFlightComponent } from './components/search-flight/search-flight.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Default Home Page
  //{path: 'abc', component: AbcComponent},
 { path: 'check-in', component: CheckInComponent }, 
 { path: 'search-flight', component: SearchFlightComponent },
 { path: 'book-flight/:flightId', component: BookFlightComponent }, // Check-in Page
 {path: 'final-confirmation/:referenceNumber', component: FinalConfirmationComponent},
 {path: 'admin/login', component: AdminLoginComponent,canActivate: [LoginGuardService]},//canActivate: [AuthGuardService]
 {path: 'admin/admin-home', component: AdminHomeComponent,canActivate: [AuthGuardService]},//canActivate: [LoginGuardService]
 
 
//   { path: 'search-flight', component: SearchFlightComponent },  // Search Flight Page
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirect unknown paths to home

];

export const AppRoutingModule = RouterModule.forRoot(routes);

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:7001/api/City';  // ✅ Update with your actual API URL

  constructor(private http: HttpClient) {}
 
  /** ✅ Fetch all cities */
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/all`);
  }

  /** ✅ Fetch a city by ID */
  getCityById(cityId: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${cityId}`);
  }
  
  deleteCityByCode(cityCode: string): Observable<any> {
 
    return this.http.delete(`${this.apiUrl}/deleteCity/${cityCode}`);
  }
  /** ✅ Fetch a city by name */
  getCityByName(cityName: string): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/getCityByName/${cityName}`);
  }
}

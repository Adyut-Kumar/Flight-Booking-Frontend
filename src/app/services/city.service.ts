import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:7001/api/City'; 

  constructor(private http: HttpClient) {}
 
  /** Fetch all cities */
  getCities(): Observable<City[]> {
    // return this.http.get<City[]>(`${this.apiUrl}/all`);
    return this.http.get<City[]>(`${this.apiUrl}/all`).pipe(
      map((cities: any[]) => cities.filter(city => city.isActive)  // Filter only active cities
    ));
  }

  /** Fetch a city by ID */
  getCityById(cityId: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${cityId}`);
  }
  
  deleteCityByCode(cityCode: string): Observable<any> {
 
    return this.http.delete(`${this.apiUrl}/deleteCity/${cityCode}`,{ responseType: 'text' as 'json' });
  }
  /** Fetch a city by name */
  getCityByName(cityName: string): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/getCityByName/${cityName}`);
  }
  addCity(city: City): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCity`, city,{ responseType: 'text' as 'json' });
  }
}

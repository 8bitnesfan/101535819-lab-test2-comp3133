import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private API_URL = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getMissions() {
    return this.http.get<any[]>('https://api.spacexdata.com/v3/launches');
  }

  getMissionByFlightNumber(flightNumber: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${flightNumber}`);
  }
}

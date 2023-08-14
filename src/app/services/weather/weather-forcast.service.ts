import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherForcastService {

  constructor(private http: HttpClient) {}

  getWeatherForecast(lat: string | null| undefined, lon: string | null | undefined): Observable<any> {
    const url = `${environment.weatherApiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${environment.weatherApKey}`;
    return this.http.get(url);
  }

}

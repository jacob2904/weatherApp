import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cityImageUrls: any;

  constructor(private http: HttpClient) {}

  fetchDataOnAppInit(): Promise<void> {
    const url = `${environment.cityApiUrl}/api/urban_areas/?embed=ua:item/ua:images`;
    return this.http.get<any>(url)
      .pipe(
        tap((response) => {
          this.cityImageUrls = response;
        })
      )
      .toPromise();
  }

  getCityImageUrls(): any {
    return this.cityImageUrls;
  }

  getCityByName(cityName: string): Observable<any> {
    const url = `${environment.cityApiUrl}/api/cities/?search=${cityName}&embed=city:search-results/city:item/{city:country,city:admin1_division,city:urban_area,city:timezone/tz:offsets-now`;
    return this.http.get(url);
  }
}

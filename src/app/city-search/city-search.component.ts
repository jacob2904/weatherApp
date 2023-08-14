// city-search.component.ts
import { Component } from '@angular/core';
import { CityService } from '../services/city/city.service';


@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent {
  searchQuery: string = '';
  isSuccess: boolean = false;
  isVisible: boolean = false;
  message: string = '';
  cities: any[] = [];

  constructor(private cityService: CityService) { }

  searchCities() {
    this.cityService.getCityByName(this.searchQuery).subscribe(
      (data) => {
        this.cities = data._embedded['city:search-results'];
        if (this.cities.length === 0) {
          this.isSuccess = false;
          this.isVisible = true;
          this.message = 'Sorry! No results. Try different search.';
        }
      },
      (error) => {
        this.isSuccess = false;
        this.isVisible = true;
        this.message = ' \'Error fetching city:\', error)';
        console.error('Error fetching city:', error);
      }
    );
  }
  resetSearch() {
    this.searchQuery = '';
    this.cities = [];
    this.isVisible = false;
  }
}

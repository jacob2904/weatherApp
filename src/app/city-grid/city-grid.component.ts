// city-grid.component.ts
import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingService} from '../services/loading/loading.service';
import {CityService} from "../services/city/city.service";

@Component({
  selector: 'app-city-grid',
  templateUrl: './city-grid.component.html',
  styleUrls: ['./city-grid.component.css']
})
export class CityGridComponent {
  @Input() cities: any[] | undefined;

  constructor(private http: HttpClient, public loadingService: LoadingService, public cityService : CityService) { }

  getCityImage(cityData: any) :string{
    const uaId = cityData?._embedded?.['city:item']?._embedded?.['city:urban_area']?.ua_id;
    if(uaId){
      let cityImageUrlsData = (this.cityService.getCityImageUrls())?._embedded['ua:item'];
      let imageData = cityImageUrlsData.find((item: { ua_id: any; }) => item.ua_id === uaId);
      return imageData._embedded['ua:images']?.photos[0]?.image?.mobile;
    }
    return '';
  }

  getCurrentTime(cityData: any): string {
    return new Date().toLocaleString('en-US', {
      timeZone: cityData?._embedded['city:item']._embedded['city:timezone'].iana_name,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false // 24-hour format
    });
  }
}

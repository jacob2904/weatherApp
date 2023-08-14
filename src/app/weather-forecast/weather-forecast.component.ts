import { Component, OnInit } from '@angular/core';
import { WeatherForcastService } from '../services/weather/weather-forcast.service';
import { ActivatedRoute } from '@angular/router';
import {LoadingService} from '../services/loading/loading.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  citylat: string  | null | undefined;
  citylon: string | null | undefined;

  weatherData: any[] = [];

  constructor(private weatherForecastService: WeatherForcastService, private route: ActivatedRoute,
              public loadingService: LoadingService, private location: Location) {}


  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.citylat = queryParams.get('citylat');
      this.citylon = queryParams.get('citylon');
    });

    this.weatherForecastService.getWeatherForecast(this.citylat, this.citylon)
      .subscribe((data: { list: any[]; }) => {
        this.weatherData = this.extractDailyWeather(data.list);
        console.log('weatherData', this.weatherData );
      });
  }

  extractDailyWeather(data: any[]): any[] {
    // Extract one weather data entry for each day
    const dailyWeather: any[] = [];
    const groupedData = this.groupWeatherByDate(data);


    for (const date in groupedData) {
      const dayWeather = groupedData[date][0]; // Taking the first entry of each day
      dailyWeather.push(dayWeather);
    }

    return dailyWeather;
  }

  groupWeatherByDate(data: any[]): any {
    // Group weather data entries by date
    return data.reduce((grouped, entry) => {
      const date = entry.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(entry);
      return grouped;
    }, {});
  }

}

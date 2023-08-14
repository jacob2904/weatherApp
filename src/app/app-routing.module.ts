import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CitySearchComponent} from "./city-search/city-search.component";
import {WeatherForecastComponent} from "./weather-forecast/weather-forecast.component";

const routes: Routes = [
  { path: '', component: CitySearchComponent },
  { path: 'weatherForecast', component: WeatherForecastComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

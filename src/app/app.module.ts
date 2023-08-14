import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { CityGridComponent } from './city-grid/city-grid.component';
import {FormsModule} from "@angular/forms";

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NotificationComponent } from './notification/notification.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingService } from './services/loading/loading.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

import {CityService} from './services/city/city.service';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component'

function initializeApp(sharedService: CityService): () => Promise<void> {
  return () => sharedService.fetchDataOnAppInit();
}

@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    CityGridComponent,
    NotificationComponent,
    SpinnerComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CityService,
    LoadingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [CityService],
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

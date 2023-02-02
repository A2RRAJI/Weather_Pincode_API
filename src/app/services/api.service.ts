import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postUser(data : any){
    return this.http.post<any>("http://localhost:3000/userList/",data);
  }

  getUser(){
    return this.http.get<any>("http://localhost:3000/userList/");
  }

  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>('http://api.openweathermap.org/data/2.5/weather', {
      params: new HttpParams()
      .set('q', cityName)
      .set('appid', '5d6bc09f388f3649b58eb420b66bffdd')
    })
  }
}

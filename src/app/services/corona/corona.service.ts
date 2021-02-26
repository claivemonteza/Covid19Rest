import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summary } from 'src/app/model/summary.model';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  private url = 'https://api.covid19api.com';

  constructor(private http: HttpClient) { }

  getCoronaRealTimeData(country){
    return this.http.get<any[]>(`${this.url}/total/dayone/country/`+country);
  }

  getWorldTotal(){
    return this.http.get<any[]>(`${this.url}/world/total`);
  }

  getGlobalData(){
    return this.http.get<any[]>(`${this.url}/summary`);
  }

  getCoronaCountries(){
    return this.http.get<any>(`${this.url}/countries`);
  }
  
  getCoronaByCountryCode(countryCode:string){
    return this.http.get<any>(`${this.url}/countries`);
  }

  getCountryTotalByDayOne(name:string){
    return this.http.get<any>(`${this.url}/total/dayone/country/`+name);
  }
}

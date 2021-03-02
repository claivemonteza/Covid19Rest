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

  getWorldTotal(){
    return this.http.get<any[]>(`${this.url}/world/total`);
  }

  getGlobalData(){
    return this.http.get<any[]>(`${this.url}/summary`);
  }

  getTotalCases(country){
    return this.http.get<any[]>(`${this.url}/total/country/`+country+`/status/confirmed`);
  }

  getTotalRecovered(country:string){
    return this.http.get<any[]>(`${this.url}/total/country/`+country+`/status/recovered`);
  }

  getTotalDeaths(country:string){
    return this.http.get<any[]>(`${this.url}/total/country/`+country+`/status/deaths`);
  }

}

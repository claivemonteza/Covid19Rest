import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  private url = `${environment.covid}`;

  constructor(private http: HttpClient) { }

  getWorldTotal(){
    return this.http.get<any[]>(`${this.url}/world/total`);
  }

  getGlobalData(){
    return this.http.get<any[]>(`${this.url}/summary`);
  }

  getTotalCases(name:any){
    return this.http.get<any[]>(`${this.url}/total/country/${name}/status/confirmed`);
  }

  getTotalRecovered(name){
    return this.http.get<any[]>(`${this.url}/total/country/${name}/status/recovered`);
  }

  getTotalDeaths(name){
    return this.http.get<any[]>(`${this.url}/total/country/${name}/status/deaths`);
  }

  getTotalStatus(name){
    return this.http.get<any[]>(`${this.url}/total/country/${name}`);
  }

}

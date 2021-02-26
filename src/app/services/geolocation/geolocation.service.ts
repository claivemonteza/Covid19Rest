import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  private url = 'http://www.geoplugin.net/json.gp?ip';
  constructor(private http: HttpClient) { }

  getLocation(ip: string){
    return this.http.get(`${this.url}=`+ip);
  }
}

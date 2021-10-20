import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  private url = 'https://ipapi.co/json/';
  constructor(private http: HttpClient) { }

  getLocation(){
    return this.http.get(`${this.url}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Country } from '../../model/Country.model';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }

  getCountryByName(name: string) {
    return this.http
      .get<Country[]>(`${this.url}/name/${name}`)
      .pipe(map(([res]) => res));
  }

  getCountriesByCodes(codes: string[]) {
    console.log(`${this.url}/alhpa?codes=${codes.join(';')}`);
    return this.http.get<Country[]>(
      `${this.url}/alpha?codes=${codes.join(';')}`
    );
  }

  getAllCountriesDetails(){
    return this.http.get<Country[]>(`${this.url}/all`);
  }

  getCountries(){
    return this.http.get<Country[]>(`${this.url}/all?fields=name;alpha2Code;capital;region;subregion;population;nativeName;flag`);
  }
}

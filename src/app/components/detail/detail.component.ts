import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country/country.service';
import { Observable, forkJoin, of } from 'rxjs';
import { Country} from '../../model/country.model';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CoronaService } from 'src/app/services/corona/corona.service';
import { CountryCoronaExchangerService } from 'src/app/shared/country-corona-exchanger.service';


let
  cases = [],
  recovered = [],
  deaths = [];


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  country$: Observable<Country>;
  name = 'Loading...';
  flag = '';
  value = '';
  covid_countries: any[];

  constructor(private countryService: CountryService, 
    private coronaService: CoronaService,
    private exchanger: CountryCoronaExchangerService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.exchanger.update.subscribe((data) => {
      this.covid_countries = data;
    });

    this.route.params.subscribe((params) => {
      this.country$ = this.countryService.getCountryByName(params.country).pipe(
        tap((res) => console.log(res)),
      );
    });
  }
/*
  selected(country) {
    this.name = country.name;
    this.flag = country.flag;
    this.corona = this.covid_countries.find((element) => element.Country === country.name);
    this.getCoronaData(this.corona.Country);
  }*/

  
}

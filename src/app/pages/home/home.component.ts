import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CoronaService } from 'src/app/services/corona/corona.service';
import { CountryService } from 'src/app/services/country/country.service';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private source: Country[];
  searchFilter?: string;
  summary: any;
  global?: any[];
  covid_countries?: any[];

  details:any;

  constructor(
    private countryservice: CountryService,
    private coronaService: CoronaService,
    private locationService: GeoLocationService
  ) { }

  ngOnInit(): void {
    this.coronaService.getGlobalData().subscribe((summary) => {
      this.summary = summary;
      this.covid_countries = this.summary.Countries;
      this.global = [{
        description:'Total Cases',
        color:'cases',
        value:this.summary.Global.TotalConfirmed,
        newValue:this.summary.Global.NewConfirmed
      },
      {
        description:'Total Recovered',
        color:'recovered',
        value:this.summary.Global.TotalRecovered,
        newValue:this.summary.Global.NewRecovered
      },
      {
        description:'Total Deaths',
        color:'deaths',
        value:this.summary.Global.TotalDeaths,
        newValue:this.summary.Global.NewDeaths
      }]
    });

    this.countryservice.getAllCountriesDetails().subscribe((countries) => {
      this.source = countries;
      this.findLocation(this.source);
    });
  }

  findLocation(countries: Country[]) {
    let countryLocation;
    this.locationService.getLocation().subscribe((location) => {
      countryLocation = location;
      const country = countries.find((element) => element.name === countryLocation.country_name);
      this.selected(country);
    });
  }

  selected(country) {
     let corona = this.summary.Countries.find((element) => element.Country === country.name);
    this.details = {
      country:country,
      corona:corona,
    }
  }

  get countries() {
    return this.source
      ? this.source.filter((country) =>
        this.searchFilter
          ? country.name
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase())
          : country
      )
      : this.source;
  }
}

import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CoronaService } from 'src/app/services/corona/corona.service';
import { CountryService } from 'src/app/services/country/country.service';
import { GeoLocationService } from 'src/app/services/geolocation/geolocation.service';
import { Chart } from 'node_modules/chart.js';

let myChart,
  cases = [],
  recovered = [],
  deaths = [],
  formatedDates = [];
const monthsNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private source: Country[];
  public search_country = 'search-country hide';
  searchFilter?: string;
  name = 'Loading...';
  flag = '';
  value = '';
  summary: any;
  global?: any;
  corona?: any;
  location: any;
  covid_countries: any[];
  total_cases: any[];
  dates = [];

  constructor(
    private countryservice: CountryService,
    private coronaService: CoronaService,
    private locationService: GeoLocationService
  ) { }

  ngOnInit(): void {
    this.countryservice.getAllCountries().subscribe((countries) => {
      console.log(countries);
    });
    
    this.coronaService.getGlobalData().subscribe((summary) => {
      this.summary = summary;
      this.covid_countries = this.summary.Countries;
      this.global = this.summary.Global;
    });

    this.countryservice.getAllCountriesDetails().subscribe((countries) => {
      this.source = countries;
      this.findLocation(this.source);
    });
  }

  findLocation(countries: Country[]) {
    this.locationService.getLocation().subscribe((location) => {
      this.location = location;
      const country = countries.find((element) => element.name === this.location.country_name);
      this.selected(country);
    });
  }

  selected(country) {
    this.name = country.name;
    this.flag = country.flag;
    this.hidden();

    this.corona = this.covid_countries.find((element) => element.Country === country.name);
    this.getCoronaData(this.corona.Country);
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

  getCoronaData(country_name) {
    cases = [];
    recovered = [];
    deaths = [];
    this.total_cases = null;

    this.coronaService.getTotalStatus(country_name).subscribe((total) => {
      this.total_cases = total;
      this.total_cases.forEach((element) => {
        cases.push(element.Confirmed);
        recovered.push(element.Recovered);
        deaths.push(element.Deaths);
        this.dates.push(element.Date);
      });

      this.dates.forEach((date) => {
        formatedDates.push(this.formatDate(date));
      });
      this.getChart();
    });
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    return `${date.getDate()} ${monthsNames[date.getMonth() - 1]
      } ${date.getFullYear()}`;
  }

  getChart() {
    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart('axes_line_chart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Cases',
            color: '#fff',
            data: cases,
            fill: false,
            borderColor: '#1b7fc5',
            backgroundColor: '#1b7fc5',
            borderWidth: 1,
            type: 'bar',
          },
          {
            label: 'Recovered',
            color: '#fff',
            data: recovered,
            fill: false,
            borderColor: '#009688',
            backgroundColor: '#009688',
            borderWidth: 1,
            type: 'bar',

          },
          {
            label: 'Deaths',
            color: '#fff',
            data: deaths,
            fill: false,
            borderColor: '#f44336',
            backgroundColor: '#f44336',
            borderWidth: 1,
          },
        ],
        labels: formatedDates,
      },
      options: {
        responsive: true,
        maintainAspectRadio: false,

        scales: {
          yAxes: [
            {
              stacked: true,
            },
          ],

        },
      },
    });
  }

  hidden() {
    this.search_country = 'search-country hide';
  }

  show() {
    if (this.search_country === 'search-country') {
      this.hidden();
    } else {
      this.search_country = 'search-country';
    }
  }
}

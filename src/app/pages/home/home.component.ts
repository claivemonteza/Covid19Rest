import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CoronaService } from 'src/app/services/corona/corona.service';
import {CountryService} from 'src/app/services/country/country.service';
import{GeoLocationService} from 'src/app/services/geolocation/geolocation.service';
import { Chart } from 'node_modules/chart.js';


let myChart;
const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private source: Country[];
  public search_country="search-country hide";
  searchFilter?: string;
  name="Loading...";
  imagem="";
  value="";
  summary:any;
  global?:any;
  corona?:any;
  location:any;
  countrys:any[];
  cases_list:any[];
  recovered_list:any[];
  deaths_list:any[];
  dates:any[];
  formatedDates:any[];

  constructor(private countryservice: CountryService, private coronaService: CoronaService, private locationService: GeoLocationService) { }

  ngOnInit(): void {
    /*this.getChart();*/

    this.coronaService.getGlobalData().subscribe((summary)=>{
      this.summary=summary;
      this.countrys=this.summary.Countries;
      this.global=this.summary.Global;
    })

    this.countryservice.getCountries().subscribe((countries) => {
      this.source = countries;
    });

    this.locationService.getLocation().subscribe((location)=>{
      this.location = location;
      this.source.forEach(element => {
        if(element.name===this.location.country_name){
          this.selected(element);
        }
      });
    })
    //this.getData(this.corona.country);
  }

  get countries(){
    return this.source
    ? this.source
        .filter((country) =>
          this.searchFilter
            ? country.name
                .toLowerCase()
                .includes(this.searchFilter.toLowerCase())
            : country
        )
    : this.source
  } ;



  hidden(){
    this.search_country="search-country hide";
  }

  show(){
    if(this.search_country==="search-country"){
      this.hidden();
    }else{
      this.search_country="search-country";
    }
  }

  selected(country){
    this.name=country.name;
    this.imagem=country.flag;
    this.hidden();
    this.countrys.forEach(element => {
      if(element.Country===country.name){
        this.corona=element;
      }
    });
  }

  getChart(){
    if(myChart){
      myChart.destroy();
    }
    myChart = new Chart("axes_line_chart", {
      type: 'Time Series',
      data: {
        datasets:[{
              label:"Cases",
              color:'#fff',
              data:this.cases_list,
              fill:false,
              borderColor:'#fff',
              backgroundColor:'#fff',
              borderWidth:1
          },{
            label:"Recovered",
            color:'#fff',
            data:this.recovered_list,
            fill:false,
            borderColor:'#009688',
            backgroundColor:'#009688',
            borderWidth:1
          },{
            label:"Deaths",
            color:'#fff',
            data:this.deaths_list,
            fill:false,
            borderColor:'#f44336',
            backgroundColor:'#f44336',
            borderWidth:1
          }],
        labels: ['January', 'February', 'March'],
      },
      options: {
        responsive:true,
        maintainAspectRadio:false
      }
    });
  }

  getData(country){
    this.cases_list = null;
    this.recovered_list = null;
    this.deaths_list = null;
    this.coronaService.getTotalCases(country).subscribe((cases)=>{
        this.cases_list = cases;
        
    })
    this.coronaService.getTotalRecovered(country).subscribe((recovered)=>{
      this.recovered_list = recovered;
    })
    this.coronaService.getTotalDeaths(country).subscribe((deaths)=>{
      this.deaths_list = deaths;
    })

    console.log(this.cases_list+' '+this.deaths_list+' '+this.recovered_list);
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    return `${date.getDate()} ${monthsNames[date.getMonth() - 1]}`;
  }
}

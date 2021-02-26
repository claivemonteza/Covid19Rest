import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CoronaService } from 'src/app/services/corona/corona.service';
import {CountryService} from 'src/app/services/country/country.service';
import{GeoLocationService} from 'src/app/services/geolocation/geolocation.service';
import { IpService } from 'src/app/services/ip/ip.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private source: Country[];
  searchFilter?: string;
  name="Loading...";
  imagem="";
  value="";
  summary?:any;
  countrys:any[];
  public search_country="search-country hide";

  totalConfirmed="0";
  totalRecovered="0";
  totalDeaths="0";
  newConfirmed="0";
  newRecovered="0";
  newDeaths="0";


  constructor(private countryservice: CountryService, private coronaService: CoronaService) { }

  ngOnInit(): void {

    this.coronaService.getGlobalData().subscribe((summary)=>{
      this.summary=summary;
      this.countrys=this.summary.Countries;
    })

    this.countryservice.getCountries().subscribe((countries) => {
      this.source = countries;
    });

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
      this.search_country="search-country hide";
    }else{
      this.search_country="search-country";
    }
  }

  selected(country){
    this.name=country.name;
    this.imagem=country.flag;
    this.search_country="search-country hide";
    this.countrys.forEach(element => {
      if(element.Country===country.name){
        this.totalConfirmed = element.TotalConfirmed;
        this.totalRecovered=element.TotalRecovered;
        this.totalDeaths=element.TotalDeaths;
        this.newConfirmed=element.NewConfirmed;
        this.newRecovered=element.NewRecovered;
        this.newDeaths=element.NewDeaths;
      }
    });
  }
}

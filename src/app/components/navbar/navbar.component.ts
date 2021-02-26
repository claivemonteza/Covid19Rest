import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/model/global.model';
import { CoronaService } from 'src/app/services/corona/corona.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  image:string ="assets/img/logo.png";
  
  @Input()
  summary?:any;

} 

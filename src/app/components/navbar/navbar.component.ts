import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  image:string ="https://raw.githubusercontent.com/claivemonteza/Covid19Rest/main/src/assets/img/logo.png";

  @Input()
  global?:any;
  
} 

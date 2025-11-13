import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardHeader, IonList, IonCardTitle, IonItem, IonImg, IonLabel, IonCardContent } from "@ionic/angular/standalone";
import { League } from 'src/app/models/league';

@Component({
  selector: 'fs-your-leagues',
  templateUrl: './your-leagues.component.html',
  styleUrls: ['./your-leagues.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle,  RouterLink, IonCardContent],
})
export class YourLeaguesComponent  implements OnInit {

  defaultLeagueLogo = 'defaultLeagueLogo.svg';
  @Input() Leagues!: League[]; 

  constructor() { }

  ngOnInit() {}
  
}

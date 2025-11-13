import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonList, IonLabel, IonItem, IonText, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { RecentResults } from 'src/app/models/recentResults';

@Component({
  selector: 'fs-recent-results',
  templateUrl: './recent-results.component.html',
  styleUrls: ['./recent-results.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, DatePipe],
})
export class RecentResultsComponent  implements OnInit {

  @Input() recentResults!: RecentResults[];
  
  constructor() { }

  ngOnInit() {}

  getImg(character: string): string {
    const formattedCharacter = character + "1.png";
    return `assets/icon/smashUltimate/${formattedCharacter}`;
  }
}

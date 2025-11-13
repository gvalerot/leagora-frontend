import { Component, Input, OnInit } from '@angular/core';
import { IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonCard, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { UpcomingTournament } from 'src/app/models/upcomingTournament';

@Component({
  selector: 'fs-upcoming-tournaments',
  templateUrl: './upcoming-tournaments.component.html',
  styleUrls: ['./upcoming-tournaments.component.scss'],
  imports: [IonCardHeader, IonCardTitle, IonList, IonCard, IonCardContent, IonCardSubtitle],
})
export class UpcomingTournamentsComponent implements OnInit {
  @Input() upcomingTournament!: UpcomingTournament[];

  constructor() {}

  ngOnInit() {}
}

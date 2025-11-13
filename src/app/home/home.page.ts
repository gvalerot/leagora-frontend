import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import {
  mockUpcomingTournaments,
  mockLeagues,
  mockRecentResults,
} from '../mocks/mock-data';
import { League } from '../models/league';
import { YourLeaguesComponent } from "./components/your-leagues/your-leagues.component";
import { UpcomingTournament } from '../models/upcomingTournament';
import { UpcomingTournamentsComponent } from "./components/upcoming-tournaments/upcoming-tournaments.component";
import { RecentResults } from '../models/recentResults';
import { RecentResultsComponent } from "./components/recent-results/recent-results.component";
import { AuthService } from '../auth/auth';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonImg,
    CommonModule,
    YourLeaguesComponent,
    UpcomingTournamentsComponent,
    RecentResultsComponent,
    IonButtons,
    IonIcon,
    IonButton
],
})
export class HomePage {
  upcomingTournament: UpcomingTournament[] = mockUpcomingTournaments;
  myLeagues: League[] = mockLeagues;
  recentResults: RecentResults[] = mockRecentResults;
  constructor(private authService: AuthService) {}

  logOut() {
    console.log("Clicked")
    this.authService.logout();
  }
}

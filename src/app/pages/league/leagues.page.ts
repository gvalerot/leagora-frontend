import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

import { LeagueFormComponent } from './components/league-form/league-form.component';
import { League } from 'src/app/models/league';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonImg,
  IonLabel,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { LeagueService } from 'src/app/services/league/leagueService';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonImg,
    IonLabel,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class LeaguesPage implements OnInit {
  leagues!: League[];
  page = 0;
  pageSize = 10;
  allLeagues: League[] = []; 

  constructor(
    private modalController: ModalController,
    private leagueService: LeagueService
  ) {}

  ngOnInit() {
    const user = localStorage.getItem("user");

    if(!user){
      console.error("No user logged in");
      return;
    }

    const idUser = JSON.parse(user).id;

    this.leagueService.getLeagues(idUser).subscribe({
      next: (leagues) => {
        this.allLeagues = leagues as League[];
        this.page = 0;
        this.leagues = [];
        this.loadLeagues();
      },
      error: (err) => {
        console.error('Error al cargar las ligas', err);
      }
    });
  }

  loadLeagues(event?: any) {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    const nextBatch = this.allLeagues.slice(start, end);

    this.leagues = [...this.leagues, ...nextBatch];
    this.page++;

    if (event) event.target.complete();

    // ✅ Si no hay scroll suficiente, carga más automáticamente
    setTimeout(() => {
      const content = document.querySelector('ion-content');
      if (
        content &&
        content.scrollHeight <= content.clientHeight &&
        this.page * this.pageSize < this.allLeagues.length
      ) {
        this.loadLeagues();
      }
    }, 200);
  }

  loadMore(event: any) {
    if (this.page * this.pageSize >= this.allLeagues.length) {
      event.target.disabled = true; // ya no hay más
    } else {
      this.loadLeagues(event);
    }
  }

  async openLeagueModal(league?: League) {
    const modal = await this.modalController.create({
      component: LeagueFormComponent,
      componentProps: { league },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    const user = localStorage.getItem("user");

    if(!user){
      console.error("No user logged in");
      return;
    }

    if (data) {
      if (role === 'create') {
        this.leagueService.createLeague(data).subscribe({
          next: (createdLeague) => {
            this.leagues.unshift(createdLeague);
          },
          error: (err) => {
            console.error('Error al crear la liga', err);
          },
        });
      }
    }
  }

  editLeague(league: League) {
    this.openLeagueModal(league);
  }
}

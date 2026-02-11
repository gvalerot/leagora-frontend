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
import { UserService } from 'src/app/services/user/user-service';
import { User } from 'src/app/models/user';

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
  friends!: User[];

  constructor(
    private modalController: ModalController,
    private leagueService: LeagueService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getLeagues();
    this.getFriends();
  }

  getLeagues() {
    const user = localStorage.getItem('user');

    if (!user) {
      console.error('No user logged in');
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
      },
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
      componentProps: { league, friends: this.friends },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    const user = localStorage.getItem('user');

    if (!user) {
      console.error('No user logged in');
      return;
    }

    if (data) {
      if (role === 'create') {
        this.createLeague(data);
      }

      if (role === 'update') {
      }
    }
  }

  editLeague(league: League) {
    this.openLeagueModal(league);
  }

  getFriends() {
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('No user logged in');
    }
    const idUser = JSON.parse(user).id;
    this.userService.getFriends(idUser).subscribe({
      next: (result) => {
        this.friends = result;
      },
      error: (error) => {
        console.error('Error fetching friends:', error);
      },
    });
  }

  createLeague(league: League) {
    this.leagueService.createLeague(league).subscribe({
      next: (createdLeague) => {
        this.leagues.unshift(createdLeague);
      },
      error: (err) => {
        console.error('Error creating league', err);
      },
    });
  }

  updateLeague(league: League) {
    this.leagueService.updateLeague(league).subscribe({
      next: (updatedLeague) => {
        this.leagues = this.leagues.map((l) =>
          l.id === updatedLeague.id ? updatedLeague : l
        );
      },
      error: (err) => {
        console.error('Error updating league', err);
      },
    });
  }
}

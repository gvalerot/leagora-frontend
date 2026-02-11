import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user/user-service';
import { ModalController } from '@ionic/angular/standalone';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { FriendRequest } from 'src/app/models/friendRequest';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
@Component({
  selector: 'fs-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonToast,
    FriendListComponent,
    PendingRequestComponent,
  ],
})
export class ProfilePage implements OnInit {
  isToastOpen = false;
  friends!: User[];
  pendingRequest!: FriendRequest[];
  toastMessage = '';

  acceptRequest(request: FriendRequest) {
    this.userService.acceptFriendRequest(request).subscribe({
      next: (result) => {
        this.setOpen(true);
      },
      error: (error) => {
        console.error('Error fetching friends:', error);
      },
    });
  }

  rejectRequest(request: FriendRequest) {
    this.userService.rejectFriendRequest(request).subscribe({
      next: (result) => {
        this.setOpen(true);
      },
      error: (error) => {
        console.error('Error fetching friends:', error);
      },
    });
  }

  constructor(
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getPendingRequest();
    this.getFriends();
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

  getPendingRequest() {
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('No user loggedIn');
    }
    const idUser = JSON.parse(user).id;
    this.userService.getPendingRequest(idUser).subscribe({
      next: (result) => {
        this.pendingRequest = result;
      },
      error: (error) => {
        console.error('Error fetching pending request:', error);
      },
    });
  }

  async openAddFriendModal() {
    var users = await this.getAllUsers();
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    users = users.filter((user: User) => user.username !== username);

    const modal = await this.modalController.create({
      component: AddFriendComponent,
      componentProps: {
        users,
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data.role == 'send') {
      const id = JSON.parse(localStorage.getItem('user') || '{}').id;
      this.userService.sendFriendRequest(id, data.user.id).subscribe({
        next: (result) => {
          this.toastMessage = 'Invitation sent!';
          this.setOpen(true);
        },
        error: (error) => {
          this.toastMessage = 'Error sending invitation: ' + error;
          this.setOpen(true);
        },
      });
    }
  }

  getAllUsers() {
    return firstValueFrom(this.userService.getUsers());
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}

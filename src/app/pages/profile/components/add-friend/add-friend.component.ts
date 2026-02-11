import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'fs-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
  imports: [IonItem, IonLabel, IonAvatar, IonIcon, IonButton],
})
export class AddFriendComponent implements OnInit {
  @Input() users!: User[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  sendFriendRequest(user: User) {
    this.modalController.dismiss({
      user,
      role: 'send',
    });
  }
}

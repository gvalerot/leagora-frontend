import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user';
import { IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'fs-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
  imports: [IonItem, IonLabel, CommonModule],
})
export class FriendListComponent implements OnInit {
  @Input() friends!: User[];
  constructor() {}

  ngOnInit() {}
}

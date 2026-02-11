import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FriendRequest } from 'src/app/models/friendRequest';
import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'fs-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss'],
  imports: [IonItem, IonLabel, IonButton, IonIcon, CommonModule],
})
export class PendingRequestComponent implements OnInit {
  @Input() pendingRequest!: FriendRequest[];
  @Output() acceptRequest = new EventEmitter<FriendRequest>();
  @Output() rejectRequest = new EventEmitter<FriendRequest>();

  constructor() {}

  ngOnInit() {}

  acceptRequestHandler(req: FriendRequest) {
    this.acceptRequest.emit(req);
    this.pendingRequest = this.pendingRequest.filter(
      (item) => item.id !== req.id
    );
  }

  rejectRequestHandler(req: FriendRequest) {
    this.rejectRequest.emit(req);
    this.pendingRequest = this.pendingRequest.filter(
      (item) => item.id !== req.id
    );
  }
}

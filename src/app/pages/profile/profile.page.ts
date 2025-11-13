import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  selector: 'fs-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

}

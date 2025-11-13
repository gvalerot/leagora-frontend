import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../auth';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class LoginPage {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/tabs/home']),
      error: () => this.error = 'Usuario o contraseña incorrecta'
    });
  }
}

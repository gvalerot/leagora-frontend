import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../auth';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: `./register.page.html`,
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        alert('Cuenta creada con éxito.');
        this.router.navigateByUrl('/login');
      },
      error: err => {
        console.error(err);
        alert('Error al crear la cuenta.');
      }
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}

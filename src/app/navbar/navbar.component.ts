import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly authStore = inject(AuthStore);
  readonly authService = inject(AuthService);
  readonly user = this.authStore.user;

  logout() {
    this.authStore.requestLogout();
  }
}

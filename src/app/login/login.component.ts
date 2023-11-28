import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthStore } from '../store/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: 'login.component.html',
  styles: ``,
})
export class LoginComponent {
  readonly authStore = inject(AuthStore);
  readonly fb = inject(FormBuilder);
  readonly loginForm = this.fb.group({
    email: 'john.doe@example.com',
    password: '123',
  });

  submitLogin() {
    this.authStore.requestLogin({
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'angular-ngrx-signal-store-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <form
      class="flex flex-col w-fit"
      [formGroup]="loginForm"
      (ngSubmit)="submitLogin()"
    >
      <label>
        <span class="label">e-mail</span>
        <input
          class="input input-bordered"
          type="text"
          formControlName="email"
        />
      </label>
      <label>
        <span class="label">Password</span>
        <input
          class="input input-bordered"
          type="password"
          formControlName="password"
        />
      </label>
      <button class="btn-primary btn mt-12">Login</button>
    </form>
  `,
  styles: ``,
})
export class LoginComponent {
  readonly fb = inject(FormBuilder);
  readonly loginForm = this.fb.group({
    email: '',
    password: '',
  });

  submitLogin() {
    alert(JSON.stringify(this.loginForm.value, undefined, 2));
  }
}

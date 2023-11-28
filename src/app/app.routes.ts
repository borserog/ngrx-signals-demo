import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './services/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];

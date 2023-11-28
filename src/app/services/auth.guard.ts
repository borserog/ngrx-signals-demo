import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthStore).isAuthenticated();
  const router = inject(Router);

  if (!isAuthenticated) {
    return router.parseUrl('');
  }

  return true;
};

import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export interface User {
  email: string;
  profilePicture: string;
  name: string;
  bio: string;
  birthday: string;
}

export interface AuthState {
  isLoading: boolean; // Loading state for authentication processes
  user: User | null; // User information if authenticated, null otherwise
  error: string | null; // Holds any authentication errors or is null if no error
}

export const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    userAge: computed(() => user() && calculateAge((user() as User).birthday)),
    isAuthenticated: computed(() => user() !== null),
  })),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      requestLogin: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((credentials) => {
            return authService.login(credentials).pipe(
              catchError((err) => {
                patchState(store, { error: err, isLoading: false });
                return EMPTY;
              })
            );
          }),
          tap(async (user) => {
            patchState(store, { user, isLoading: false });
            await router.navigate(['home']);
          })
        )
      ),
      requestLogout: rxMethod<void>(
        pipe(
          switchMap(() => {
            return authService.logout();
          }),
          tap(async () => {
            patchState(store, { user: null });
            await router.navigate(['']);
          })
        )
      ),
    })
  )
);

function calculateAge(birthdate: string) {
  // Parse the birthdate string into a Date object
  const birthDate = new Date(birthdate);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    // If not, subtract 1 from the age
    return age - 1;
  } else {
    return age;
  }
}

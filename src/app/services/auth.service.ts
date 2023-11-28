import { Injectable } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';
import { User } from '../store/auth.store';

const believableMockUser: User = {
  email: 'john.doe@example.com',
  profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  name: 'John Doe',
  birthday: '1970-1-1',
  bio: 'Passionate about technology and always looking to learn new things. Software developer by day, avid reader and nature lover by night.',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(credentials: { email: string; password: string }): Observable<User> {
    const isValid =
      credentials.email === believableMockUser.email &&
      credentials.password === '123';

    return timer(2000).pipe(
      map(() => {
        if (isValid) {
          return believableMockUser;
        } else {
          throw Error(`User doesn't exist`);
        }
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}

import { Injectable, WritableSignal, signal } from '@angular/core';
import { BaseApiService } from '../../models/base-api-service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  $user: WritableSignal<User | null> = signal(null);
  constructor() {
    super('auth');
  }

  login(username: string, password: string): Observable<any> {
    return super
      .post('/login', { username, password })
      .pipe(catchError(() => EMPTY));
  }

  register(
    username: string,
    password: string,
    email: string
  ): Observable<void> {
    return super.post('/register', { username, password, email });
  }

  setUser(user: User): void {
    this.$user.set(user);
  }
}

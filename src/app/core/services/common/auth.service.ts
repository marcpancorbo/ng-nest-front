import { Injectable, WritableSignal, signal } from '@angular/core';
import { BaseApiService } from '../../models/base-api-service';
import { EMPTY, Observable, catchError, delay, finalize } from 'rxjs';
import { User } from '../../models/user';
import { UserRole } from '../../enums/user-roles';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  $user: WritableSignal<User | null> = signal(null);
  $loading: WritableSignal<boolean> = signal(false);
  constructor() {
    super('auth');
  }

  login(username: string, password: string): Observable<any> {
    this.$loading.set(true);
    return super.post('/login', { username, password }).pipe(
      finalize(() => {
        this.$loading.set(false);
      }),
      catchError(() => EMPTY)
    );
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      this.$user.set(null);
      sessionStorage.removeItem('user');
      observer.next();
      observer.complete();
    });
  }

  register(
    username: string,
    password: string,
    email: string,
    role: UserRole
  ): Observable<void> {
    return super.post('/register', { username, password, email, role });
  }

  setUser(user: User): void {
    this.$user.set(user);
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../models/user';
import { AuthService } from '../services/common/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  return next(
    (req = req.clone({
      headers: authService.$user()
        ? req.headers.set(
            'Authorization',
            `Bearer ${authService.$user()?.access_token}`
          )
        : req.headers,
    }))
  );
};

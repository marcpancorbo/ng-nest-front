import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const isNotAuthenticatedGuard: CanMatchFn = (route, segments) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isNotAuthenticated = authService.$user() === null;
  if (!isNotAuthenticated) {
    router.navigate(['/']);
  }
  return isNotAuthenticated;
};

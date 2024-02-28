import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/common/auth.service';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanMatchFn = (route, segments) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAuthenticated = authService.$user() !== null;
  if (!isAuthenticated) {
    router.navigate(['/authentication']);
  }
  return isAuthenticated;
};

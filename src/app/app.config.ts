import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NZ_DATE_LOCALE, NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { authInterceptor } from './core/inteceptors/auth.interceptor';
import { AuthService } from './core/services/common/auth.service';
import { User } from './core/models/user';

export function loadUser(authService: AuthService) {
  return () => {
    const user: User = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user') as string)
      : null;
    if (user) {
      authService.setUser(user);
    }
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_DATE_LOCALE, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: loadUser,
      multi: true,
      deps: [AuthService],
    },
  ],
};

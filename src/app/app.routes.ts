import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { NotFoundComponent } from './core/layout/pages/not-found/not-found.component';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'authentication',
        canMatch: [isNotAuthenticatedGuard],
        loadChildren: () =>
          import('./routes/authentication/authentication.routes').then(
            (m) => m.AUTHENTICATION_ROUTES
          ),
      },
      {
        path: 'characters',
        canMatch: [isAuthenticatedGuard],
        loadChildren: () =>
          import('./routes/characters/characters.routes').then(
            (m) => m.CHARACTERS_ROUTES
          ),
      },
      {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full',
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];

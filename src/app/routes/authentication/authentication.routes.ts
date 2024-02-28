import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const AUTHENTICATION_ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

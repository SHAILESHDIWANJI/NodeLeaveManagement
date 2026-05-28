import { Routes } from '@angular/router';
import { AuthComponent } from './auth';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () =>
            import('./login/login').then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register').then(m => m.Register)
      }
    ]
  }
];
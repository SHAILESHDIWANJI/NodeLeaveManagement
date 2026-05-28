import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { AuthComponent } from './features/auth/auth';
import { AuthGuard } from '../core/guards/authGuard';

export const routes: Routes = [
   {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/authRouting').then(m => m.AUTH_ROUTES)
  },

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  { path:"staff/:id", loadComponent: () => import('./features/staff/staff').then(m => m.Staff), canActivate: [AuthGuard] },
  { path:"hod/:id", loadComponent: () => import('./features/hod/hod').then(m => m.Hod), canActivate: [AuthGuard] }
];

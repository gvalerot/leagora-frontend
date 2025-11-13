import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./auth/pages/login/login.page').then(m => m.LoginPage)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./auth/pages/register/register.page').then(m => m.RegisterPage)
  },
  { 
    path: 'tabs', 
    loadComponent: () => import('./pages/tabs/tabs.component').then(m => m.TabsPage),
    canActivate: [authGuard],
    children: [
      { 
        path: '', // ← Ruta por defecto dentro de tabs
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { 
        path: 'home', 
        loadComponent: () => import('./home/home.page').then(m => m.HomePage) 
      },
      { 
        path: 'leagues', 
        loadComponent: () => import('./pages/league/leagues.page').then(m => m.LeaguesPage) 
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
      }
    ]
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/notFound/not-found.page').then( m => m.NotFoundPage)
  },
   { 
    path: '**', 
    redirectTo: 'not-found' 
  },
];
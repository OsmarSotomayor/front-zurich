import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent) 
  },
  { 
    path: 'client', 
    loadComponent: () => import('./components/client/client.component').then(m => m.ClientComponent) 
  },
  { 
    path: '**', 
    redirectTo: 'login'  // Manejo de rutas no encontradas
  }
];
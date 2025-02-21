import { Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';   
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard], 
    data: { role: 'admin' } 
  }, 
  { path: 'user', 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard], 
    data: { role: 'user' }
   },  
  { path: '**', redirectTo: '' }  
];



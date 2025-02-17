import { Routes } from '@angular/router';
import { LoginComponent } from './home/login/login.component';   

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },  
  { path: '**', redirectTo: '' }  
];



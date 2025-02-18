// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { ViewFormsComponent } from './view-forms/view-forms.component';
// import { CreateFormComponent } from './create-form/create-form.component';

// @NgModule({
  
//   exports: [AdminDashboardComponent],
//   imports: [CommonModule, AdminDashboardComponent,  RouterModule.forChild([
//     {
//       path: '',
//       component: AdminDashboardComponent, 
//     children: [
//       { path: '', redirectTo: 'view-forms', pathMatch: 'full' },
//       { path: 'view-forms', component: ViewFormsComponent },
//       { path: 'create-form', component: CreateFormComponent },]
//     }
//   ])
// ]
// })
// export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, AdminDashboardComponent], 
  exports: [AdminDashboardComponent] 
})
export class AdminModule { }

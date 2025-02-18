import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { CreateFormComponent } from './create-form/create-form.component';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'view-forms', pathMatch: 'full' },
      { path: 'view-forms', component: ViewFormsComponent },
      { path: 'create-form', component: CreateFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { ViewResponsesComponent } from './view-responses/view-responses.component';
import { CreateFormComponent } from './create-form/create-form.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, AdminDashboardComponent, ViewFormsComponent, ViewResponsesComponent, CreateFormComponent], 
  exports: [AdminDashboardComponent] 
})
export class AdminModule { }

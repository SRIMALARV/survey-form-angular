import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AvailableFormsComponent } from './available-forms/available-forms.component';
import { FormComponent } from './form/form.component';
import { userRoutingModule } from './user-routing.module';

@NgModule({
  exports: [UserDashboardComponent],
  imports: [CommonModule, UserDashboardComponent, AvailableFormsComponent, FormComponent, userRoutingModule]
})
export class UserModule { }

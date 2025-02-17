import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AvailableFormsComponent } from './available-forms/available-forms.component';

@NgModule({
  exports: [UserDashboardComponent],
  imports: [CommonModule, UserDashboardComponent, RouterModule.forChild(
    [
      { path: '', component: UserDashboardComponent,
        children:[
        { path: '', redirectTo: 'available-forms', pathMatch: 'full' },
        {path: 'available-forms', component: AvailableFormsComponent}
        ]
      }
    ]
  )]
})
export class UserModule { }

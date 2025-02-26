import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [LoginComponent],
  imports: [ CommonModule, FormsModule, LoginComponent ]
})
export class HomeModule { }

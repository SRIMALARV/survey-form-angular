import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleManagerService } from '../role-manager.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm: FormGroup;
  faUser = faUser;
  faLock = faLock;

  constructor(private router: Router, private roleManagerService: RoleManagerService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onLogin(): void {
    const users = [
      { username: 'a', password: 'aa', role: 'admin' },
      { username: 'u', password: 'uu', role: 'user' }
    ];
    const { username, password } = this.loginForm.value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      this.roleManagerService.setRole(user.role);
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (user.role === 'user') {
        this.router.navigate(['/user']);
      }
    } else {
      this.errorMessage = 'Invalid login credentials. Try again!';
    }
  }
}

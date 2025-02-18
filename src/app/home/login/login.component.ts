import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleManagerService } from '../role-manager.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private roleManagerService: RoleManagerService) {}

  onLogin(): void {
    const users = [
      { username: 'a', password: 'aa', role: 'admin' },
      { username: 'u', password: 'uu', role: 'user' }
    ];
    const user = users.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      this.roleManagerService.setRole(user.role);  
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (user.role === 'user') {
        this.router.navigate(['/user']);
      }
    } else {
      this.errorMessage = 'Invalid credentials!';
    }
  }
}

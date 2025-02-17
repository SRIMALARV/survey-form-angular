import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleManagerService } from '../../home/role-manager.service'; 

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
constructor(private router: Router, private roleService: RoleManagerService) {}

  logout(): void {
    this.roleService.clearRole(); 
    this.router.navigate(['/login']); 
  }
}

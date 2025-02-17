import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoleManagerService } from '../../home/role-manager.service'; 

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private router: Router, private roleService: RoleManagerService) {}

  logout(): void {
    this.roleService.clearRole(); 
    this.router.navigate(['/login']); 
  }
}

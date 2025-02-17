import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { RouterOutlet } from '@angular/router';
import { ViewFormsComponent } from '../view-forms/view-forms.component';
import { Router, RouterLink } from '@angular/router';
import { RoleManagerService } from '../../home/role-manager.service'; 

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, AdminNavbarComponent, ViewFormsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
 constructor(private router: Router, private roleService: RoleManagerService) {}

  logout(): void {
    this.roleService.clearRole(); 
    this.router.navigate(['/login']); 
  }
}

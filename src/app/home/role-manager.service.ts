import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {
  private roleSource = new BehaviorSubject<string | null>(null);  
  role$ = this.roleSource.asObservable();  

  setRole(role: string): void {
    this.roleSource.next(role);  
    //localStorage.setItem('userRole', role);  
  }

  getRole(): string | null {
    return this.roleSource.getValue();  
  }

  clearRole(): void {
    this.roleSource.next(null);  
    //localStorage.removeItem('userRole'); 
  }
}

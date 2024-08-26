import { Injectable } from '@angular/core';
import {  CanActivate,  Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataService: DataService,private authService: AuthService, private router: Router) {}
  
  getToken(): string | null {
    return sessionStorage.getItem('token');  
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      const dataToPass = { toastType: 'danger',toastMessage: 'Sesión expirada',showMessage: true}; 
      this.dataService.setData(dataToPass);
      this.router.navigate(['/login']); 
      return false;
    }
  }
 
}

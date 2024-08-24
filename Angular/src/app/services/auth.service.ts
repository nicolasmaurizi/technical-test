import { Injectable } from'@angular/core';
import { HttpClient } from'@angular/common/http';
import { Observable } from'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; 
  private loggedIn = false;

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    this.loggedIn = true;
    const body = { email, password };
    return this.http.post<any>(this.apiUrl+'/auth/login', body);
  }

  logout(): void {
    this.loggedIn = false;
    this.http.post<any>(this.apiUrl+'/auth/logout', {}).subscribe(
      response => {
        sessionStorage.clear();
      },
      error => {
        // TODO: error Toast component
        window.alert('Error al cerrar sesión');
      }
    );
  }
  
}

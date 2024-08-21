import { Injectable } from'@angular/core';
import { HttpClient } from'@angular/common/http';
import { Observable } from'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/auth/login'; 
  
  private loggedIn = false;

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    this.loggedIn = true;
    const body = { email, password };
    return this.http.post<any>(this.apiUrl, body);
  }

  logout(): void {
    this.loggedIn = false;
  }
  
}

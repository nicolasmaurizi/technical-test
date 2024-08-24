import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

export interface Employee {
  _id?: string;
  lastname: string;
  name: string;
  email: string;
  position: string;
  birthday: Date;
  createdAt: Date;
  
}

@Injectable({
  providedIn: 'root',
})
export class 

EmployeeService {
  private apiUrl = environment.apiUrl+'/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(`${this.apiUrl}/${id}`);
    
  }
}


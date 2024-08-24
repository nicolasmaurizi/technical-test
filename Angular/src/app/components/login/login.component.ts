import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from'@angular/router';
import { NgForm } from'@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router,private dataService: DataService) { }

  email: string = '';
  password: string = '';
  recoveryTittle: string = 'Recuperar contraseña';
  registerTittle: string = '¿No tiene cuenta? Regístrese';

  navigateToEmployeeList() {
    const dataToPass = { toastMessage: 'Bienvenido '+sessionStorage.getItem('username'),showMessage: true}; 
    this.dataService.setData(dataToPass);
    this.router.navigate(['/employees']);
  }
/*
  navigateToRecovery() {
    this.router.navigate(['/recovery']);
  }*/
  onSubmit(form: NgForm): void {
    if (form.valid) {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Store the token and username in session storage
        sessionStorage.setItem('username', response.lastname);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('id', response._id);
        // Redirect to employee list page
        this.navigateToEmployeeList();
      },
      error => {
         // TODO: error Toast component
         window.alert('Credenciales incorrectas');
      }

    );}
    else {
         // TODO: error Toast component
         window.alert('Datos erróneos');
    }
  }

  ngOnInit(): void {
   
  }

}

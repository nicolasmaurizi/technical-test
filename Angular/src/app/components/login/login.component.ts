import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef,private authService: AuthService,private router: Router,private dataService: DataService) { }
  messageToast: string = '';
  showToast: boolean = false;
  toastType: string = 'success';

  email: string = '';
  password: string = '';
  recoveryTittle: string = 'Recuperar contraseña';
  registerTittle: string = '¿No tiene cuenta? Regístrese';

  navigateToEmployeeList() {
    const dataToPass = { toastType: 'success',toastMessage: 'Bienvenido '+sessionStorage.getItem('username'),showMessage: true}; 
    this.dataService.setData(dataToPass);
    this.router.navigate(['/employees']);
  }
/*
  navigateToRecovery() {
    this.router.navigate(['/recovery']);
  }*/
  onSubmit(form: NgForm): void {
    this.cdr.detectChanges();
    if (form.valid) {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Store the token, username and id, in session storage
        sessionStorage.setItem('username', response.lastname);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('id', response._id);
        // Redirect to employee list page
        this.navigateToEmployeeList();
      },
      error => {
         this.showToast = false;
         this.cdr.detectChanges();
         this.messageToast = 'Credenciales incorrectas';
         this.toastType = 'danger';
         this.showToast = true;
      }

    );}
    else {
         this.showToast = false;
         this.cdr.detectChanges();
         this.messageToast = 'Datos erróneos';
         this.toastType = 'danger';
         this.showToast = true;
      }
  }

  ngOnInit(): void {
   
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from'@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { AuthInterceptor } from './auth.interceptor';
import  { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
//import { AlertCloseableComponent } from './components/alert-closeable/alert-closeable.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [AppComponent, EmployeeListComponent, LoginComponent, HomeComponent, ModalComponent, ToastComponent, EmployeeFormComponent, PasswordRecoveryComponent, ChangePasswordComponent,
    // AlertCloseableComponent,

    ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule
  ,NgbToastModule , FormsModule, ReactiveFormsModule,NgbModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


// src/app/app.module.ts
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
//'@ng-bootstrap/ng-bootstrap';
import { NgbToastModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from'@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [AppComponent, EmployeeListComponent, LoginComponent, HomeComponent, ModalComponent, ToastComponent, EmployeeFormComponent,

    ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule
  ,NgbToastModule , FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


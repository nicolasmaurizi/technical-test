import { Component , ChangeDetectorRef, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  token: string | null = null;
  passwordRecoveryForm: FormGroup;
  type : string = '';
  message: string = '';
  constructor(private employeeService: EmployeeService,private route: ActivatedRoute,private cdr: ChangeDetectorRef,private fb: FormBuilder, private http: HttpClient) {
    this.passwordRecoveryForm = this.fb.group({
      pass: ['', [Validators.required, Validators.minLength(8)]],
      repass: ['', [Validators.required, Validators.minLength(8)]],    
    });
   }
   onSubmit() {
    if (this.passwordRecoveryForm.valid && this.token ) {
      sessionStorage.setItem('token', this.token? this.token : '');
      const token_ = this.token? this.token : ''
      this.sendPasswordChangeRequest(token_);
    }
  }

  sendPasswordChangeRequest(token: string) {
      this.employeeService.updateEmployeePass(token,this.passwordRecoveryForm.get('pass')?.value).subscribe(
        (response) => {
          this.message = '';
          this.cdr.detectChanges();
          this.type  = 'success';
          this.message = 'Cambio hecho correctamente';
        },
        (error) => {
          this.message = '';
          this.cdr.detectChanges();
          this.type  = 'danger';

          this.message = error.error.message ;
        }
      );
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'] || null;

    });

  }
}

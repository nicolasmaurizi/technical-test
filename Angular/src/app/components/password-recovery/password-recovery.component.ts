import { Component , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 


@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
})

export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup;
  type : string = '';
  message: string = '';

  constructor(private cdr: ChangeDetectorRef,private fb: FormBuilder, private http: HttpClient) {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.passwordRecoveryForm.valid) {
      const email = this.passwordRecoveryForm.value.email;
      this.sendPasswordRecoveryRequest(email);
    }
  }

  sendPasswordRecoveryRequest(email: string) {
    this.http
      .post(environment.apiUrl+'/email/send/'+ email,'' )
      .subscribe({
        next: () => {
          this.message = '';
          this.cdr.detectChanges();
          this.type  = 'success';
          this.message = 'Solicitud de recuperación enviada';
        },
        error: (error) => {
          this.message = '';
          this.cdr.detectChanges();
          this.type  = 'danger';

          this.message = error.error.message ;
        },
      });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
})
export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
      .post('https://api.tuaplicacion.com/password-recovery', { email })
      .subscribe({
        next: (response) => {
          console.log('Solicitud de recuperación enviada', response);
          // Aquí puedes mostrar un toast de éxito
        },
        error: (error) => {
          console.error('Error al enviar la solicitud', error);
          // Aquí puedes manejar el error y mostrar un mensaje
        },
      });
  }
}

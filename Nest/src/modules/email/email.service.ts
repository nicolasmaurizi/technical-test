import { Injectable } from '@nestjs/common';
import * as Brevo from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  private apiInstance: Brevo.TransactionalEmailsApi;

  constructor() {
    this.apiInstance = new Brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.API_KEY_brevo,
    );
  }

  async sendEmail(): Promise<void> {
    // Simulación de consulta a la base de datos
    const user = {
      name: 'Recuperación de contraseña',
      email: 'nicolasmaurizi@gmail.com',
    };

    try {
      const sendSmtpEmail = new Brevo.SendSmtpEmail();
      sendSmtpEmail.subject = 'Recuperación de contraseña';
      sendSmtpEmail.to = [{ email: 'nicolasmaurizi@gmail.com', name: 'Nicolas' }];
      sendSmtpEmail.htmlContent = `<html><body><h1>Hola ${user.name}</h1><p>This is a test email</p><button>Click me</button><a href='https://www.faztweb.com'>Go to my website</a></body></html>`;
      sendSmtpEmail.sender = { name: 'Empleados', email: 'nicolasmaurizi@gmail.com' };

      const result = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

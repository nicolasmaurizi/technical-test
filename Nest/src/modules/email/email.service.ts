import { Injectable, NotFoundException } from '@nestjs/common';
import * as Brevo from '@getbrevo/brevo';
import { EmployeesService } from '../employees/employees.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class EmailService {
  private apiInstance: Brevo.TransactionalEmailsApi;

  constructor(private readonly employeesService: EmployeesService) {
    this.apiInstance = new Brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.API_KEY_brevo,
    );
  }

  async sendEmail(email: string): Promise<void> {
    const user = await this.employeesService.findOne(email);
    if (!user) {
      throw new NotFoundException('No existe registro con el E-mail solicitado');
    }
    try {

      const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET || 'technical-test', 
        { expiresIn: '1h' }
      );

      const info = process.env.DOMINIO_fe +'/'+ token;
    
      const sendSmtpEmail = new Brevo.SendSmtpEmail();
      sendSmtpEmail.subject = 'Recuperación de contraseña';
      sendSmtpEmail.to = [{ email: email, name: user.name }];
      sendSmtpEmail.htmlContent = `<html><body><h1>Hola ${user.name}</h1><p>Se ha solicitado un cambio de contraseña. Si usted no realizó esta solicitud, por favor ignore este correo. De lo contrario, haga clic en el siguiente enlace para modificar su contraseña: </p><a href='${info}'>Enlace</a></body></html>`;
      sendSmtpEmail.sender = {
        name: 'No-response',
        email: 'nicolasmaurizi@gmail.com',
      };

      const result = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}

import { Controller, Post, Param } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send/:email')
  async sendEmail(@Param('email') email:string ): Promise<void> {
      await this.emailService.sendEmail(email);
  }
}

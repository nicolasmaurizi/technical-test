import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmployeesModule } from '../employees/employees.module';

@Module({

  imports: [EmployeesModule],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}

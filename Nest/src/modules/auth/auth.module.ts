import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeesModule } from '../employees/employees.module';
import { EmployeesService } from '../employees/employees.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
   
    JwtModule.register({
      secret: 'yourSecretKey', 
      signOptions: { expiresIn: '60s' },
    }),EmployeesModule],
  providers: [AuthService, EmployeesService],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}

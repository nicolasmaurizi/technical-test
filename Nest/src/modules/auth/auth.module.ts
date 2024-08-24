import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeesModule } from '../employees/employees.module';
import { EmployeesService } from '../employees/employees.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; 
import { JwtStrategy } from './jwt.strategy'; 
import { TokenModule } from '../token/token.module'; 

@Module({
  imports: [ 
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'technical-test', 
      signOptions: { expiresIn: '20s' },
    }),EmployeesModule,TokenModule],
  providers: [AuthService, EmployeesService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}

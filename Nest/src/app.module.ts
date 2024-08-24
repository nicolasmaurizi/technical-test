import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './modules/employees/employees.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from './modules/token/token.module';
import { EmailModule } from './modules/email/email.module'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,MongooseModule.forRoot(process.env.MONGO_URI), EmployeesModule, TokenModule,EmailModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

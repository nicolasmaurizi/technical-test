import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './modules/employees/employees.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,MongooseModule.forRoot(process.env.MONGO_URI), EmployeesModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

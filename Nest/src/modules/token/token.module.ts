import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenSchema } from '../token/schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService], 
})

export class TokenModule {}

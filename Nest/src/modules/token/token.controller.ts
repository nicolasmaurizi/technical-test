import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('tokens')
export class TokenController {
  //constructor(private readonly tokenService: TokenService) {}

  /* endpoint not used in this project

  @Post()
  async createToken(@Body() createTokenDto: { token: string, userId: string, expiresAt: Date }) {
    return this.tokenService.saveToken(createTokenDto.token, createTokenDto.userId, createTokenDto.expiresAt);
  }

  @Delete(':token')
  async deleteToken(@Param('token') token: string) {
    return this.tokenService.deleteToken(token);
  }
  */
}

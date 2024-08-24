import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { TokenService } from '../token/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      // header extracted from request
      const authHeader = req.headers.authorization;
      // token extracted from header
      const token = authHeader?.split(' ')[1];

      if (!token) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Token missing' });
      }
      this.tokenService.deleteToken(token); // delete Token from mongo
      return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Logout failed', error });
    }
  }
}

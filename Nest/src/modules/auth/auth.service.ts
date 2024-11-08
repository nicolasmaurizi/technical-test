import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private readonly jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async signIn(email: string, _password: string): Promise<any> {
    const user = await this.employeesService.findOne(email);

    if (user && (await bcrypt.compare(_password, user.password))) {
      const payload = { username: user.name, sub: user._id };
      const token = this.jwtService.sign(payload);
      const result = {
        lastname: user.lastname,
        _id: user._id,
        token: token,
      };

      await this.tokenService.saveToken(token, user._id, new Date(Date.now()));
      return result;
    }

    throw new UnauthorizedException();
  }
}

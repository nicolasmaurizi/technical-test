import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from './schemas/token.schema';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private tokenModel: Model<Token>) {}

  async saveToken(
    token: string,
    userId: string,
    expiresAt: Date,
  ): Promise<Token> {
    const tokenDocument = new this.tokenModel({
      token,
      userId,
      expiresAt,
    });
    return tokenDocument.save();
  }

  async findToken(token: string): Promise<Token> {
    return this.tokenModel.findOne({ token });
  }

  async deleteToken(token: string): Promise<void> {
    await this.tokenModel.findOneAndDelete({ token });
  }
}

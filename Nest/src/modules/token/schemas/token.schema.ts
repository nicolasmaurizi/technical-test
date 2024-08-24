import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;
@Schema()
export class Token {
  @Prop()
  token: string;
  @Prop()
  userId: string;
  @Prop({ default: Date.now }) 
  createdAt: Date;
}
export const TokenSchema  = SchemaFactory.createForClass(Token);


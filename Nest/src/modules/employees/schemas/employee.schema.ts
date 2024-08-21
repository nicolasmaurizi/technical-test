import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;
@Schema()
export class Employee {
  @Prop()
  _id?: string;
  @Prop()
  name?: string;
  @Prop()
  lastname?: string;
  @Prop({unique: true, required: true})
  email: string;
  @Prop()
  password?: string;
  @Prop()
  entrydate? : Date;
  @Prop()
  position?: string;
  @Prop({ default: Date.now }) 
  createdAt: Date;
  @Prop()
  updatedAt?: Date;
  @Prop()
  deletedAt?: Date;
  @Prop()
  deleted?: boolean;
  @Prop()
  birthday?: Date;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);

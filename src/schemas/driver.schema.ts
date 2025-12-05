import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DriverDocument = Driver & Document;

@Schema({ timestamps: true })
export class Driver {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  licenseNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  termsAccepted: boolean;

  @Prop()
  termsAcceptedDate: Date;

  @Prop()
  photo: string;

  @Prop({ default: 'DRIVER' })
  role: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);

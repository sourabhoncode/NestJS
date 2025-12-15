import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DriverDocument = Driver & Document;

@Schema({ timestamps: true })
export class Driver {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  profileImage: string;

  @Prop({ required: true })
  agreement: boolean;

  @Prop({ required: true, unique: true })
  driverLicense: string;

  @Prop({
    type: {
      bloodGroup: String,
      certificates: [String],
      dob: Date,
      emergencyContact: {
        name: String,
        phone: String,
        relationship: String,
      },
      languages: [String],
    },
    default: {},
  })
  personalInfo: {
    bloodGroup?: string;
    certificates?: string[];
    dob?: Date;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
    languages?: string[];
  };

  @Prop({
    type: {
      yearsOfExperience: Number,
      licensedSince: Date,
      totalTripsCompleted: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
    },
    default: {},
  })
  drivingExperience: {
    yearsOfExperience?: number;
    licensedSince?: Date;
    totalTripsCompleted?: number;
    averageRating?: number;
  };

  @Prop({ default: 'DRIVER' })
  role: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);

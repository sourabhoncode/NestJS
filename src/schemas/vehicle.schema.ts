import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {

    @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
    driverId: Types.ObjectId;

    @Prop({ required: true })
    vehicleNumber: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    brand: string;

    @Prop({ default: false })
    isVerified: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

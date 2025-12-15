import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
    @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
    driverId: Types.ObjectId;

    // Vehicle Details
    @Prop({ required: true })
    make: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    year: number;

    @Prop({ required: true })
    seats: number;

    @Prop({ required: true })
    licensePlate: string;

    @Prop({ required: true })
    vehicleType: string; // e.g., "Sedan", "SUV", "Hatchback"

    @Prop({ required: true })
    vehicleClass: string; // e.g., "Eco", "Comfort", "Premium"

    // Fare & Fees
    @Prop({ required: true })
    baseFare: number; // in rupees

    @Prop({ required: true })
    perKilometerRate: number; // in rupees

    @Prop({ required: true })
    minimumFare: number; // in rupees

    @Prop({ required: true })
    waitingCharge: number; // in rupees per hour

    // Documents
    @Prop({ type: String, default: null })
    licenseDocument: string; // file path or URL

    @Prop({ type: String, default: null })
    insuranceDocument: string; // file path or URL

    @Prop({ type: String, default: null })
    addressProofDocument: string; // file path or URL

    @Prop({ type: String, default: null })
    policeCertificateDocument: string; // file path or URL

    // Vehicle Images
    @Prop({ type: [String], default: [] })
    vehicleImages: string[]; // array of image URLs

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ default: true })
    isActive: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

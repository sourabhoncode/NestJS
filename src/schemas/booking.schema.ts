import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
    @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
    driverId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Vehicle', required: true })
    vehicleId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    // Booking Details
    @Prop({ required: true })
    pickupLocation: string;

    @Prop({ required: true })
    dropoffLocation: string;

    @Prop()
    pickupLatitude?: number;

    @Prop()
    pickupLongitude?: number;

    @Prop()
    dropoffLatitude?: number;

    @Prop()
    dropoffLongitude?: number;

    // Timing
    @Prop({ required: true })
    bookingTime: Date;

    @Prop()
    startTime?: Date;

    @Prop()
    endTime?: Date;

    // Distance & Fare
    @Prop()
    estimatedDistance?: number; // in kilometers

    @Prop()
    estimatedFare?: number;

    @Prop()
    actualDistance?: number;

    @Prop()
    actualFare?: number;

    @Prop()
    waitingTime?: number; // in minutes

    @Prop()
    waitingCharges?: number;

    // Status
    @Prop({
        enum: [
            'PENDING',
            'ACCEPTED',
            'DRIVER_ARRIVED',
            'IN_PROGRESS',
            'COMPLETED',
            'CANCELLED',
        ],
        default: 'PENDING',
    })
    status: string;

    // Payment
    @Prop({ enum: ['CASH', 'CARD', 'WALLET', 'UPI'], default: 'CASH' })
    paymentMethod: string;

    @Prop({ default: false })
    paymentCompleted: boolean;

    // User & Driver notes
    @Prop()
    userNotes?: string;

    @Prop()
    driverNotes?: string;

    // Ratings
    @Prop({ min: 0, max: 5 })
    driverRating?: number;

    @Prop()
    driverReview?: string;

    @Prop({ min: 0, max: 5 })
    userRating?: number;

    @Prop()
    userReview?: string;

    @Prop({ default: false })
    isCompleted: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

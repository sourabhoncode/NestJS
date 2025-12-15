import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsObject,
    Min,
    Max,
} from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    @IsString()
    vehicleId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsObject()
    pickupLocation: {
        address: string;
        latitude: number;
        longitude: number;
    };

    @IsNotEmpty()
    @IsObject()
    dropoffLocation: {
        address: string;
        latitude: number;
        longitude: number;
    };

    @IsNotEmpty()
    bookingTime: Date;

    @IsOptional()
    @IsObject()
    coordinates?: {
        pickupLat: number;
        pickupLng: number;
        dropoffLat: number;
        dropoffLng: number;
    };

    @IsOptional()
    @IsNumber()
    @Min(0)
    estimatedDistance?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    estimatedFare?: number;

    @IsOptional()
    @IsString()
    userNotes?: string;

    @IsOptional()
    @IsString()
    paymentMethod?: string; // CASH, CARD, WALLET, UPI
}

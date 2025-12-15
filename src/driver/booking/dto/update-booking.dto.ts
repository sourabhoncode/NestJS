import {
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
    Min,
    Max,
} from 'class-validator';

export class UpdateBookingDto {
    @IsOptional()
    @IsString()
    status?: string; // PENDING, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED

    @IsOptional()
    startTime?: Date;

    @IsOptional()
    endTime?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    actualDistance?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    actualFare?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    waitingCharges?: number;

    @IsOptional()
    @IsString()
    driverNotes?: string;

    @IsOptional()
    @IsBoolean()
    paymentCompleted?: boolean;

    @IsOptional()
    @IsString()
    paymentMethod?: string; // CASH, CARD, WALLET, UPI
}

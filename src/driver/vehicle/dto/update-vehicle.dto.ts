import {
    IsString,
    IsNumber,
    IsArray,
    IsOptional,
    Min,
    Max,
} from 'class-validator';

export class UpdateVehicleDto {
    @IsOptional()
    @IsString()
    make?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsNumber()
    @Min(1900)
    @Max(new Date().getFullYear() + 1)
    year?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    seats?: number;

    @IsOptional()
    @IsString()
    licensePlate?: string;

    @IsOptional()
    @IsString()
    vehicleType?: string;

    @IsOptional()
    @IsString()
    vehicleClass?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    baseFare?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    perKilometerRate?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    minimumFare?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    waitingCharge?: number;

    @IsOptional()
    @IsString()
    licenseDocument?: string;

    @IsOptional()
    @IsString()
    insuranceDocument?: string;

    @IsOptional()
    @IsString()
    addressProofDocument?: string;

    @IsOptional()
    @IsString()
    policeCertificateDocument?: string;

    @IsOptional()
    @IsArray()
    vehicleImages?: string[];

    @IsOptional()
    isActive?: boolean;
}

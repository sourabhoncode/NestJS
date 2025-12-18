import {
    IsString,
    IsNumber,
    IsArray,
    IsOptional,
    IsObject,
    Min,
    Max,
    IsNotEmpty,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DocumentsDto {
    @IsOptional()
    @IsString()
    drivingLicense?: string;

    @IsOptional()
    @IsString()
    insuranceProof?: string;

    @IsOptional()
    @IsString()
    addressProof?: string;

    @IsOptional()
    @IsString()
    policeCertificate?: string;
}

class FareStructureDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    minimumFare: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    perKilometerRate: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    waitingChargePerMinute: number;
}

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1900)
    @Max(new Date().getFullYear() + 1)
    year: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    seats: number;

    @IsNotEmpty()
    @IsString()
    licensePlateNumber: string;

    @IsNotEmpty()
    @IsString()
    vehicleType: string;

    @IsNotEmpty()
    @IsString()
    vehicleClass: string;

    @IsOptional()
    @IsString()
    vehicleImage?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => DocumentsDto)
    documents?: DocumentsDto;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => FareStructureDto)
    fareStructure: FareStructureDto;
}

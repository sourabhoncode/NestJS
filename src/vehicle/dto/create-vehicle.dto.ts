import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    vehicleNumber: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsString()
    brand: string;
}

import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    fullName?: string;

    @IsOptional()
    phoneNumber?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    location?: {
        latitude: number;
        longitude: number;
    };

    @IsOptional()
    @IsBoolean()
    agreement?: boolean;
}

import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    fullName?: string;

    @IsOptional()
    phoneNumber?: string;
}

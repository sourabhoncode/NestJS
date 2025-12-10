import { IsEmail, IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsNotEmpty()
    role: 'USER' | 'DRIVER';

    // Only if Driver
    @ValidateIf(o => o.role === 'DRIVER')
    @IsNotEmpty()
    phone?: string;

    @ValidateIf(o => o.role === 'DRIVER')
    @IsNotEmpty()
    licenseNumber?: string;

    // Optional for both — no validation necessary
    photo?: string;
}

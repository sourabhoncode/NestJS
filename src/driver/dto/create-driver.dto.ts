import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @Matches(/^KL-(0[1-9]|1[0-4])-\d{4}-\d{7}$/, { message: 'Invalid license number format' })
  licenseNumber: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  termsAccepted: boolean;
  photo?: string;
}

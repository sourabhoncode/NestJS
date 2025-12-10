import { IsEmail, IsNotEmpty, Matches, MinLength, IsBoolean } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  // Supports both formats:
  // KL-01-2024-1234567  OR  KL-07-AB-1234
  @Matches(/^(KL-(0[1-9]|1[0-4])-\d{4}-\d{7}|KL-(0[1-9]|1[0-4])-[A-Z]{2}-\d{4})$/, {
    message: 'License number must be valid KL format',
  })
  licenseNumber: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  confirmPassword: string;

  @IsBoolean()
  termsAccepted: boolean;

  photo?: string;
}

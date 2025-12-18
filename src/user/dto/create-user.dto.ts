import { IsEmail, IsNotEmpty, MinLength, IsPhoneNumber, IsBoolean } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  location: {
    latitude: number;
    longitude: number;
  };

  @IsBoolean()
  agreement: boolean;
}

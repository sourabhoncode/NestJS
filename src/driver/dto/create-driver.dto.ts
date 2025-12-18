import { IsEmail, IsNotEmpty, MinLength, IsBoolean, IsOptional, Matches } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  driverLicenseNumber: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  profileImage?: string;

  @IsBoolean()
  agreement: boolean;

  @IsOptional()
  personalInfo?: {
    bloodGroup?: string;
    certificates?: string[];
    dob?: string; // DD/MM/YYYY format
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
    languages?: string[];
  };

  @IsOptional()
  drivingExperience?: {
    yearsOfExperience?: number;
    licensedSince?: string; // DD/MM/YYYY format
    totalTripsCompleted?: number;
    averageRating?: number;
  };
}

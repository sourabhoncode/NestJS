import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateDriverDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsBoolean()
  agreement?: boolean;

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

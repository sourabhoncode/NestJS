import { IsOptional, IsString } from 'class-validator';

export class UpdateDriverDto {
  
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}

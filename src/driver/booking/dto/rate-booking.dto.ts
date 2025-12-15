import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class RateBookingDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;

    @IsOptional()
    @IsString()
    review?: string;
}

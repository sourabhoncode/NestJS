import { IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    fullName?: string;

    @IsOptional()
    photo?: string;
}

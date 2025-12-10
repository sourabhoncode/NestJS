import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LoginDriverDto } from '../driver/dto/login-driver.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register-user')
  registerUser(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('register-driver')
  registerDriver(@Body() dto: CreateDriverDto) {
    if (!dto.phone || !dto.licenseNumber) {
      throw new BadRequestException('Phone & License Number required');
    }
    if (!dto.termsAccepted) {
      throw new BadRequestException('Driver must accept terms');
    }
    return this.authService.registerDriver(dto);
  }

  @Post('login-user')
  loginUser(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }

  @Post('login-driver')
  loginDriver(@Body() dto: LoginDriverDto) {
    return this.authService.loginDriver(dto);
  }
}

import { Body, Controller, Post, Patch, UseGuards, Request } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginDriverDto } from './dto/login-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('register')
register(@Body() dto: CreateDriverDto) {
  console.log('DTO:', dto);
  return this.driverService.register(dto);
}

  @Post('login')
login(@Body() dto: LoginDriverDto) {
  return this.driverService.login(dto);
}


  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateDriver(
    @Request() req,
    @Body() updateDto: UpdateDriverDto
  ) {
    const driverId = req.user.id;
    return this.driverService.updateDriver(driverId, updateDto);
  }
}

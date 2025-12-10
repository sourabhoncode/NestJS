import { Body, Controller, Patch, UseGuards, Request } from '@nestjs/common';
import { DriverService } from './driver.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RoleRequired } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleRequired(Role.DRIVER)
  @Patch('update')
  updateDriver(@Request() req, @Body() updateDto: UpdateDriverDto) {
    return this.driverService.updateDriver(req.user.id, updateDto);
  }

}

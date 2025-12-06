import { Body, Controller, Post, Get, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @Post()
    addVehicle(@Request() req, @Body() dto: CreateVehicleDto) {
        return this.vehicleService.create(req.user.id, dto);
    }

    @Get()
    getMyVehicles(@Request() req) {
        return this.vehicleService.findMyVehicles(req.user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
        return this.vehicleService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.vehicleService.delete(id);
    }
}

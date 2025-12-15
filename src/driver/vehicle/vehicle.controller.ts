import {
    Body,
    Controller,
    Patch,
    Post,
    Get,
    Delete,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RoleRequired } from '../../common/decorators/role.decorator';
import { Role } from '../../common/enums/role.enum';

@Controller('drivers/vehicles')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Post()
    createVehicle(
        @Request() req,
        @Body() createVehicleDto: CreateVehicleDto,
    ) {
        return this.vehicleService.createVehicle(req.user.id, createVehicleDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Get()
    getMyVehicles(@Request() req) {
        return this.vehicleService.getDriverVehicles(req.user.id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Get(':vehicleId')
    getVehicleById(@Param('vehicleId') vehicleId: string) {
        return this.vehicleService.getVehicleById(vehicleId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Patch(':vehicleId')
    updateVehicle(
        @Param('vehicleId') vehicleId: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return this.vehicleService.updateVehicle(vehicleId, updateVehicleDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Delete(':vehicleId')
    deleteVehicle(@Param('vehicleId') vehicleId: string) {
        return this.vehicleService.deleteVehicle(vehicleId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Post(':vehicleId/documents/:documentType')
    uploadDocument(
        @Param('vehicleId') vehicleId: string,
        @Param('documentType') documentType: string,
        @Body('documentUrl') documentUrl: string,
    ) {
        return this.vehicleService.addVehicleDocument(
            vehicleId,
            documentType,
            documentUrl,
        );
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Post(':vehicleId/images')
    addVehicleImages(
        @Param('vehicleId') vehicleId: string,
        @Body('imageUrls') imageUrls: string[],
    ) {
        return this.vehicleService.addVehicleImages(vehicleId, imageUrls);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleRequired(Role.DRIVER)
    @Delete(':vehicleId/images/:imageUrl')
    removeVehicleImage(
        @Param('vehicleId') vehicleId: string,
        @Param('imageUrl') imageUrl: string,
    ) {
        return this.vehicleService.removeVehicleImage(vehicleId, imageUrl);
    }
}

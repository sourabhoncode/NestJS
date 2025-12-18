import {
  Body,
  Controller,
  Patch,
  Delete,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverService } from './driver.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RoleRequired } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';
import { S3Service } from '../common/services/s3.service';

@Controller('drivers')
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly s3Service: S3Service,
  ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleRequired(Role.DRIVER)
  @Patch('update')
  updateDriver(@Request() req, @Body() updateDto: UpdateDriverDto) {
    return this.driverService.updateDriver(req.user.id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleRequired(Role.DRIVER)
  @Post('upload-document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const { url, key } = await this.s3Service.uploadFile(
        file,
        `drivers/${req.user.id}/documents`,
      );
      return {
        message: 'Document uploaded successfully',
        url,
        key,
        size: file.size,
        type: file.mimetype,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('reset')
  async resetDrivers() {
    return this.driverService.resetCollection();
  }
}

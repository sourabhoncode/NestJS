import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Driver, DriverSchema } from '../schemas/driver.schema';
import { JwtModule } from '@nestjs/jwt';
import { VehicleModule } from './vehicle/vehicle.module';
import { DateTransformer } from '../common/transformers/date.transformer';
import { S3Service } from '../common/services/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Driver.name, schema: DriverSchema },
    ]),
    JwtModule.register({
      secret: 'MY_SECRET_KEY',
      signOptions: { expiresIn: '7d' },
    }),
    VehicleModule,
  ],
  controllers: [DriverController],
  providers: [DriverService, DateTransformer, S3Service],
  exports: [DriverService],
})
export class DriverModule { }

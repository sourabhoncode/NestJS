import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from '../schemas/driver.schema';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DateTransformer } from '../common/transformers/date.transformer';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    private dateTransformer: DateTransformer,
  ) { }

  // Called by AuthService while registration
  async create(dto: any): Promise<Driver> {
    const transformedDto = this.dateTransformer.transformDates(dto);
    return this.driverModel.create(transformedDto);
  }

  // Used by AuthService while login
  async findByEmail(email: string) {
    return this.driverModel.findOne({ email });
  }

  async findById(id: string) {
    return this.driverModel.findById(id).select('-password');
  }

  async updateDriver(id: string, updateDto: UpdateDriverDto) {
    const transformedDto = this.dateTransformer.transformDates(updateDto);
    return this.driverModel
      .findByIdAndUpdate(id, { $set: transformedDto }, { new: true })
      .select('-password');
  }

  async resetCollection() {
    await this.driverModel.collection.drop();
    return { message: 'Drivers collection reset successfully' };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from '../schemas/driver.schema';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
  ) { }

  // Called by AuthService while registration
  async create(dto: any): Promise<Driver> {
    return this.driverModel.create(dto);
  }

  // Used by AuthService while login
  async findByEmail(email: string) {
    return this.driverModel.findOne({ email });
  }

  async findById(id: string) {
    return this.driverModel.findById(id).select('-password');
  }

  async updateDriver(id: string, updateDto: UpdateDriverDto) {
    return this.driverModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true }
    ).select('-password');
  }
}

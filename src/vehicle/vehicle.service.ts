import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from '../schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
    constructor(
        @InjectModel(Vehicle.name)
        private vehicleModel: Model<VehicleDocument>,
    ) { }

    create(driverId: string, dto: CreateVehicleDto) {
        return this.vehicleModel.create({ driverId, ...dto });
    }

    findMyVehicles(driverId: string) {
        return this.vehicleModel.find({ driverId });
    }

    update(id: string, dto: UpdateVehicleDto) {
        return this.vehicleModel.findByIdAndUpdate(id, dto, { new: true });
    }

    delete(id: string) {
        return this.vehicleModel.findByIdAndDelete(id);
    }
}

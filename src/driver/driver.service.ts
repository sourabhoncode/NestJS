import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateDriverDto } from './dto/create-driver.dto';
import { LoginDriverDto } from './dto/login-driver.dto';
import { Driver, DriverDocument } from '../schemas/driver.schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateDriverDto): Promise<Driver> {
    const { email, phone, licenseNumber, password, confirmPassword } = dto;

    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    const exists = await this.driverModel.findOne({
      $or: [{ email }, { phone }, { licenseNumber }]
    });
    if (exists) throw new ConflictException('Driver already exists');

    const hash = await bcrypt.hash(password, 10);

    return await this.driverModel.create({
      ...dto,
      password: hash,
      termsAcceptedDate: dto.termsAccepted ? new Date() : null,
    });
  }

  async login(dto: LoginDriverDto) {
    const driver = await this.driverModel.findOne({ email: dto.email });
    if (!driver) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(dto.password, driver.password);
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    const token = this.jwtService.sign({ id: driver._id, role: 'DRIVER' });

    return {
      message: 'Login successful',
      token,
      driver: {
        id: driver._id,
        fullName: driver.fullName,
        email: driver.email,
        phone: driver.phone,
        licenseNumber: driver.licenseNumber,
      }
    };
  }

  async updateDriver(id: string, updateDto: any): Promise<any> {
    return this.driverModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true }
    );
  }

  async findByEmail(email: string) {
    return this.driverModel.findOne({ email });
  }
}

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DriverService } from '../driver/driver.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LoginDriverDto } from '../driver/dto/login-driver.dto';
import { UserDocument } from '../schemas/user.schema';
import { DriverDocument } from '../schemas/driver.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly driverService: DriverService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async registerUser(dto: CreateUserDto) {
    dto.password = await bcrypt.hash(dto.password, 10);

    try {
      const newUser = (await this.userService.create(dto)) as UserDocument;

      const token = this.jwtService.sign({
        id: newUser._id.toString(),
        role: 'USER',
      });

      return {
        message: 'User Registration Success',
        token,
        role: 'USER',
        user: newUser,
      };
    } catch (error: any) {
      if (error.code === 11000)
        throw new ConflictException('Email Already Exists');
      throw error;
    }
  }

  async registerDriver(dto: CreateDriverDto) {
    if (dto.password !== dto.confirmPassword)
      throw new ConflictException('Passwords do not match');

    dto.password = await bcrypt.hash(dto.password, 10);

    try {
      const newDriver = (await this.driverService.create(dto)) as DriverDocument;

      const token = this.jwtService.sign({
        id: newDriver._id.toString(),
        role: 'DRIVER',
      });

      return {
        message: 'Driver Registration Success',
        token,
        role: 'DRIVER',
        driver: newDriver,
      };
    } catch (error: any) {
      if (error.code === 11000)
        throw new ConflictException('Driver Already Exists');
      throw error;
    }
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid Credentials');

    const token = this.jwtService.sign({
      id: user._id.toString(),
      role: 'USER',
    });

    return {
      message: 'Login Success',
      token,
      role: 'USER',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    };
  }

  async loginDriver(dto: LoginDriverDto) {
    const driver = await this.driverService.findByEmail(dto.email);
    if (!driver) throw new UnauthorizedException('Invalid Credentials');

    const match = await bcrypt.compare(dto.password, driver.password);
    if (!match) throw new UnauthorizedException('Invalid Credentials');

    const token = this.jwtService.sign({
      id: driver._id.toString(),
      role: 'DRIVER',
    });

    return {
      message: 'Login Success',
      token,
      role: 'DRIVER',
      driver: {
        id: driver._id,
        fullName: driver.fullName,
        email: driver.email,
        phone: driver.phone,
        licenseNumber: driver.licenseNumber,
      },
    };
  }
}

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DriverService } from '../driver/driver.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly driverService: DriverService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const { role, password } = dto;

    dto.password = await bcrypt.hash(password, 10);

    let newUser;

    try {
      if (role === 'DRIVER') {
        if (!dto.phone || !dto.licenseNumber) {
          throw new ConflictException('Driver must provide phone and license number');
        }

        newUser = await this.driverService.create(dto);
      } else {
        newUser = await this.userService.create(dto);
      }

    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }

    const token = this.jwtService.sign({ id: newUser._id, role });

    return {
      message: 'Registration successful',
      token,
      role,
      user: newUser,
    };
  }

  async login(email: string, password: string) {
    const driver = await this.driverService.findByEmail(email);
    const user = driver ? null : await this.userService.findByEmail(email);

    const account: any = driver || user;
    const role = driver ? 'DRIVER' : 'USER';

    if (!account) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(password, account.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    const token = this.jwtService.sign({ id: account._id, role });

    return {
      message: 'Login successful',
      token,
      role,
      id: account._id,
      name: account.fullName,
      email: account.email,
    };
  }
}

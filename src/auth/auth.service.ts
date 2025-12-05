import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DriverService } from '../driver/driver.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly driverService: DriverService,
    private readonly userService: UserService,  // <-- ADD THIS
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    let user: any = await this.driverService.findByEmail(email);

    if (!user) {
      user = await this.userService.findByEmail(email);
    }

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    const payload = { id: user._id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      role: user.role,
      token,
    };
  }


}

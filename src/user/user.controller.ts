import { Body, Controller, Post, Patch, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.userService.register(dto);
    }
    @Post('login')
   login(@Body() dto: LoginUserDto) {
  return this.userService.login(dto);
}


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@Request() req) {
        return this.userService.findById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update')
    update(@Request() req, @Body() dto: UpdateUserDto) {
        return this.userService.update(req.user.id, dto);
    }
}

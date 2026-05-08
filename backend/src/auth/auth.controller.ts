import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

interface AuthenticatedRequest extends Request {
  user: { userId: number; username: string };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

export interface JwtPayload {
  sub: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePayload(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}

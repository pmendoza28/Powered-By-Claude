import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];

  async onModuleInit() {
    this.users = [
      { id: 1, username: 'admin', password: await bcrypt.hash('password', 10) },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }
}

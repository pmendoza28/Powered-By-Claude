import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { UsersService, User } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: { findOne: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    it('should return an access_token on valid credentials', async () => {
      const hashed = await bcrypt.hash('password', 10);
      const mockUser: User = { id: 1, username: 'admin', password: hashed };
      usersService.findOne.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('signed-token');

      const result = await service.login('admin', 'password');
      expect(result).toEqual({ access_token: 'signed-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: 1, username: 'admin' });
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      usersService.findOne.mockResolvedValue(undefined);
      await expect(service.login('unknown', 'password')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException on wrong password', async () => {
      const hashed = await bcrypt.hash('correct', 10);
      const mockUser: User = { id: 1, username: 'admin', password: hashed };
      usersService.findOne.mockResolvedValue(mockUser);
      await expect(service.login('admin', 'wrong')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validatePayload()', () => {
    it('should return userId and username from payload', async () => {
      const result = await service.validatePayload({ sub: 1, username: 'admin' });
      expect(result).toEqual({ userId: 1, username: 'admin' });
    });
  });
});

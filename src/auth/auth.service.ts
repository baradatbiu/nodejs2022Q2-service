import { LoginDto } from './dto/login.dto';
import { UserService } from './../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { ERRORS } from '../types/Error';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(registerDto: RegisterDto): Promise<string> {
    const password = await bcrypt.hash(
      registerDto.password,
      +configService.get<number>('CRYPT_SALT'),
    );

    await this.usersService.create({ ...registerDto, password });

    return Promise.resolve('The user has been successfully registered.');
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { login, password } = loginDto;

    const user = await this.usersService.findOneByLogin(login);

    if (!user) throw new ForbiddenException(ERRORS.AUTH_FAILED_LOGIN);

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new ForbiddenException(ERRORS.AUTH_FAILED_PASSWORD);

    const payload = { userId: user.id, login: user.login };

    return {
      access_token: await this.jwtService.sign(payload),
      refresh_token: await this.jwtService.sign(payload, {
        secret: configService.get<string>('JWT_SECRET_REFRESH_KEY'),
        expiresIn: configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    if (!refreshToken)
      throw new UnauthorizedException(ERRORS.REFRESH_TOKEN_FAILED);

    try {
      const tokenData = await this.jwtService.verifyAsync(refreshToken, {
        secret: configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      });

      const payload = { userId: tokenData.userId, login: tokenData.login };

      return {
        access_token: await this.jwtService.sign(payload),
        refresh_token: await this.jwtService.sign(payload, {
          secret: configService.get<string>('JWT_SECRET_REFRESH_KEY'),
          expiresIn: configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
        }),
      };
    } catch (error) {
      throw new ForbiddenException(ERRORS.REFRESH_TOKEN_INVALID);
    }
  }
}

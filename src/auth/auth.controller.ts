import { LoginDto } from './dto/login.dto';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signin(@Body() registerDto: RegisterDto): Promise<string> {
    return await this.authService.signin(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<{ access_token: string; refresh_token: string }> {
    return await this.authService.refresh(refreshToken);
  }
}

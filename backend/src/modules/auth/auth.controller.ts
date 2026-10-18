import { Body, Controller, Get, Ip, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { GoogleAuthDto, LoginDto, RegistroDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login sensível com Throttler (máx 5 tentativas por minuto para mitigar força bruta)
   */
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() dto: LoginDto, @Ip() ip: string) {
    return this.authService.login(dto, ip);
  }

  @Get('instituicoes')
  async listarInstituicoes() {
    return this.authService.listarInstituicoes();
  }

  @Post('registro')
  async registrar(@Body() dto: RegistroDto, @Ip() ip: string) {
    return this.authService.registrar(dto, ip);
  }

  @Post('google')
  async googleAuth(@Body() dto: GoogleAuthDto, @Ip() ip: string) {
    return this.authService.autenticarGoogle(dto, ip);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  async getPerfil(@Req() req: any) {
    return req.user;
  }
}

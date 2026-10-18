import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') || 'chave_secreta_super_segura_pluralis_2026_jwt',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      include: { instituicao: true },
    });

    if (!usuario) {
      throw new UnauthorizedException('Sessão expirada ou usuário não encontrado.');
    }

    return {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      cargo: usuario.cargo,
      iesId: usuario.ies_id,
      instituicao: usuario.instituicao?.nome,
    };
  }
}

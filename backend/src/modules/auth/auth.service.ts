import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { GoogleAuthDto, LoginDto, RegistroDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { CargoUsuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  /**
   * Criptografia segura de senhas via Bcrypt (SoC).
   */
  async hashSenha(senha: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(senha, saltRounds);
  }

  async compararSenha(senha: string, hash: string): Promise<boolean> {
    return bcrypt.compare(senha, hash);
  }

  /**
   * Login convencional (E-mail e Senha)
   */
  async login(dto: LoginDto, ip = '127.0.0.1') {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: { instituicao: true },
    });

    if (!usuario || !usuario.senha_hash) {
      await this.auditoriaService.registrar({
        acao: 'LOGIN_FALHA',
        ip,
        detalhes: `Tentativa de login com e-mail inválido: ${dto.email}`,
      });
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const senhaValida = await this.compararSenha(dto.senha, usuario.senha_hash);
    if (!senhaValida) {
      await this.auditoriaService.registrar({
        usuarioId: usuario.id,
        acao: 'LOGIN_FALHA_SENHA',
        ip,
      });
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    await this.auditoriaService.registrar({
      usuarioId: usuario.id,
      acao: 'LOGIN_SUCESSO',
      ip,
    });

    return this.gerarToken(usuario);
  }

  /**
   * Registro de novo docente ou gestor
   */
  async registrar(dto: RegistroDto, ip = '127.0.0.1') {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário cadastrado com este e-mail.');
    }

    const senhaHash = await this.hashSenha(dto.senha);

    const novoUsuario = await this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email.toLowerCase(),
        senha_hash: senhaHash,
        ies_id: dto.iesId,
        cargo: dto.cargo || CargoUsuario.PROFESSOR,
      },
      include: { instituicao: true },
    });

    await this.auditoriaService.registrar({
      usuarioId: novoUsuario.id,
      acao: 'REGISTRO_USUARIO',
      ip,
    });

    return this.gerarToken(novoUsuario);
  }

  /**
   * Login Social via Google
   */
  async autenticarGoogle(dto: GoogleAuthDto, ip = '127.0.0.1') {
    let usuario = await this.prisma.usuario.findFirst({
      where: {
        OR: [{ google_id: dto.googleId }, { email: dto.email.toLowerCase() }],
      },
      include: { instituicao: true },
    });

    if (!usuario) {
      // Se não houver IES fornecida, busca a primeira cadastrada ou cria uma padrão de demonstração
      let iesId = dto.iesId;
      if (!iesId) {
        const primeiraIes = await this.prisma.instituicao.findFirst();
        if (primeiraIes) {
          iesId = primeiraIes.id;
        } else {
          const novaIes = await this.prisma.instituicao.create({
            data: {
              nome: 'Universidade Pluralis Demo',
              cnpj: '00.000.000/0001-00',
            },
          });
          iesId = novaIes.id;
        }
      }

      usuario = await this.prisma.usuario.create({
        data: {
          nome: dto.nome,
          email: dto.email.toLowerCase(),
          google_id: dto.googleId,
          ies_id: iesId,
          cargo: CargoUsuario.PROFESSOR,
        },
        include: { instituicao: true },
      });
    } else if (!usuario.google_id) {
      // Vincula a conta Google existente
      usuario = await this.prisma.usuario.update({
        where: { id: usuario.id },
        data: { google_id: dto.googleId },
        include: { instituicao: true },
      });
    }

    await this.auditoriaService.registrar({
      usuarioId: usuario.id,
      acao: 'LOGIN_GOOGLE_SUCESSO',
      ip,
    });

    return this.gerarToken(usuario);
  }

  private gerarToken(usuario: any) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      cargo: usuario.cargo,
      iesId: usuario.ies_id,
      nome: usuario.nome,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        instituicao: usuario.instituicao?.nome,
      },
    };
  }
}

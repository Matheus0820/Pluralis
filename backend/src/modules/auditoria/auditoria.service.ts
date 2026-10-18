import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class AuditoriaService {
  constructor(private readonly prisma: PrismaService) {}

  private hashIp(ip: string): string {
    return crypto.createHash('sha256').update(ip || '0.0.0.0').digest('hex');
  }

  async registrar({
    usuarioId,
    acao,
    ip,
    detalhes,
  }: {
    usuarioId?: string;
    acao: string;
    ip: string;
    detalhes?: string;
  }) {
    const ipHash = this.hashIp(ip);
    return this.prisma.logAuditoria.create({
      data: {
        usuario_id: usuarioId || null,
        acao,
        ip_hash: ipHash,
        detalhes: detalhes || null,
      },
    });
  }
}

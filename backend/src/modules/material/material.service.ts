import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IaService } from '../ia/ia.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AdaptarMaterialDto } from './dto/adaptar-material.dto';
import { CriarMaterialDto } from './dto/criar-material.dto';
import { AtualizarMaterialDto } from './dto/atualizar-material.dto';
import { StatusRevisao, TipoAdaptacao } from '@prisma/client';

@Injectable()
export class MaterialService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly iaService: IaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  /**
   * RF02: Adaptação com auxílio de IA Generativa.
   * Executa a sanitização LGPD, gera o conteúdo adaptado e registra auditoria.
   */
  async gerarAdaptacao(dto: AdaptarMaterialDto, usuarioId?: string, ip = '127.0.0.1') {
    const resultado = await this.iaService.adaptarConteudo({
      conteudoOriginal: dto.conteudoOriginal,
      tipoAdaptacao: dto.tipoAdaptacao,
      instrucoesAdicionais: dto.instrucoesAdicionais,
    });

    await this.auditoriaService.registrar({
      usuarioId,
      acao: 'GERAR_ADAPTACAO_IA',
      ip,
      detalhes: JSON.stringify({
        tipoAdaptacao: dto.tipoAdaptacao,
        tamanhoOriginal: dto.conteudoOriginal.length,
      }),
    });

    return {
      conteudoOriginal: dto.conteudoOriginal,
      conteudoAdaptado: resultado.conteudoAdaptado,
      tipoAdaptacao: dto.tipoAdaptacao,
      urlAudio: resultado.urlAudio || null,
      avisoLegal: 'Conteúdo gerado por IA. Revisão humana obrigatória antes da publicação (RNF10).',
    };
  }

  /**
   * RF04: Persistência e aprovação do material pós-revisão humana.
   * Regra Crítica de Segurança RNF10: Bloqueio caso a revisão não seja confirmada.
   */
  async criar(dto: CriarMaterialDto, usuarioId: string, ip = '127.0.0.1') {
    const statusRevisao = dto.revisaoHumanaConfirmada
      ? StatusRevisao.APROVADO
      : StatusRevisao.PENDENTE;

    const material = await this.prisma.material.create({
      data: {
        usuario_id: usuarioId,
        titulo: dto.titulo,
        conteudo_original: dto.conteudoOriginal,
        conteudo_adaptado: dto.conteudoAdaptado,
        tipo_adaptacao: dto.tipoAdaptacao,
        url_audio: dto.urlAudio || null,
        status_revisao: statusRevisao,
        revisado_em: dto.revisaoHumanaConfirmada ? new Date() : null,
        publico: dto.publico ?? false,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            instituicao: {
              select: { nome: true },
            },
          },
        },
      },
    });

    await this.auditoriaService.registrar({
      usuarioId,
      acao: 'CRIAR_MATERIAL',
      ip,
      detalhes: JSON.stringify({
        materialId: material.id,
        statusRevisao: material.status_revisao,
        publico: material.publico,
      }),
    });

    return material;
  }

  /**
   * RF05: Consulta de materiais inclusivos públicos compartilhados na comunidade.
   */
  async listarPublicos(termo?: string, tipo?: TipoAdaptacao) {
    return this.prisma.material.findMany({
      where: {
        publico: true,
        status_revisao: StatusRevisao.APROVADO,
        ...(tipo && { tipo_adaptacao: tipo }),
        ...(termo && {
          OR: [
            { titulo: { contains: termo, mode: 'insensitive' } },
            { conteudo_adaptado: { contains: termo, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            instituicao: { select: { nome: true } },
          },
        },
      },
      orderBy: { data_criacao: 'desc' },
      take: 50,
    });
  }

  /**
   * Lista materiais criados pelo usuário logado.
   */
  async listarPorUsuario(usuarioId: string) {
    return this.prisma.material.findMany({
      where: { usuario_id: usuarioId },
      orderBy: { data_criacao: 'desc' },
    });
  }

  /**
   * Busca material específico com verificação de acesso.
   */
  async buscarPorId(id: string, usuarioId?: string) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            instituicao: { select: { nome: true } },
          },
        },
      },
    });

    if (!material) {
      throw new NotFoundException(`Material com ID '${id}' não encontrado.`);
    }

    if (!material.publico && (!usuarioId || material.usuario_id !== usuarioId)) {
      throw new ForbiddenException('Acesso restrito ao proprietário do material.');
    }

    return material;
  }

  /**
   * Atualiza material existente, garantindo rastreabilidade e validação de revisão.
   */
  async atualizar(id: string, dto: AtualizarMaterialDto, usuarioId: string, ip = '127.0.0.1') {
    const materialExistente = await this.buscarPorId(id, usuarioId);

    if (materialExistente.usuario_id !== usuarioId) {
      throw new ForbiddenException('Apenas o autor pode editar este material.');
    }

    let statusRevisao = materialExistente.status_revisao;
    let revisadoEm = materialExistente.revisado_em;

    if (dto.revisaoHumanaConfirmada !== undefined) {
      statusRevisao = dto.revisaoHumanaConfirmada
        ? StatusRevisao.APROVADO
        : StatusRevisao.PENDENTE;
      revisadoEm = dto.revisaoHumanaConfirmada ? new Date() : null;
    }

    const materialAtualizado = await this.prisma.material.update({
      where: { id },
      data: {
        ...(dto.titulo && { titulo: dto.titulo }),
        ...(dto.conteudoOriginal && { conteudo_original: dto.conteudoOriginal }),
        ...(dto.conteudoAdaptado && { conteudo_adaptado: dto.conteudoAdaptado }),
        ...(dto.tipoAdaptacao && { tipo_adaptacao: dto.tipoAdaptacao }),
        ...(dto.urlAudio !== undefined && { url_audio: dto.urlAudio }),
        ...(dto.publico !== undefined && { publico: dto.publico }),
        status_revisao: statusRevisao,
        revisado_em: revisadoEm,
      },
    });

    await this.auditoriaService.registrar({
      usuarioId,
      acao: 'ATUALIZAR_MATERIAL',
      ip,
      detalhes: JSON.stringify({ materialId: id }),
    });

    return materialAtualizado;
  }

  /**
   * Exclusão segura de material.
   */
  async remover(id: string, usuarioId: string, ip = '127.0.0.1') {
    const material = await this.buscarPorId(id, usuarioId);

    if (material.usuario_id !== usuarioId) {
      throw new ForbiddenException('Apenas o autor pode remover este material.');
    }

    await this.prisma.material.delete({ where: { id } });

    await this.auditoriaService.registrar({
      usuarioId,
      acao: 'REMOVER_MATERIAL',
      ip,
      detalhes: JSON.stringify({ materialId: id }),
    });

    return { sucesso: true, mensagem: 'Material removido com sucesso.' };
  }

  /**
   * RF06: Envio de sugestões de melhoria ou reporte de material inadequado.
   */
  async reportarInadequacao(
    materialId: string,
    motivo: string,
    usuarioId?: string,
    ip = '127.0.0.1',
  ) {
    await this.buscarPorId(materialId);

    await this.auditoriaService.registrar({
      usuarioId,
      acao: 'REPORTE_MATERIAL_INADEQUADO',
      ip,
      detalhes: JSON.stringify({ materialId, motivo }),
    });

    return {
      sucesso: true,
      mensagem: 'Reporte registrado para análise da equipe pedagógica e de conformidade.',
    };
  }
}

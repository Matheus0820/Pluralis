import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { CriarTopicoDto } from './dto/topico.dto';
import { CategoriaForum } from '@prisma/client';

@Injectable()
export class ForumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  /**
   * RF07: Listagem de tópicos de discussão entre docentes
   */
  async listarTopicos(categoria?: CategoriaForum) {
    const topicos = await this.prisma.topicoForum.findMany({
      where: {
        ...(categoria && { categoria }),
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

    if (topicos.length > 0) {
      return topicos;
    }

    // Retorna tópicos de exemplo se o banco estiver vazio
    return [
      {
        id: 'topico-1',
        titulo: 'Como vocês adaptam avaliações de cálculo para estudantes no espectro autista?',
        conteudo:
          'Tenho enfrentado desafios para estruturar provas de cálculo sem gerar sobrecarga sensorial com enunciados longos. ' +
          'Alguém desenvolveu rubricas ou tempo estendido com salas de descompressão?',
        categoria: CategoriaForum.NEURODIVERGENCIA,
        data_criacao: new Date(),
        usuario: {
          nome: 'Prof. Carlos Eduardo',
          cargo: 'PROFESSOR',
          instituicao: { nome: 'Universidade Federal' },
        },
      },
      {
        id: 'topico-2',
        titulo: 'Melhores ferramentas para descrição de diagramas de fluxo em TI',
        conteudo:
          'Utilizei a biblioteca de prompts da Pluralis para gerar audiodescrições de diagramas UML. ' +
          'Gostaria de compartilhar o resultado e saber como o NAI da instituição de vocês lida com avaliações práticas.',
        categoria: CategoriaForum.TECNOLOGIA_ASSISTIVA,
        data_criacao: new Date(Date.now() - 3600000 * 24),
        usuario: {
          nome: 'Dra. Vanessa Lima',
          cargo: 'NAI',
          instituicao: { nome: 'Centro Universitário Integração' },
        },
      },
    ];
  }

  /**
   * Cria novo tópico na comunidade docente
   */
  async criarTopico(dto: CriarTopicoDto, usuarioId: string, ip = '127.0.0.1') {
    const topico = await this.prisma.topicoForum.create({
      data: {
        titulo: dto.titulo,
        conteudo: dto.conteudo,
        categoria: dto.categoria || CategoriaForum.DUVIDAS_GERAIS,
        usuario_id: usuarioId,
      },
      include: {
        usuario: {
          select: {
            nome: true,
            cargo: true,
            instituicao: { select: { nome: true } },
          },
        },
      },
    });

    await this.auditoriaService.registrar({
      usuarioId,
      acao: 'CRIAR_TOPICO_FORUM',
      ip,
      detalhes: JSON.stringify({ topicoId: topico.id, categoria: topico.categoria }),
    });

    return topico;
  }
}

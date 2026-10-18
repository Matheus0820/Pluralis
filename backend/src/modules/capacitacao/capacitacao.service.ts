import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CapacitacaoService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * RF01: Trilhas e módulos de capacitação para educação inclusiva no ensino superior.
   */
  async listarTrilhas() {
    return [
      {
        id: 'trilha-tea-tdah',
        titulo: 'Adaptação Pedagógica para Neurodivergência (TEA e TDAH)',
        descricao: 'Estratégias práticas de descompressão cognitiva, roteirização clara e avaliação flexível.',
        duracaoMinutos: 90,
        nivel: 'Intermediário',
        modulos: [
          'Fundamentos da Neurodiversidade no Ensino Superior',
          'Técnicas de Redução de Sobrecarga Sensorial e Textual',
          'Estudo de Caso: Provas Acessíveis com Tempo Estendido',
        ],
        progressoPercentual: 65,
        imagemAlt: 'Docente orientando estudante em ambiente acadêmico inclusivo',
        tag: 'Neurodiversidade',
      },
      {
        id: 'trilha-deficiencia-visual',
        titulo: 'Audiodescrição e Acessibilidade Visual em Ciências Exatas',
        descricao: 'Como descrever gráficos, matrizes e diagramas para estudantes com baixa visão ou cegueira.',
        duracaoMinutos: 120,
        nivel: 'Avançado',
        modulos: [
          'Normas Técnicas (ABNT NBR 17225) na Produção de Mídia',
          'Softwares Leitores de Tela e Estrutura Semântica',
          'Descrições Objetivas de Gráficos e Tabelas Complexas',
        ],
        progressoPercentual: 20,
        imagemAlt: 'Gráfico matemático tátil com leitor de tela digital',
        tag: 'Acessibilidade Visual',
      },
      {
        id: 'trilha-letramento-legal',
        titulo: 'Marco Legal e Diretrizes LGPD na Gestão de Alunos com Deficiência',
        descricao: 'Segurança de dados sensíveis de saúde e garantias da Lei Brasileira de Inclusão (LBI).',
        duracaoMinutos: 60,
        nivel: 'Fundamental',
        modulos: [
          'Princípios da LBI (Lei 13.146/15) no Contexto Universitário',
          'Tratamento de Dados de Saúde e Laudos Médicos segundo a LGPD',
          'Papel do NAI (Núcleo de Acessibilidade Institucional)',
        ],
        progressoPercentual: 100,
        imagemAlt: 'Balança da justiça e cadeado de privacidade de dados',
        tag: 'Legislação e LGPD',
      },
    ];
  }

  /**
   * RF03: Biblioteca de Prompts prontos para uso em ferramentas externas de IA.
   */
  async listarPrompts(categoria?: string) {
    const promptsDb = await this.prisma.promptIA.findMany({
      where: {
        ativo: true,
        ...(categoria && { categoria }),
      },
      orderBy: { data_criacao: 'desc' },
    });

    if (promptsDb.length > 0) {
      return promptsDb;
    }

    // Prompts padrão para seed/fallback imediato
    return [
      {
        id: 'prompt-1',
        titulo: 'Transformar Texto Acadêmico em Linguagem Simples (Easy-to-Read)',
        categoria: 'Neurodiversidade',
        descricao: 'Converte artigos densos em sentenças curtas e diretas, ideal para estudantes com TEA ou déficit de atenção.',
        template_prompt:
          'Atue como um especialista em pedagogia inclusiva. Reescreva o seguinte texto em Linguagem Simples (Easy-to-Read), ' +
          'mantendo a precisão conceitual universitária, mas dividindo em tópicos diretos, utilizando ordem direta ' +
          '(sujeito-verbo-objeto) e eliminando ambiguidades: [INSERIR TEXTO AQUI]',
      },
      {
        id: 'prompt-2',
        titulo: 'Roteiro de Audiodescrição para Diagramas e Imagens Didáticas',
        categoria: 'Deficiência Visual',
        descricao: 'Gera descrição textual detalhada de imagens e infográficos para uso com leitores de tela ou narração.',
        template_prompt:
          'Gere uma audiodescrição completa e objetiva para a seguinte figura didática. Comece do plano geral para os detalhes ' +
          'específicos, descrevendo eixos, legendas, tendências dos dados e o conceito que a imagem ilustra: [INSERIR DESCRIÇÃO DO GRÁFICO]',
      },
      {
        id: 'prompt-3',
        titulo: 'Adaptação de Avaliação para Estudantes com Dislexia',
        categoria: 'Transtornos de Aprendizagem',
        descricao: 'Reformula enunciados de provas para evitar sobrecarga de memória de trabalho e ambiguidades visuais.',
        template_prompt:
          'Analise as seguintes questões de avaliação do ensino superior. Reformule os enunciados destacando termos-chave em negrito, ' +
          'separando instruções de contexto em parágrafos distintos e sugerindo critérios flexíveis de correção: [INSERIR QUESTÕES]',
      },
    ];
  }

  async cadastrarPrompt(data: { titulo: string; descricao: string; template_prompt: string; categoria?: string }) {
    return this.prisma.promptIA.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        template_prompt: data.template_prompt,
        categoria: data.categoria || 'Geral',
      },
    });
  }
}

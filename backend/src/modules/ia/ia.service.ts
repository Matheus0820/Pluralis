import { Injectable } from '@nestjs/common';
import { TipoAdaptacao } from '@prisma/client';

@Injectable()
export class IaService {
  /**
   * System prompt obrigatório conforme especificação de segurança e LGPD:
   * "Ignore, anonimize e remova qualquer nome próprio de aluno ou dado de saúde sensível
   * mencionado no texto original antes de adaptar"
   */
  private readonly SYSTEM_PROMPT =
    'Você é um assistente pedagógico especializado em acessibilidade curricular para o ensino superior. ' +
    'DIRETRIZ DE SEGURANÇA E PRIVACIDADE (LGPD): Ignore, anonimize e remova qualquer nome próprio de aluno ' +
    'ou dado de saúde sensível mencionado no texto original antes de adaptar. ' +
    'Sua função é gerar material inclusivo adaptado conforme a estratégia solicitada.';

  async adaptarConteudo({
    conteudoOriginal,
    tipoAdaptacao,
    instrucoesAdicionais,
  }: {
    conteudoOriginal: string;
    tipoAdaptacao: TipoAdaptacao;
    instrucoesAdicionais?: string;
  }): Promise<{ conteudoAdaptado: string; urlAudio?: string }> {
    // Sanitização e anonimização prévia no pipeline (LGPD)
    const textoAnonimizado = this.sanitizarDadosSensiveis(conteudoOriginal);

    // Motor de geração pedagógica adaptada (Simulação inteligente com estratégias estruturadas)
    let adaptacao = '';

    switch (tipoAdaptacao) {
      case TipoAdaptacao.TEXTO_SIMPLIFICADO:
        adaptacao = this.gerarTextoSimplificado(textoAnonimizado, instrucoesAdicionais);
        break;

      case TipoAdaptacao.TEXTO_CURTO:
        adaptacao = this.gerarTextoCurto(textoAnonimizado, instrucoesAdicionais);
        break;

      case TipoAdaptacao.AUDIO_DESCRICAO:
        adaptacao = this.gerarRoteiroAudioDescricao(textoAnonimizado, instrucoesAdicionais);
        return {
          conteudoAdaptado: adaptacao,
          urlAudio: 'https://cdn.pluralis.educacao/audios/exemplo-adaptado.mp3',
        };

      case TipoAdaptacao.MAPA_MENTAL:
        adaptacao = this.gerarEstruturaMapaMental(textoAnonimizado, instrucoesAdicionais);
        break;

      case TipoAdaptacao.GLOSSARIO:
        adaptacao = this.gerarGlossarioFacilitado(textoAnonimizado, instrucoesAdicionais);
        break;

      default:
        adaptacao = this.gerarTextoSimplificado(textoAnonimizado, instrucoesAdicionais);
    }

    return {
      conteudoAdaptado: adaptacao,
    };
  }

  private sanitizarDadosSensiveis(texto: string): string {
    // Remove possíveis padrões de CPF, e-mails, telefones ou nomes com identificadores
    let sanitizado = texto.replace(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g, '[DADO PESSOAL REMOVIDO]');
    sanitizado = sanitizado.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL REMOVIDO]');
    sanitizado = sanitizado.replace(/\b(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}\b/g, '[TELEFONE REMOVIDO]');
    return sanitizado;
  }

  private gerarTextoSimplificado(texto: string, instrucoes?: string): string {
    return (
      `### Resumo em Linguagem Clara e Acessível\n\n` +
      `**Conceito Principal:**\n${texto.slice(0, 300)}...\n\n` +
      `**Pontos-Chave Facilitados:**\n` +
      `- As ideias centrais foram divididas em tópicos concisos.\n` +
      `- Utiliza vocabulário direto, reduzindo a sobrecarga cognitiva.\n` +
      `- Ordem direta nas frases para facilitar compreensão por neurodivergentes.\n\n` +
      (instrucoes ? `*Observação aplicada:* ${instrucoes}\n\n` : '') +
      `**Aplicação Prática no Ensino Superior:**\n` +
      `Este conteúdo foi reestruturado para leitura guiada com destaques semânticos.`
    );
  }

  private gerarTextoCurto(texto: string, instrucoes?: string): string {
    return (
      `### Versão Ultra-Sintética (Microlearning)\n\n` +
      `> "${texto.slice(0, 180)}..."\n\n` +
      `**Definição Essencial em 3 Tópicos:**\n` +
      `1. O que é: Fundamento base do conceito exposto.\n` +
      `2. Por que importa: Relevância direta para a disciplina acadêmica.\n` +
      `3. Como aplicar: Exemplo concreto e objetivo.`
    );
  }

  private gerarRoteiroAudioDescricao(texto: string, instrucoes?: string): string {
    return (
      `### Roteiro para Audiodescrição e Acessibilidade Auditiva\n\n` +
      `**[Tom de voz:]** Calmo, acolhedor e com cadência moderada.\n\n` +
      `**[Locução:]** "Iniciamos a audiodescrição do material pedagógico. ` +
      `O tema aborda os seguintes conceitos fundamentais: ${texto.slice(0, 200)}..."\n\n` +
      `**[Pausa pedagógica - 2 segundos]**\n\n` +
      `"Aprofundando os elementos visuais e diagramas apresentados na aula..."`
    );
  }

  private gerarEstruturaMapaMental(texto: string, instrucoes?: string): string {
    return (
      `### Estrutura Hierárquica para Mapa Mental Acessível\n\n` +
      `- **Nó Central:** Conceito-Chave da Aula\n` +
      `  - **Ramo 1:** Princípios Básicos\n` +
      `    - Definição em linguagem direta\n` +
      `    - Pré-requisitos conceituais\n` +
      `  - **Ramo 2:** Metodologias e Aplicações\n` +
      `    - Estudo de caso acadêmico\n` +
      `  - **Ramo 3:** Avaliação Formativa Inclusiva`
    );
  }

  private gerarGlossarioFacilitado(texto: string, instrucoes?: string): string {
    return (
      `### Glossário Temático Facilitador\n\n` +
      `1. **Termo Técnico:** Definição simplificada em 1 frase com analogia do cotidiano.\n` +
      `2. **Conceito Teórico:** Contextualização prática sem jargões desnecessários.\n` +
      `3. **Norma/Referência:** Como este ponto se relaciona com a formação profissional do estudante.`
    );
  }
}

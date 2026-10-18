import { PrismaClient, CargoUsuario, TipoAdaptacao, StatusRevisao, CategoriaForum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados Pluralis...');

  // 1. Instituição de Ensino Superior (IES)
  const ies = await prisma.instituicao.upsert({
    where: { cnpj: '12.345.678/0001-90' },
    update: {},
    create: {
      nome: 'Universidade Federal de Tecnologia e Inclusão',
      cnpj: '12.345.678/0001-90',
    },
  });

  // 2. Usuário de Demonstração (Docente)
  const senhaHash = await bcrypt.hash('Pluralis@2026', 10);
  const docente = await prisma.usuario.upsert({
    where: { email: 'professor.demo@pluralis.edu.br' },
    update: {},
    create: {
      id: 'docente-demo-pluralis-id',
      nome: 'Prof. Matheus Silva',
      email: 'professor.demo@pluralis.edu.br',
      senha_hash: senhaHash,
      cargo: CargoUsuario.PROFESSOR,
      ies_id: ies.id,
    },
  });

  // 3. Usuário NAI (Núcleo de Acessibilidade Institucional)
  const nai = await prisma.usuario.upsert({
    where: { email: 'nai.coordenacao@pluralis.edu.br' },
    update: {},
    create: {
      nome: 'Dra. Vanessa Lima',
      email: 'nai.coordenacao@pluralis.edu.br',
      senha_hash: senhaHash,
      cargo: CargoUsuario.NAI,
      ies_id: ies.id,
    },
  });

  // 4. Materiais Adaptados
  await prisma.material.createMany({
    data: [
      {
        usuario_id: docente.id,
        titulo: 'Introdução aos Algoritmos e Estruturas de Dados',
        conteudo_original:
          'Um algoritmo é uma sequência finita de ações executáveis que visam a obter uma solução para um determinado tipo de problema. Em termos matemáticos e computacionais, a complexidade assintótica define o comportamento temporal.',
        conteudo_adaptado:
          '### Conceito Essencial de Algoritmo (Linguagem Clara)\n\n' +
          '**O que é?** Uma receita passo a passo para o computador resolver uma tarefa.\n\n' +
          '**3 Regras de Ouro:**\n' +
          '1. **Início e Fim:** Todo algoritmo tem um ponto de partida e uma conclusão clara.\n' +
          '2. **Passos Precisos:** Não há comandos vagos ou ambíguos.\n' +
          '3. **Ordem Lógica:** Um passo só funciona se o anterior for completado com êxito.',
        tipo_adaptacao: TipoAdaptacao.TEXTO_SIMPLIFICADO,
        status_revisao: StatusRevisao.APROVADO,
        revisado_em: new Date(),
        publico: true,
      },
      {
        usuario_id: docente.id,
        titulo: 'Audiodescrição do Ciclo de Krebs em Bioquímica',
        conteudo_original:
          'Diagrama circular ilustrando as reações oxidativas do ciclo do ácido cítrico com liberação de CO2 e redução de coenzimas NADH e FADH2 na matriz mitocondrial.',
        conteudo_adaptado:
          '### Roteiro de Audiodescrição para Ciclo de Krebs\n\n' +
          '**[Locução Acessível]:** "Imagine um circuito fechado de energia dentro da célula. O composto inicial acetil-CoA se une a uma molécula de quatro carbonos, girando uma roda química contínua que gera pequenas baterias moleculares de ATP."',
        tipo_adaptacao: TipoAdaptacao.AUDIO_DESCRICAO,
        url_audio: 'https://cdn.pluralis.educacao/audios/ciclo-krebs-descritivo.mp3',
        status_revisao: StatusRevisao.APROVADO,
        revisado_em: new Date(),
        publico: true,
      },
    ],
    skipDuplicates: true,
  });

  // 5. Biblioteca de Prompts (RF03)
  await prisma.promptIA.createMany({
    data: [
      {
        titulo: 'Descompressão Cognitiva para Alunos no Espectro Autista (TEA)',
        categoria: 'Neurodiversidade',
        descricao: 'Divide blocos densos de instruções de trabalhos e projetos em check-lists numeradas e sem metáforas.',
        template_prompt:
          'Reescreva a seguinte instrução acadêmica eliminando figuras de linguagem, ironias ou metáforas. ' +
          'Estruture o texto em itens numerados cronológicos, indicando o tempo estimado para cada etapa e o critério objetivo de entrega: [INSERIR INSTRUÇÕES]',
      },
      {
        titulo: 'Audiodescrição Pedagógica de Gráficos e Tabelas Estatísticas',
        categoria: 'Deficiência Visual',
        descricao: 'Transforma dados gráficos em descrição verbal hierárquica acessível a leitores de tela.',
        template_prompt:
          'Atue como audiodescritor técnico conforme a ABNT NBR 17225. Descreva o gráfico a seguir informando tipo do gráfico, variáveis nos eixos X e Y, valor mínimo, valor máximo e a principal tendência pedagógica a ser observada: [DADOS DO GRÁFICO]',
      },
    ],
    skipDuplicates: true,
  });

  // 6. Fórum de Discussão (RF07)
  await prisma.topicoForum.create({
    data: {
      usuario_id: nai.id,
      titulo: 'Orientações práticas para provas em ambiente com baixa sobrecarga sensorial',
      conteudo:
        'Compartilhamos com o corpo docente as diretrizes para aplicação de provas com estudantes neurodivergentes: iluminação natural, fones abafadores permitidos e formulários impressos com fontes sem serifa (Arial ou Atkinson Hyperlegible).',
      categoria: CategoriaForum.METODOLOGIAS_INCLUSIVAS,
    },
  });

  console.log('✅ Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

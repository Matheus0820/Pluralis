export type CargoUsuario = 'GESTOR' | 'PROFESSOR' | 'NAI';

export type StatusRevisao = 'PENDENTE' | 'APROVADO';

export type TipoAdaptacao =
  | 'TEXTO_SIMPLIFICADO'
  | 'TEXTO_CURTO'
  | 'AUDIO_DESCRICAO'
  | 'MAPA_MENTAL'
  | 'GLOSSARIO';

export type CategoriaForum =
  | 'METODOLOGIAS_INCLUSIVAS'
  | 'TECNOLOGIA_ASSISTIVA'
  | 'NEURODIVERGENCIA'
  | 'DUVIDAS_GERAIS';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: CargoUsuario;
  instituicao?: string;
}

export interface Material {
  id: string;
  usuario_id: string;
  titulo: string;
  conteudo_original: string;
  conteudo_adaptado: string;
  tipo_adaptacao: TipoAdaptacao;
  url_audio?: string | null;
  status_revisao: StatusRevisao;
  revisado_em?: string | null;
  publico: boolean;
  data_criacao: string;
  atualizado_em?: string;
  usuario?: {
    id: string;
    nome: string;
    cargo: CargoUsuario;
    instituicao?: { nome: string };
  };
}

export interface AdaptacaoResponse {
  conteudoOriginal: string;
  conteudoAdaptado: string;
  tipoAdaptacao: TipoAdaptacao;
  urlAudio?: string | null;
  avisoLegal: string;
}

export interface PromptIA {
  id: string;
  titulo: string;
  descricao: string;
  template_prompt: string;
  categoria: string;
}

export interface TopicoForum {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: CategoriaForum;
  data_criacao: string;
  usuario: {
    nome: string;
    cargo: CargoUsuario;
    instituicao?: { nome: string };
  };
}

export interface TrilhaCapacitacao {
  id: string;
  titulo: string;
  descricao: string;
  duracaoMinutos: number;
  nivel: string;
  modulos: string[];
  progressoPercentual: number;
  imagemAlt: string;
  tag: string;
}

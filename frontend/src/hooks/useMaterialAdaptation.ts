import { useState, useCallback } from 'react';
import { TipoAdaptacao } from '../types';
import { api } from '../services/api';

export interface UseMaterialAdaptationReturn {
  // Estados do formulário
  titulo: string;
  conteudoOriginal: string;
  tipoAdaptacao: TipoAdaptacao;
  instrucoesAdicionais: string;
  conteudoAdaptado: string;
  urlAudio: string | null;

  // Estados de controle e validação
  revisaoHumanaConfirmada: boolean;
  publico: boolean;
  isGerando: boolean;
  isSalvando: boolean;
  erro: string | null;
  mensagemSucesso: string | null;
  avisoLegal: string;

  // Setters
  setTitulo: (v: string) => void;
  setConteudoOriginal: (v: string) => void;
  setTipoAdaptacao: (v: TipoAdaptacao) => void;
  setInstrucoesAdicionais: (v: string) => void;
  setConteudoAdaptado: (v: string) => void;
  setRevisaoHumanaConfirmada: (v: boolean) => void;
  setPublico: (v: boolean) => void;

  // Ações de negócio
  gerarAdaptacao: () => Promise<void>;
  salvarMaterial: () => Promise<boolean>;
  limparMensagens: () => void;
  resetar: () => void;
}

export function useMaterialAdaptation(): UseMaterialAdaptationReturn {
  const [titulo, setTitulo] = useState('');
  const [conteudoOriginal, setConteudoOriginal] = useState('');
  const [tipoAdaptacao, setTipoAdaptacao] = useState<TipoAdaptacao>('TEXTO_SIMPLIFICADO');
  const [instrucoesAdicionais, setInstrucoesAdicionais] = useState('');
  const [conteudoAdaptado, setConteudoAdaptado] = useState('');
  const [urlAudio, setUrlAudio] = useState<string | null>(null);

  // Conformidade RNF10: Revisão humana obrigatória
  const [revisaoHumanaConfirmada, setRevisaoHumanaConfirmada] = useState(false);
  const [publico, setPublico] = useState(false);

  const [isGerando, setIsGerando] = useState(false);
  const [isSalvando, setIsSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const [avisoLegal, setAvisoLegal] = useState(
    'Conteúdo gerado por IA. Revisão humana obrigatória antes da publicação ou utilização pedagógica.',
  );

  const limparMensagens = useCallback(() => {
    setErro(null);
    setMensagemSucesso(null);
  }, []);

  /**
   * RF02: Chamada ao backend para gerar a adaptação assistida por IA
   */
  const gerarAdaptacao = useCallback(async () => {
    if (!conteudoOriginal.trim() || conteudoOriginal.trim().length < 10) {
      setErro('Informe pelo menos 10 caracteres no conteúdo didático original.');
      return;
    }

    setIsGerando(true);
    setErro(null);
    setMensagemSucesso(null);

    try {
      const resposta = await api.adaptarMaterial({
        conteudoOriginal,
        tipoAdaptacao,
        instrucoesAdicionais: instrucoesAdicionais.trim() || undefined,
      });

      setConteudoAdaptado(resposta.conteudoAdaptado);
      setUrlAudio(resposta.urlAudio || null);
      if (resposta.avisoLegal) {
        setAvisoLegal(resposta.avisoLegal);
      }
      // Sempre que um novo conteúdo é gerado por IA, resetamos a confirmação humana (RNF10)
      setRevisaoHumanaConfirmada(false);
      setMensagemSucesso('Adaptação gerada com sucesso pela IA! Revise o conteúdo ao lado.');
    } catch (err: any) {
      setErro(err.message || 'Falha ao conectar com o serviço de IA. Tente novamente.');
    } finally {
      setIsGerando(false);
    }
  }, [conteudoOriginal, tipoAdaptacao, instrucoesAdicionais]);

  /**
   * RF04: Persistência do material após revisão e edição pelo docente
   */
  const salvarMaterial = useCallback(async (): Promise<boolean> => {
    if (!titulo.trim()) {
      setErro('Informe um título descritivo para o material.');
      return false;
    }

    if (!conteudoAdaptado.trim()) {
      setErro('O conteúdo adaptado não pode estar vazio.');
      return false;
    }

    // Regra Crítica de Segurança RNF10
    if (!revisaoHumanaConfirmada) {
      setErro('Você deve confirmar a revisão humana antes de salvar o material adaptado.');
      return false;
    }

    setIsSalvando(true);
    setErro(null);

    try {
      await api.salvarMaterial({
        titulo,
        conteudoOriginal,
        conteudoAdaptado,
        tipoAdaptacao,
        urlAudio: urlAudio || undefined,
        publico,
        revisaoHumanaConfirmada: true,
      });

      setMensagemSucesso('Material salvo e aprovado com sucesso!');
      return true;
    } catch (err: any) {
      setErro(err.message || 'Erro ao salvar o material. Verifique a conexão com o servidor.');
      return false;
    } finally {
      setIsSalvando(false);
    }
  }, [titulo, conteudoOriginal, conteudoAdaptado, tipoAdaptacao, urlAudio, publico, revisaoHumanaConfirmada]);

  const resetar = useCallback(() => {
    setTitulo('');
    setConteudoOriginal('');
    setTipoAdaptacao('TEXTO_SIMPLIFICADO');
    setInstrucoesAdicionais('');
    setConteudoAdaptado('');
    setUrlAudio(null);
    setRevisaoHumanaConfirmada(false);
    setPublico(false);
    setErro(null);
    setMensagemSucesso(null);
  }, []);

  return {
    titulo,
    conteudoOriginal,
    tipoAdaptacao,
    instrucoesAdicionais,
    conteudoAdaptado,
    urlAudio,
    revisaoHumanaConfirmada,
    publico,
    isGerando,
    isSalvando,
    erro,
    mensagemSucesso,
    avisoLegal,
    setTitulo,
    setConteudoOriginal,
    setTipoAdaptacao,
    setInstrucoesAdicionais,
    setConteudoAdaptado,
    setRevisaoHumanaConfirmada,
    setPublico,
    gerarAdaptacao,
    salvarMaterial,
    limparMensagens,
    resetar,
  };
}

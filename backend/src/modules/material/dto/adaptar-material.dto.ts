import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { TipoAdaptacao } from '@prisma/client';

export class AdaptarMaterialDto {
  @IsString({ message: 'O conteúdo didático original deve ser um texto válido' })
  @IsNotEmpty({ message: 'O conteúdo original é obrigatório para adaptação' })
  @MinLength(10, { message: 'O conteúdo original deve ter no mínimo 10 caracteres' })
  conteudoOriginal: string;

  @IsEnum(TipoAdaptacao, {
    message: 'O tipo de adaptação deve ser válido (TEXTO_SIMPLIFICADO, TEXTO_CURTO, AUDIO_DESCRICAO, MAPA_MENTAL, GLOSSARIO)',
  })
  tipoAdaptacao: TipoAdaptacao;

  @IsOptional()
  @IsString()
  instrucoesAdicionais?: string;
}

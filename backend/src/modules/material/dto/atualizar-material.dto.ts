import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoAdaptacao, StatusRevisao } from '@prisma/client';

export class AtualizarMaterialDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  conteudoOriginal?: string;

  @IsOptional()
  @IsString()
  conteudoAdaptado?: string;

  @IsOptional()
  @IsEnum(TipoAdaptacao)
  tipoAdaptacao?: TipoAdaptacao;

  @IsOptional()
  @IsString()
  urlAudio?: string;

  @IsOptional()
  @IsEnum(StatusRevisao)
  statusRevisao?: StatusRevisao;

  @IsOptional()
  @IsBoolean()
  publico?: boolean;

  @IsOptional()
  @IsBoolean()
  revisaoHumanaConfirmada?: boolean;
}

import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { TipoAdaptacao, StatusRevisao } from '@prisma/client';

export class CriarMaterialDto {
  @IsString()
  @IsNotEmpty({ message: 'O título do material é obrigatório' })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'O conteúdo original é obrigatório' })
  conteudoOriginal: string;

  @IsString()
  @IsNotEmpty({ message: 'O conteúdo adaptado é obrigatório' })
  conteudoAdaptado: string;

  @IsEnum(TipoAdaptacao)
  tipoAdaptacao: TipoAdaptacao;

  @IsOptional()
  @IsString()
  urlAudio?: string;

  @IsBoolean()
  @IsOptional()
  publico?: boolean;

  /**
   * Validação crítica de conformidade (RNF10):
   * O material só pode ser persistido como aprovado se houver confirmação de revisão humana.
   */
  @IsBoolean({ message: 'A confirmação de revisão humana é obrigatória' })
  revisaoHumanaConfirmada: boolean;
}

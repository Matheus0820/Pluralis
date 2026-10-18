import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { CategoriaForum } from '@prisma/client';

export class CriarTopicoDto {
  @IsString()
  @IsNotEmpty({ message: 'O título do tópico é obrigatório' })
  @MinLength(5, { message: 'O título deve conter pelo menos 5 caracteres' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'O conteúdo da publicação é obrigatório' })
  @MinLength(10, { message: 'O conteúdo deve conter pelo menos 10 caracteres' })
  conteudo: string;

  @IsEnum(CategoriaForum, { message: 'Categoria inválida' })
  @IsOptional()
  categoria?: CategoriaForum;
}

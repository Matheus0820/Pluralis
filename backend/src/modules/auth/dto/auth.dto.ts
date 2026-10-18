import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { CargoUsuario } from '@prisma/client';

export class LoginDto {
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  senha: string;
}

export class RegistroDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Informe um e-mail corporativo válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  senha: string;

  @IsString()
  @IsOptional()
  iesId?: string;

  @IsOptional()
  cargo?: CargoUsuario;
}

export class GoogleAuthDto {
  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  iesId?: string;
}

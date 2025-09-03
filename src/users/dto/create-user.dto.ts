import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { AccessLevel } from "../entities/user.entity";

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })    
  readonly name: string;

  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  readonly email: string;
 
  @IsString({ message: 'A senha deve ser um texto.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(4, { message: 'A senha deve ter no mínimo 4 caracteres.' })
  readonly password: string;
 
  @IsString({ message: 'O cargo deve ser um texto.' })
  @IsOptional()
  readonly role?: string;
 
  @IsEnum(AccessLevel, { message: 'O nível de acesso deve ser ADMIN ou USER.' })
  @IsOptional()
  readonly accessLevel?: AccessLevel;
}
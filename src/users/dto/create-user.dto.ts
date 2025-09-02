import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { AccessLevel } from "../entities/user.entity";

export class CreateUserDto {
@IsString()
@IsNotEmpty()    
name: string;

@IsNotEmpty()
@IsString()
@IsEmail()
email: string;
 
@IsString()
@IsNotEmpty()
@IsOptional()
@MinLength(4, { message: 'A senha da festa precisa ter no mínimo 4 caracteres.' })
password: string;
 
role?: string;
 
accessLevel?: AccessLevel;
}
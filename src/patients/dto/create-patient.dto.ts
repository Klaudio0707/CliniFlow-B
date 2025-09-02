import { IsString, IsNotEmpty, IsOptional, IsDateString, IsPhoneNumber } from 'class-validator';

export class CreatePatientDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @IsString({ message: 'O número do cartão do plano deve ser um texto.' })
  @IsNotEmpty({ message: 'O número do cartão do plano não pode estar vazio.' })
  insuranceCardNumber: string;

  @IsString({ message: 'O nome do plano deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do plano não pode estar vazio.' })
  insurancePlanName: string;

  // Campos opcionais
  @IsDateString({}, { message: 'A data de validade deve estar no formato AAAA-MM-DD.' })
  @IsOptional()
  cardExpirationDate?: string;

  @IsPhoneNumber('BR', { message: 'Por favor, insira um número de telefone válido.' })
  @IsOptional()
  phone?: string;


  @IsDateString({}, { message: 'A data de nascimento deve estar no formato AAAA-MM-DD.' })
  @IsOptional()
  birthdate?: string; 
}

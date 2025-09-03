import { IsString, IsNotEmpty, IsOptional, IsDateString, Matches } from 'class-validator';

export class CreatePatientDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  readonly name: string;

  @IsString({ message: 'O número do cartão do plano deve ser um texto.' })
  @IsNotEmpty({ message: 'O número do cartão do plano não pode estar vazio.' })
  readonly insuranceCardNumber: string;

  @IsString({ message: 'O nome do plano deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do plano não pode estar vazio.' })
  readonly insurancePlanName: string;

  // Campos opcionais
  @IsDateString({}, { message: 'A data de validade deve estar no formato AAAA-MM-DD.' })
  @IsOptional()
  readonly cardExpirationDate?: string;

  @IsString({ message: 'O telefone deve ser um texto.' })
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
    message: 'Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX.',
  })
  @IsOptional()
  readonly phone?: string;

  @IsDateString({}, { message: 'A data de nascimento deve estar no formato AAAA-MM-DD.' })
  @IsOptional()
  readonly birthdate?: string; 
}

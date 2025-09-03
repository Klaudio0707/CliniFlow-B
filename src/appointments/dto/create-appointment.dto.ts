import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreateAppointmentDto {
    @IsString({ message: 'O local de atendimento deve ser um texto.' })
  @IsNotEmpty({ message: 'O local de atendimento não pode estar vazio.' })
  readonly serviceLocation: string;

  @IsUUID('4', { message: 'O ID do paciente deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'É necessário fornecer o ID do paciente.' })
  readonly patientId: string;
}

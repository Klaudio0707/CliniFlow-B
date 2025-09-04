import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientEntity } from './entities/patient.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(PatientEntity)
    private readonly patientModel: typeof PatientEntity,
  ) {}

  private async findPatientOrFail(id: string): Promise<PatientEntity> {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      throw new NotFoundException(`patient  ${id} not found`);
    }
    return patient;
  }
 
  private async verifyPatientUniquenessOrFail(
    dto: CreatePatientDto,
  ): Promise<void> {
    const { name, insuranceCardNumber, insurancePlanName } = dto;
    
    const existingPatient = await this.patientModel.findOne({
      where: { 
        name, 
        insuranceCardNumber, 
        insurancePlanName 
      },
    });

    if (existingPatient) {
      throw new ConflictException(
        `Um paciente com este nome, número de cartão e plano de saúde já existe.`,
      );
    }
  }
  async create(createPatientDto: CreatePatientDto) {

    await this.verifyPatientUniquenessOrFail(createPatientDto);
    
    return this.patientModel.create({ ...createPatientDto });
  }

  async findAll() {
    return this.patientModel.findAll();
  }

  async findOne(id: string) {
    return this.findPatientOrFail(id);
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findPatientOrFail(id);
  
    return patient.update(updatePatientDto);
  }

  async remove(id: string) {
    const patient = await this.findPatientOrFail(id);
    await patient.destroy();
    return { message: `Paciente com ID ${id} foi removido` };
  }
}
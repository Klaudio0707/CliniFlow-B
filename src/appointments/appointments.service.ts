import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { EventsGateway } from 'src/events/events.gateway';
import { AppointmentEntity, AppointmentStatus } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
 constructor(
  @InjectModel(AppointmentEntity)
  private readonly appointmentModel: typeof AppointmentEntity,

  @InjectModel(PatientEntity)
  private readonly patientModel: typeof PatientEntity,

  private readonly eventsGateway: EventsGateway,
) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {
  const { patientId, serviceLocation } = createAppointmentDto;

  const patient = await this.patientModel.findByPk(patientId);
  if (!patient) {
    throw new NotFoundException(`Paciente ${patientId} não encontrado`);
  }

  const existingAppointment = await this.appointmentModel.findOne({
    where: { patientId, status: AppointmentStatus.WAITING },
  });

  if (existingAppointment) {
    throw new ConflictException(`Este paciente já se encontra na fila de espera.`);
  }

  const newAppointment = await this.appointmentModel.create({
      patientId,
      serviceLocation,
      status: AppointmentStatus.WAITING,
      createdByUserId: userId, 
  });

  this.eventsGateway.handleNewAppointment(newAppointment);
  return newAppointment;
}

async findAllWaiting(): Promise<AppointmentEntity[]> {
    return this.appointmentModel.findAll({
      where: { status: AppointmentStatus.WAITING },
      include: [PatientEntity], 
      order: [['createdAt', 'ASC']], 
    });
  }

  async callPatient(id: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`Atendimento com ID ${id} não encontrado.`);
    }
    appointment.status = AppointmentStatus.CALLED;
    appointment.calledAt = new Date(); 
    await appointment.save();

    this.eventsGateway.handleCallUpdate(appointment);

    return appointment;
  }

   // @param id - O ID do atendimento a ser finalizado.
  
  async finishAppointment(id: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`Atendimento com ID ${id} não encontrado.`);
    }

    appointment.status = AppointmentStatus.FINISHED;
    appointment.finishedAt = new Date(); // Regista a hora de finalização.
    await appointment.save();

    // Notificação em Tempo Real: Avisa o frontend que o atendimento terminou.
    this.eventsGateway.handleCallUpdate(appointment);

    return appointment;
  }

  // --- MÉTODOS ADMINISTRATIVOS ---
  
  // * Busca todos os atendimentos (para um admin).
  
  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentModel.findAll({ include: [PatientEntity] });
  }

   //* Busca um único atendimento pelo seu ID (para um admin).
   
  async findOne(id: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentModel.findByPk(id, { include: [PatientEntity] });
    if (!appointment) {
      throw new NotFoundException(`Atendimento com ID ${id} não encontrado.`);
    }
    return appointment;
  }

   //Apaga um atendimento (para um admin).
  
  async remove(id: string): Promise<void> {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`Atendimento com ID ${id} não encontrado.`);
    }
    await appointment.destroy();
  }
}

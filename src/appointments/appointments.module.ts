import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppointmentEntity } from './entities/appointment.entity';
import { EventsModule } from 'src/events/events.module';
import { PatientEntity } from 'src/patients/entities/patient.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
   imports: [SequelizeModule.forFeature([AppointmentEntity, PatientEntity]),
  EventsModule, 
  UsersModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}

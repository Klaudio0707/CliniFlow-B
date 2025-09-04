import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppointmentEntity } from './entities/appointment.entity';

@Module({
   imports: [SequelizeModule.forFeature([AppointmentEntity]),],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}

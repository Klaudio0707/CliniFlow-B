import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';


@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, PatientsModule, AppointmentsModule],
})
export class AppModule {}

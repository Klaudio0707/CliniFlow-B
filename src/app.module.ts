import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
   PatientsModule,
    AppointmentsModule,
    EventsModule,
    UsersModule, 
    AuthModule,
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
   PatientsModule,
    AppointmentsModule,
    UsersModule, 
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

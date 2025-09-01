import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [UserModule, PatientModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

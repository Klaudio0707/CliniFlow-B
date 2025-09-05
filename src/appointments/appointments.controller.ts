import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UsersService } from 'src/users/users.service';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('appointments')
@UseGuards(AuthGuard('jwt-from-cookie')) 
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService, private readonly usersService: UsersService) {}
   //Cria um novo atendimento (adiciona um paciente à fila).
@Post()
create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req) {
  const userId = req.user.id;
  return this.appointmentsService.create(createAppointmentDto, userId);
}
  //Retorna a lista de todos os atendimentos com status 'WAITING'.
  @Get('waiting') 
  findAllWaiting() {
    return this.appointmentsService.findAllWaiting();
  }
  
   //Altera o status de um atendimento para 'CALLED' e notifica o ecrã público.
   
  @Patch(':id/call')
  callPatient(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.callPatient(id);
  }
   //Altera o status de um atendimento para 'FINISHED'.

  @Patch(':id/finish')
  finishAppointment(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.finishAppointment(id);
  }
  // --- ROTAS ADMINISTRATIVAS (Apenas para Admins) ---
  //Retorna uma lista de TODOS os atendimentos. Apenas para Admins.
  @Get()
  @UseGuards(AdminGuard) 
  findAll() {
    return this.appointmentsService.findAll();
  }
   //Busca um único atendimento pelo seu ID. Apenas para Admins.
  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.findOne(id);
  }

  
   //Apaga um registo de atendimento. Apenas para Admins.
  
  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.remove(id);
  }
}
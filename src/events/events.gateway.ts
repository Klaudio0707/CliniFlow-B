import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({cors: { origin: '*'}})
export class EventsGateway {
 @WebSocketServer()
 server: Server;

handleCallUpdate(call: any){
  this.server.emit('call_update', call);
}
handleNewAppointment(appointment: any){
  this.server.emit('new_appointment_in_queue', appointment);
}
}
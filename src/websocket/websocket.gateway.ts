import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyWebSocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('invalidRequest')
  handleInvalidRequest(client: any, payload: any) {
    // Отправляем сообщение всем клиентам
    this.server.emit('error', 'Неправильный запрос: ' + payload.errorMessage);
  }

  @SubscribeMessage('success')
  handleSuccess(client: any, message: string) {
    // Отправляем сообщение всем клиентам

    this.server.emit('success', message);
  }
}

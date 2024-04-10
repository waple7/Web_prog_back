import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
@WebSocketGateway({ namespace: 'support' })
export class SupportGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    console.log('handled message:', message);
    this.server.emit('message', message);
  }
}
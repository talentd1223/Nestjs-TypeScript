import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  findAll(@MessageBody() data: any) {
    this.server.sockets.emit('receive_message', data);
  }

  @SubscribeMessage('initial_connection')
  async identity(@MessageBody() data: any) {
    return 'Hello world!';
  }
}
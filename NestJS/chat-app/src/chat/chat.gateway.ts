import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { DataSource } from 'typeorm';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly dataSource: DataSource) {}

  handleConnection(socket: Socket) {
    console.log('User connected:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log('User disconnected:', socket.id);
  }

  // ✅ JOIN CHAT (bidirectional check)
  @SubscribeMessage('joinChat')
  async handleJoin(
    @MessageBody()
    data: { fromEmail: string; toEmail: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const result = await this.dataSource.query(
      `
      SELECT * FROM chat
      WHERE (
        (from_email = $1 AND to_email = $2)
        OR
        (from_email = $2 AND to_email = $1)
      )
      AND status = 'CONNECTED'
      LIMIT 1
      `,
      [data.fromEmail, data.toEmail],
    );

    if (!result.length) {
      socket.emit('errorMessage', 'Chat not allowed or not verified');
      return;
    }

    const roomId = `room_${result[0].id}`;

    socket.join(roomId);

    socket.emit('joined', 'Chat connected successfully');

    console.log(`${data.fromEmail} joined ${roomId}`);
  }

  // ✅ SEND MESSAGE (bidirectional safe)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { fromEmail: string; toEmail: string; message: string },
  ) {
    const result = await this.dataSource.query(
      `
      SELECT id FROM chat
      WHERE (
        (from_email = $1 AND to_email = $2)
        OR
        (from_email = $2 AND to_email = $1)
      )
      AND status = 'CONNECTED'
      LIMIT 1
      `,
      [data.fromEmail, data.toEmail],
    );

    if (!result.length) return;

    const roomId = `room_${result[0].id}`;

    this.server.to(roomId).emit('receiveMessage', {
      sender: data.fromEmail,
      message: data.message,
      time: new Date(),
    });
  }
}
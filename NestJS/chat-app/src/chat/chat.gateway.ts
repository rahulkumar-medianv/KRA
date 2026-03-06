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

  // Store active chat room per socket
  private socketRooms = new Map<string, string>();

  handleConnection(socket: Socket) {
    console.log('User connected:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log('User disconnected:', socket.id);

    // remove socket from memory map when disconnect
    this.socketRooms.delete(socket.id);
  }

  // JOIN CHAT (DB validation only once)
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

    // join socket room
    socket.join(roomId);

    // store room in memory
    this.socketRooms.set(socket.id, roomId);

    socket.emit('joined', 'Chat connected successfully');

    console.log(`${data.fromEmail} joined ${roomId}`);
  }

  // SEND MESSAGE
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { fromEmail: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    // find which room this socket belongs to
    const roomId = this.socketRooms.get(socket.id);

    if (!roomId) {
      socket.emit('errorMessage', 'You are not connected to any chat room');
      return;
    }

    // emit message to the room
    this.server.to(roomId).emit('receiveMessage', {
      sender: data.fromEmail,
      message: data.message,
      time: new Date(),
    });
  }
}

/*
socket.emit(<eventName>, <Data>)
socket.emit('joined', 'connection done')
- Here server sends an event ('joined') to that user
- Frontend can listen for it and show something like:
- Chat connected successfully

- server.emit (Sends message to all connected clients)
*/

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: "*"
    },
})

export class ChatGateway{
    @WebSocketServer()
    server: Server;


    // client sends message
    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() data: any){
       console.log('Received: ', data);

       
    // Broadcast  to all clients
    this.server.emit('receiveMessage', data)
    }
}

/*
@WebSocketGateway() -- Create WebSocket server
@SubscribeMessage('sendMessage') -- Listens to client event
@this.server.emit() -- Sends event to all connected clients.


*/
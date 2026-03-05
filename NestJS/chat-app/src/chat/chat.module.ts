import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MailService } from 'src/utils/mail.transporter';
import { ChatGateway } from './chat.gateway';


@Module({
    controllers: [ChatController],
    providers: [ChatService, MailService, ChatGateway]
})
export class ChatModule {}

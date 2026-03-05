import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendChatRequestDto } from './dto/send-chat-request.dto';
import { VerifyChatDto } from './dto/verify-chat-dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post("/request")
   async sendChatMessage(@Body() body: SendChatRequestDto){
        return this.chatService.sendChatRequest(body);
    }

    @Post('/verify')
    async verifyChatOtp(@Body() body: VerifyChatDto){
        return this.chatService.verifyChat(body);

    }

    // @Patch(':id')
    // async updateStatus(@Param('id') @Body() id){
    //     return this.chatService.
    // }

}


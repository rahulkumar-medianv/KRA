import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { MessageService } from './message.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

@Controller('message')
export class MessageController {
constructor(private readonly messageService: MessageService) {}

@Post()
async createmessage(@Body() body: CreateMessageDTO){
   return this.messageService.createMessage(body);
}

// @UseGuards(JwtAuthGuard)
    @Get()
   async getMessage() {
      return this.messageService.getMessages();
    }

    @Get(':id')
    async getMessageById(@Param('id', ParseIntPipe) id: number){
      return this.messageService.getMessageById(id);
    }
}


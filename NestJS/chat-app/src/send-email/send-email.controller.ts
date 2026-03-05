import { SendEmailService } from './send-email.service';
import { Controller, Post, Body, Get } from '@nestjs/common';

class SendEmailDto {
  email: string;
}

@Controller('send-email')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Post()
  async sendWelcomeEmail(@Body() dto: SendEmailDto) {
    return this.sendEmailService.sendWelcomeEmail(dto.email);
  }

//   @Get('/login')
//   async login(){
//     return this.sendEmailService.login();
//   }

}

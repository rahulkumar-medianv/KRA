import { Module } from '@nestjs/common';
import { SendEmailController } from './send-email.controller';
import { SendEmailService } from './send-email.service';
import { MailService } from 'src/utils/mail.transporter';

@Module({
  controllers: [SendEmailController],
  providers: [SendEmailService, MailService],
})
export class SendEmailModule {}

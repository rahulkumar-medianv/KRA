import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendMail } from '../types/sendmail.interface';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('EMAIL_HOST'),
      port: this.config.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.config.get<string>('EMAIL_USER'),
        pass: this.config.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendMail(sendMail: SendMail) {
    const { from, to, subject, html } = sendMail;
    const fromAddress = from || this.config.get<string>('EMAIL_USER');
    return this.transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html,
    });
  }
}
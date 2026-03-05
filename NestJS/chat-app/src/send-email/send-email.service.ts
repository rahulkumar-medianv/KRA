import { MailService } from './../utils/mail.transporter';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SendMail } from '../types/sendmail.interface';
import * as crypto from 'crypto';
import { SendOtp } from './dto/sendotp.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class SendEmailService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mailService: MailService,
  ) {};

    // generate otp
        generateOtp(): string {
            return crypto.randomInt(100000, 1000000).toString();
        
        }

  async sendWelcomeEmail(email: string){
    const payload: SendMail = {
      to: email,
      subject: 'Welcome to Our App',
      html: `<h1>Thanks for joining!</h1>`,
    };
    return this.mailService.sendMail(payload);
  }

  async login(dto){
    const findUser = await this.dataSource.query(

        `
        SELECT * FROM users
        WHERE email = $1
        `, [dto.email]
    );
    
    const record = findUser[0];

    await this.dataSource.query(
        `
        INSERT INTO users (email, userName, otp)
        VALUES($1, $2, $3)
        
        `
    )


    
    const otp = this.generateOtp();



    return otp;
     
  }
    
}

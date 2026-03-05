import { Injectable, BadRequestException } from '@nestjs/common';
import { MailService } from './../utils/mail.transporter';
import * as crypto from 'crypto';
import { DataSource } from 'typeorm';
import { SendChatRequestDto } from './dto/send-chat-request.dto';
import { VerifyChatDto } from './dto/verify-chat-dto';
import { SendMail } from 'src/types/sendmail.interface';

@Injectable()
export class ChatService {

    constructor(
        private readonly mailService: MailService,
        private readonly dataSource: DataSource
    
    ) {}
    
    // generate otp
    generateOtp(): string {
        return crypto.randomInt(100000, 1000000).toString();
    
    }
    
    async sendChatRequest(dto: SendChatRequestDto) {
    const otp = this.generateOtp(); // Generate OTP

  // send to the database
  const query =  `INSERT INTO chat (sender_name, from_email, to_email, otp, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
    const value = [dto.senderName, dto.fromEmail, dto.toEmail, otp, 'PENDING']

    const result = await this.dataSource.query(query, value);
    const expiresInMinutes = 5;
    const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">Chat Invitation</h2>
      
      <p>Hello,</p>
      
      <p><strong>${dto.senderName.charAt(0).toUpperCase() + dto.senderName.slice(1)}</strong> has invited you to join a chat.</p>
      
      <p>Please use the OTP below to verify and connect:</p>
      
      <div style="
        font-size: 24px;
        font-weight: bold;
        background: #f4f4f4;
        padding: 10px 20px;
        display: inline-block;
        letter-spacing: 4px;
        margin: 15px 0;
      ">
        ${otp}
      </div>
      
      <p>This OTP is valid for <strong>${expiresInMinutes} minutes</strong>.</p>
      
      <p>If you did not request this, please ignore this email.</p>
      
      <br />
      <p>Best Regards,<br/>Chat Application Team</p>
    </div>
  `;


  const mailPayload: SendMail = {
    from: dto.fromEmail,
    to: dto.toEmail,
    subject: 'You Have a New Chat Request',
    html,
  };

  await this.mailService.sendMail(mailPayload);

  return {message: "Chat request send successfully", data: result[0]};
}

// verify chat request
    async verifyChat(dto: VerifyChatDto) {
    // find request
    const request = await this.dataSource.query(
        `
        SELECT * FROM chat
        WHERE to_email = $1 AND otp = $2 AND status = 'PENDING';
        `,
        [dto.email, dto.otp],
    );

    if (request.length === 0) {
        throw new BadRequestException('No pending request found with the provided email and OTP');
    }

    const record = request[0];

    await this.dataSource.query(
        `
        UPDATE chat SET status = 'CONNECTED'
        WHERE id = $1
        `,
        [record.id],
    );

    return { message: 'Chat connected successfully', chatId: record.id };
}


// // Update Status
// async updateStatus(status, id){
//     // find request
//     const request = await this.dataSource.query(
//         `
//         SELECT * FROM chat
//         WHERE id = $1

//         `, [id]
//     );

//     if(request.length == 0) throw new BadRequestException('No Request Found');

//     const record = request[0];

//     await this.dataSource.query(
//         `
//         UPDATE chat SET status = $1
//         WHERE id = $2
        
//         `
//         [status,  id]
//     )
 // }



}





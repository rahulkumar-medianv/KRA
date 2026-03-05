import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendChatRequestDto {
  @IsString()
  @IsNotEmpty()
  senderName: string;

  @IsEmail()
  fromEmail: string;

  @IsEmail()
  toEmail: string;
}
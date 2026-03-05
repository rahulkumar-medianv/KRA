import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyChatDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
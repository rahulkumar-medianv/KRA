import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyOtp{
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}
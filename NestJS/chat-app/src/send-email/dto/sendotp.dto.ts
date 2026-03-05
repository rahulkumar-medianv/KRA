import { IsNotEmpty, IsString } from "class-validator";


export class SendOtp {
    @IsString()
    @IsNotEmpty()
    email: string;
}
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDetailsDTO{
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsEmail()
    userEmail: string;

    @IsString()
    @Length(10, 10)
    phoneNo: string;
}
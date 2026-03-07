import {  IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class SignupDTO{
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, {message: 'Password must be at least 6 digit'})
    password: string;


}
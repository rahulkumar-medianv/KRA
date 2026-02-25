import {IsEmail, IsNotEmpty, IsNumber, IsString, Min, MinLength} from "class-validator"

export class CreateCustomerDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @Min(18)
    age: number;
}
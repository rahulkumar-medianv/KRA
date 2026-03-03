import { IsBoolean, IsEmail, IsString} from "class-validator";

// DTO for create product 
// class-validator decorators automatically validate
export class CreateMessageDTO{


    @IsString()
    fname: string;

    @IsString()
    lname: string;

    @IsEmail()
    email: string;

    @IsString()
    number: string;

    @IsString()
    text: string;

    @IsBoolean()
    isagree: boolean


}
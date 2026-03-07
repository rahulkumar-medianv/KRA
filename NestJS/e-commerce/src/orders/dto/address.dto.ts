import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class AddressDTO{
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsNumber()
    pincode: number;

    @IsString()
    location: string;
}
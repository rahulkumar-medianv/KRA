import { IsNumber, IsString, MinLength } from "class-validator";

// DTO for create product 
// class-validator decorators automatically validate
export class CreateProductDTO{

    @IsString()
    @MinLength(6, {message: 'Product must be at least 6 characters'})
    name: string;

    @IsNumber()
    price: number;

}
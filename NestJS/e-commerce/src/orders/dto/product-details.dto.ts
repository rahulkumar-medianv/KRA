import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class ProductDetailsDTO{
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    totalPrice: number;
}
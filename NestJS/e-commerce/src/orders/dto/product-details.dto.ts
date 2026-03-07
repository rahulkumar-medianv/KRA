import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class ProductDetailsDTO{
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(1)
    totalPrice: number;
}
import { IsNumber, Min } from "class-validator";

export class AddCartDTO {
    @IsNumber()
    productId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    @Min(1)
    quantity: number;
}
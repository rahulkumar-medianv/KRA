import { IsNumber } from "class-validator";

export class Cart {
    @IsNumber()
    id: number;

    @IsNumber()
    productId: number;

    @IsNumber()
    userId: number;

}
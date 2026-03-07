import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDTO{

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    product_name: string;

    @IsString()
    @IsNotEmpty()
     @IsOptional()
    product_description: string;

    @IsNumber()
    @IsNotEmpty()
     @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    @IsOptional()
    quantity?: number;

    @IsNumber()
    @IsOptional()
    offers?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    category: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
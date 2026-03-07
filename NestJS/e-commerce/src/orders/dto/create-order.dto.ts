import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { ProductDetailsDTO } from "./product-details.dto";
import { UserDetailsDTO } from "./user-details.dto";
import { Type } from "class-transformer";
import { PaymentMode } from "../orders.interface";
import { AddressDTO } from "./address.dto";

export class CreateOrderDTO{

    @ValidateNested()
    @Type(() => UserDetailsDTO)
    userDetails: UserDetailsDTO;

    @ValidateNested()
    @Type(() => ProductDetailsDTO)
    productDetails: ProductDetailsDTO

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;

    @IsEnum(PaymentMode)
    @IsNotEmpty()
    paymentMode: PaymentMode;

    @ValidateNested()
    @Type(() => AddressDTO)
    address: AddressDTO


}
import { IsEnum, IsNumber, ValidateNested } from "class-validator";
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
    ProductDetails: ProductDetailsDTO

    @IsNumber()
    totalPrice: number;

    @IsEnum(PaymentMode)
    paymentMode: PaymentMode;

    @ValidateNested()
    @Type(() => AddressDTO)
    address: AddressDTO


}
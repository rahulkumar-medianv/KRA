import { Address } from "src/auth/auth.interface";

export interface Orders{
    id: string;
    userDetails: UserDetails;
    productDetails: ProductDetails;
    totalPrice: number;
    paymentMode: PaymentMode;
    address: Address;
    status: OrderStatus

}

export enum PaymentMode  {
    UPI = 'UPI',
    COD = 'COD',
    CARD = 'CARD',
    NET_BANKING = 'NET_BANKING'
}

export enum OrderStatus  {
    PENDING = 'PENDING',
    FAILED = 'FAILED',
    SUCCESS = 'SUCCESS',
    DELIVERED = 'DELIVERED'
}

export interface ProductDetails {
    productId: string;
    quantity: number;
    totalPrice: number;
}

export interface UserDetails{
    userName: string;
    userEmail: string;
    phoneNo: string;
}
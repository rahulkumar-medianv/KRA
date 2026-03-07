
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrderStatus, PaymentMode, type ProductDetails, type UserDetails } from "../orders.interface";
import type { Address } from "src/auth/auth.interface";
import { ProductEntity } from "src/products/entities/product.entity";

@Entity('orders')
export class OrdersEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'jsonb', name: 'user_details'})
    userDetails: UserDetails;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({type: 'jsonb', name: 'product_details'})
    productDetails: ProductDetails;

    @Column({
        type: 'enum',
        enum: PaymentMode,
        name: 'payment_mode'
    })
    paymentMode: PaymentMode;

    @Column({type: 'jsonb'})
    address: Address

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus;


}
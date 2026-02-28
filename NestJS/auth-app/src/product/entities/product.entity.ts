import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('products') // product table
export class Product{
    @PrimaryGeneratedColumn() // primary key
    id: number;

    @Column({type: 'varchar', length: 100}) // VARCHAR(100)
    name: string;

    @Column({type: 'numeric', precision: 10, scale: 2})  // Numeric price (supports decimals)
    price: number;

    // @OneToMany(() => orderItem, (orderItem) => orderItem.product)
    // orderItems: OrderItem[];

} 
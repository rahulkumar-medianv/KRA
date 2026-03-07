import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'product_name'})
    product_name: string;

    @Column({name: 'product_description'})
    product_description: string;

    @Column({name: 'price'})
    price: number;

    @Column({default: true, name: 'is_active'})
    isActive: boolean;

    @Column({default: 1, name: 'quantity'})
    quantity: number;

    @Column({default: 10, name: 'offers'})
    offers: number

    @Column({name: "category"})
    category: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'})
    createdAt: Date
    
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAP',
        name: 'updated_at'
    })
    updatedAt: Date;

}
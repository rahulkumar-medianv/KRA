import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { Product } from "src/product/entities/product.entity";

@Entity('cart')
export class Cart{
    @PrimaryGeneratedColumn()
    id: number;

    // relation with User
    @ManyToOne(()=> User, (user) => user.id, {
        onDelete: 'CASCADE',
    })

    @JoinColumn({name: 'userId'})
    user: User;

    // relation with Product
    @ManyToOne(() => Product, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({name: 'productId'})
    product: Product;

    // quantity of product
    @Column({default: 1})
    quantity: number;

}

/*
IN TypeORM, relationships are created using:
@ManyToOne
@OneToMany
@JoinColumn

user will add the cart in product
User --> Cart --> product

- One User has many cart items
- One product can appear in many carts

So Cart becomes a juction (relation) table.

id: primary key
userId: who added
product: which product
quantity: how many


Cart
-----
id
user_id: FK -> user.id
product_id: FK -> product.id
quantity









*/
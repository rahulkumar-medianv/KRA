import { Entity, ForeignKey, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class Cart{
    @PrimaryGeneratedColumn()
    id: number;

    // relation with User
   


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
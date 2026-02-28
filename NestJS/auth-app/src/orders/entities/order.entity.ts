import { User } from "src/users/user.entity";
import { CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    orderDate: Date;

    // @ManyToMany(() => User, (user) => user.orders, {
    //     onDelete: 'CASCADE',

    // })
    // user: User;

    // OneToMany(() => OrderItem, (item) => item.order,{
    //     cascade: true,
    // })
    // items: OrderItem[];
}
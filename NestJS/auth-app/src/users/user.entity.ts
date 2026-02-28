import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { Exclude } from 'class-transformer';
import { Cart } from '../cart/entities/cart.entity';

@Entity('users') // Maps to "users" table in PostgreSQL
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string; // Stored as bcrypt hash — NEVER plain text

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role; // Controls access level

  // Explicitly set column type to avoid TypeORM reading a union type as Object
  @Column({ type: 'text', nullable: true })
  refreshToken: string | null; // Stored as bcrypt hash; null when logged out

  // One user can have many cart items
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  // @OneToMany(() => Order, (order) => order.user)
  // orders:Order[]

}

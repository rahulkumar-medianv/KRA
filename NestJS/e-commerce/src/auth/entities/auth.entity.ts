import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role, type Address } from "../auth.interface";

@Entity('users') 
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    phone?: string;

    @Column({name: 'password'})
    password: string;

    @Column({default: true, name: 'is_active'})
    isActive: boolean;

    @Column({type: 'jsonb', name: 'address', nullable: true})
    address?: Address;

    @Column({ name: 'refresh_token', nullable: true})
    refreshToken?: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role
}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class SendOtp{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'user_name'})
    userName: string;

    @Column({name: 'otp'})
    otp: string;

    @Column({name: 'is_verify', default: false})
    isVerify: boolean;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

}
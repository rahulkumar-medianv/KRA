import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50})
  fname: string;

  @Column({ type: 'varchar', length: 50 })
  lname: string;

  @Column({ type: 'varchar', length: 20 })
  number: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'boolean', default: false })
  isagree: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
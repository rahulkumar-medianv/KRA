import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ChatStatus {
  PENDING = 'PENDING',
  CONNECTED = 'CONNECTED',
  REJECTED = 'REJECTED',
}

@Entity('chat')
export class ChatRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sender_name' })
  senderName: string;


  @Column({name: 'from_email'})
  fromEmail: string; // sender email

  @Column({name: 'to_email'})
  toEmail: string; // receiver email

  @Column()
  otp: string;

  @Column({
    type: 'enum',
    enum: ChatStatus,
    default: ChatStatus.PENDING,
  })
  status: ChatStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
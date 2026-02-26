import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity with TypeORM
  providers: [UsersService],
  exports: [UsersService], // AuthModule needs UsersService
})
export class UsersModule {}

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // TypeORM repository for User
  ) {}

  // Find a user by their email address (used during login)
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Find a user by their ID (used during token refresh and profile)
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Create a new user — throws if email already exists
  async create(email: string, hashedPassword: string): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const user = this.usersRepository.create({ email, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  // Save hashed refresh token to DB (called after login)
  async saveRefreshToken(userId: number, hashedToken: string): Promise<void> {
    await this.usersRepository.update(userId, { refreshToken: hashedToken });
  }

  // Clear the refresh token from DB (called during logout)
  async clearRefreshToken(userId: number): Promise<void> {
    await this.usersRepository.update(userId, { refreshToken: null });
  }
}

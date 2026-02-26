import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,          // Provides UsersService
    PassportModule,       // Required for Passport strategies
    JwtModule.register({}), // No default config — secrets are handled per-call in AuthService
  ],
  providers: [
    AuthService,
    JwtStrategy,          // Registers JWT strategy with Passport
  ],
  controllers: [AuthController],
})
export class AuthModule {}

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Auth } from './auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  // SIGNUP
  async signup(userData: Auth) {
    const {email, password} = userData;
    // Hash password before saving (bcrypt salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB (UsersService throws if email already taken)
    const user = await this.usersService.create(email, hashedPassword);

    return { message: 'User created successfully', userId: user.id };
  }

  // LOGIN 
  async login(userData: Auth) {
    const {email, password} = userData;
    // Step 1: Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 2: Compare plain password with stored hash
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 3: Generate tokens
    const tokens = await this.generateTokens(user.id, user.role);

    // Step 4: Hash the refresh token and store it in DB
    const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 10);
    await this.usersService.saveRefreshToken(user.id, hashedRefreshToken);

    const loggedIn = {
      user: user.id,
      email: user.email,
      role: user.role
    } 

    return {message: "Login Successfully", success: true, token: tokens, data: loggedIn}
  }

  // REFRESH TOKEN
  async refreshTokens(refreshToken: string) {
  let payload: { sub: number; role: string };

  try {
    // ✅ Verify refresh token signature + expiry
    payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  } catch (err) {
    throw new UnauthorizedException('Invalid or expired refresh token');
  }

  // ✅ Find user
  const user = await this.usersService.findById(payload.sub);

  if (!user || !user.refreshToken) {
    throw new UnauthorizedException('Access denied');
  }

  // ✅ Compare hashed refresh token stored in DB
  const tokenMatches = await bcrypt.compare(
    refreshToken,
    user.refreshToken,
  );

  if (!tokenMatches) {
    throw new UnauthorizedException('Invalid refresh token');
  }

  // ✅ Generate new tokens (rotation)
  const tokens = await this.generateTokens(user.id, user.role);

  // ✅ Store NEW hashed refresh token
  const hashedRefreshToken = await bcrypt.hash(
    tokens.refresh_token,
    10,
  );

  await this.usersService.saveRefreshToken(
    user.id,
    hashedRefreshToken,
  );

  return tokens;
}

  // LOGOUT
  async logout(userId: number) {
    // Remove refresh token from DB
    await this.usersService.clearRefreshToken(userId);
    return { message: 'Logged out successfully' };
  }

  // HELPER: Generate Access & Refresh Tokens

private async generateTokens(userId: number, role: string) {
  const payload = { sub: userId, role };

  const accessSecret =
    this.configService.get<string>('JWT_SECRET')!;
  const refreshSecret =
    this.configService.get<string>('JWT_REFRESH_SECRET')!;

  const [access_token, refresh_token] = await Promise.all([
    this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: '15m',
    }),
    this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: '7d',
    }),
  ]);

  return { access_token, refresh_token };
}
}

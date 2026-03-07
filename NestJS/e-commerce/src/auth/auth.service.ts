import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/auth.entity';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signupData: SignupDTO){
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: signupData.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signupData.password, saltRounds);

    // Create new user
    const user = this.userRepository.create({
      name: signupData.name,
      email: signupData.email,
      password: hashedPassword,
      role: Role.USER,
    });

    // Save user to database
    const savedUser = await this.userRepository.save(user);

    return {message: "user created successfully", data: savedUser};
  }

  async login(loginData: LoginDTO) {
    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    await this.userRepository.update(user.id, { refreshToken: tokens.refresh_token });

    return tokens;
  }

  async refreshToken(refreshTokenData: RefreshTokenDTO) {
    
    try {
      // Verify refresh token using 
      const payload = await this.jwtService.verifyAsync(refreshTokenData.refreshToken)

      // Find user by ID
      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check if refresh token matches
    //   const isRefreshTokenValid = await bcrypt.compare(
    //     refreshTokenData.refreshToken,
    //     user.refreshToken,
    //   );

    //   if (!isRefreshTokenValid) {
    //     throw new UnauthorizedException('Invalid refresh token');
    //   }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      // Hash the new refresh token and update user
      const hashedRefreshToken = await bcrypt.hash(tokens.refresh_token, 10);
      await this.userRepository.update(user.id, { refreshToken: tokens.refresh_token });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: UserEntity) {
    // JWT payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessSecret = this.config.get<string>('JWT_SECRET');
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');

    const accessExpiresIn = this.config.get<number>('JWT_EXPIRES_IN');
    const refreshExpiresIn = this.config.get<number>('JWT_REFRESH_EXPIRES_IN');

    const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
            secret: accessSecret,
            expiresIn: accessExpiresIn
        }),
        this.jwtService.signAsync(payload, {
            secret: refreshSecret,
            expiresIn: refreshExpiresIn
        })
    ])

    return {access_token, refresh_token}
  
  }


  async logout(userId: string) {
    await this.userRepository.update(userId, {
      refreshToken: undefined,
    });
  }


  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email', 'phone', 'address', 'role', 'isActive'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
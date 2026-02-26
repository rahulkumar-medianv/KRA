import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO for signup and login requests
// class-validator decorators automatically validate incoming request body
export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

// DTO for refresh token endpoint
export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}

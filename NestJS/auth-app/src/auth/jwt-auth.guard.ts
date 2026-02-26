import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Wraps Passport's built-in JWT guard
// Usage: @UseGuards(JwtAuthGuard) on any protected route
// If token is missing or invalid → 401 Unauthorized
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

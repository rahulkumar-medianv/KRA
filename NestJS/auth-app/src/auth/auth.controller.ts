import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { AuthDto, RefreshTokenDto } from './dto/auth.dto';

@Controller('auth') // end point
export class AuthController {
  constructor(private authService: AuthService) {}

  // Public route — no guards needed
  @Post('signup')
  signup(@Body() auth: AuthDto) {
    return this.authService.signup(auth);
  }

  // Public route — returns access token, refresh token & data
  @Post('login')
  login(@Body() auth: AuthDto) {
    return this.authService.login(auth);
  }

  // POST /auth/refresh 
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refresh_token);
  }

  // POST /auth/logout 
  // Requires valid access token
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }

  // GET /auth/profile
  // Requires valid access token — returns current user info from token
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // req.user is set by JwtStrategy.validate()
    return { message: 'Your profile', user: req.user };
  }

  // GET /auth/admin
  // Requires ADMIN role — demonstrates role-based access control
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin')
  adminOnly(@Request() req) {
    return { message: 'Welcome, Admin!', user: req.user };
  }

  // GET /auth/user
  // Requires USER or ADMIN role
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Get('user')
  userOnly(@Request() req) {
    return { message: 'Welcome, User!', user: req.user };
  }

  
}

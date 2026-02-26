import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Basic health check message
  getHello(): string {
    return '🚀 Auth API is running! Visit /auth/signup to get started.';
  }
}
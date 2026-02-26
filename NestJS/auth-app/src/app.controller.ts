import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Root route — no prefix
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET / — simple health check to confirm server is running
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welome to NestJS';
  }

  getTest(): string{
    return 'This is Testing API';
  }
}

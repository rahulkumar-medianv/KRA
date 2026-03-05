import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Home Page';
  }

  getTesting(): string {
    return 'This is Testing API';
  }

  


}

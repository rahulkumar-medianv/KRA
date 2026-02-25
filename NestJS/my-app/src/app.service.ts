import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to My NestS';
  }
}

/*
Here we are writting API logics

*/

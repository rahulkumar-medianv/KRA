import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(@Inject('LOGGER') private logger: LoggerService) {}

  @Get()
  hello(){
    this.logger.log('Hello from controller');
    return 'Check console !'
  }
}

/*
Handles HTTP requests.
@get() -- get request this is special function (Decorators)

*/
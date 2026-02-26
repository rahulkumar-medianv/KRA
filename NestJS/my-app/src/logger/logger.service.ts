import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
    constructor(private prefix: string){}

    log(message: string){
        console.log(`[${this.prefix}] ${message}`)
    }
}

// A logger System created using a custom provider
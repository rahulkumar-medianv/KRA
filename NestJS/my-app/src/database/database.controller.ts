import { DatabaseService } from './database.service';
import { Controller, Get } from '@nestjs/common';

@Controller('database')
export class DatabaseController {
    constructor(private readonly DatabaseService: DatabaseService) {};
    @Get()
    getStatus(){
        return {status: this.DatabaseService.getStatus()}
    }
}

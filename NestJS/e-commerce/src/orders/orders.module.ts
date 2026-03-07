import { OrdersController } from './orders.controller';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Module({
    controllers:[OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}

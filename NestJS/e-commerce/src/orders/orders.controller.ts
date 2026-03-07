import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    order(){
        return this.orderService.order();
    }
}

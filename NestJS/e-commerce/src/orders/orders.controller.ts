import { Controller, Get, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createOrder(@Body() body: CreateOrderDTO){
        return this.orderService.createOrder(body);
    }
}

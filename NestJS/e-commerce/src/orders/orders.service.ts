import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersEntity)
        private orderRepo: Repository<OrdersEntity>,
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>

    ) {}

    async createOrder(orderData: CreateOrderDTO){
       // find product
       const findProduct = await this.productRepo.findOne({where: {id: orderData.productDetails.productId}})

       if(!findProduct) throw new BadRequestException("Product Not Found");

        const order = this.orderRepo.create(orderData);
        // save order into db
        const saveOrder = await this.orderRepo.save(order);

        return {message: 'Order Placed successfully', data: saveOrder}
    }
    
}

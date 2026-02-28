// src/orders/dto/order.dto.ts
import {
  IsNotEmpty, IsNumber, IsOptional, IsString,
  IsArray, ValidateNested, Min, IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
// import { OrderStatus } from '../entities/order.entity';

export class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];


}

// export class UpdateOrderDto {
//   @IsOptional()
// //   @IsEnum(OrderStatus)
// //   status?: OrderStatus;

// }
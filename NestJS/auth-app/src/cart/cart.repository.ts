import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Cart} from "./entities/cart.entity"
import { Repository } from "typeorm";
import { AddCartDTO } from "./dto/addCart.dto";

@Injectable()
export class CartRepository{
    constructor(
        @InjectRepository(Cart)
        private readonly repo: Repository<Cart>,
    ) {}

    // add to cart and save into postgreSQL
    addToCart(dto: AddCartDTO){
        const cart = this.repo.create(dto);
        return this.repo.save(cart);
    }

    // get cart
    getCart(){
        return this.repo.find();
    }


}
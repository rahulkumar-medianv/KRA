import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity"
import { Repository } from "typeorm";
import { AddCartDTO } from "./dto/addCart.dto";
import { User } from "src/users/user.entity";
import { Product } from "src/product/entities/product.entity";

@Injectable()
export class CartRepository{
    constructor(
        @InjectRepository(Cart)
        private readonly repo: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    // Add to cart and save into PostgreSQL
    async addToCart(dto: AddCartDTO){

        // Load the product entity
        const product = await this.productRepo.findOne({ where: { id: dto.productId } });
        if (!product) {
            throw new Error(`Product with id ${dto.productId} not found`);
        }

        // Create cart with loaded entities (not plain IDs)
        return this.repo.save(dto);
    }

    // Get all cart items (with user and product details)
    getCart(){
        return this.repo.find({ relations: ['user', 'product'] });
    }
}
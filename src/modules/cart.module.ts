import { Module } from '@nestjs/common';
import { CartController } from 'src/controllers/cart.controller';
import { CartRepository } from 'src/repository/cart.repository';
import { CartItemRepository } from 'src/repository/cartItem.repository';
import { ProductRepository } from 'src/repository/product.repository';
import { CartService } from 'src/services/cart.service';

@Module({
    imports: [],
    controllers: [CartController],
    providers: [CartService, CartRepository, CartItemRepository, ProductRepository],
})
export class CartModule { }

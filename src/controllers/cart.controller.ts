import { Body, Controller, Get, Post, ValidationPipe, Headers, Patch, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guards/auth.guard';
import { AddProductToCartDto, RemoveProductFromCartDto } from 'src/dto/cart.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartService } from 'src/services/cart.service';

@Controller()
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('/cart')
    @UseGuards(TokenGuard)
    async AddProductToCart(@Headers('token') token: string, @Body(new ValidationPipe()) addProductToCartDto: AddProductToCartDto): Promise<{ message: string; }> {
        return this.cartService.addProductToCart(token, addProductToCartDto);
    }

    @Get('/cart')
    @UseGuards(TokenGuard)
    async GetCart(@Headers('token') token: string): Promise<{ data: Cart[]; }> {
        return this.cartService.getCart({ token });
    }

    @Get('/cart/count')
    @UseGuards(TokenGuard)
    async CountCart(@Headers('token') token: string): Promise<{ data: number; }> {
        return this.cartService.countProductInCart(token);
    }

    @Patch('/cart')
    @UseGuards(TokenGuard)
    async RemoveProductFromCart(@Headers('token') token: string, @Body(new ValidationPipe()) removeProductFromCartDto: RemoveProductFromCartDto) {
        return this.cartService.removeProductFromCart(token, removeProductFromCartDto);
    }

    @Patch('/cart/payment')
    @UseGuards(TokenGuard)
    async PaymentInCart(@Headers('token') token: string) {
        return this.cartService.paymentInCart(token);
    }
}

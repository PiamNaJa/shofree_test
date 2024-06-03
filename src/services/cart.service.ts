import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AddProductToCartDto, RemoveProductFromCartDto } from 'src/dto/cart.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { Product } from 'src/entities/product.entity';
import { CartRepository } from 'src/repository/cart.repository';
import { ProductRepository } from 'src/repository/product.repository';
import { api } from 'src/utils/api.utils';
import { DataSource } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService
  ) { }

  async addProductToCart(token: string, addProductToCartDto: AddProductToCartDto) {
    const { userId } = await this.jwtService.verify(token);
    const { productId } = addProductToCartDto;

    const [cartData, productData] = await Promise.all([
      this.cartRepository.findOne({ where: { userId }, relations: ['cartItems.product'] }),
      this.productRepository.findOne({ where: { productId } }),
    ]);

    if (!productData) {
      throw new NotFoundException('Product not found');
    }
    if (productData.quantity < 1) {
      throw new BadRequestException('Product out of stock');
    }

    const entityManager = this.dataSource.createEntityManager();
    entityManager.transaction(async em => {
      if (cartData) {
        const cartItem = cartData.cartItems.find(cartItem => cartItem.product.productId === productData.productId);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          const newCartItem = { quantity: 1, product: productData } as CartItem;
          const saveCartItem = await em.save(CartItem, newCartItem);
          cartData.cartItems.push(saveCartItem);
        }
        cartData.price += productData.price;
        await em.save(Cart, cartData);
      }
      else {
        const newCartItem = { quantity: 1, product: productData } as CartItem;
        const saveCartItem = await em.save(CartItem, newCartItem);
        const newCart = { userId, cartItems: [saveCartItem], price: productData.price } as Cart;
        await em.save(Cart, newCart);
      }
    });
    return { message: 'Product added to cart' };
  }

  async getCart({ token }: { token: string; }): Promise<{ data: Cart[]; }> {
    const { userId } = await this.jwtService.verify(token);
    const cartData = await this.cartRepository.find({ where: userId, relations: ['cartItems.product'] });
    return { data: cartData };
  }

  async countProductInCart(token: string): Promise<{ data: number; }> {
    const { userId } = await this.jwtService.verify(token);
    const cart = await this.cartRepository.findOne({ where: { userId }, relations: ['cartItems'] });
    return { data: cart ? cart.cartItems.length : 0 };
  }

  async removeProductFromCart(token: string, removeProductFromCartDto: RemoveProductFromCartDto) {
    const { userId } = await this.jwtService.verify(token);
    const { productId } = removeProductFromCartDto;
    const [cartData, productData] = await Promise.all([
      this.cartRepository.findOne({ where: { userId }, relations: ['cartItems.product'] }),
      this.productRepository.findOne({ where: { productId } }),
    ]);

    const { cartItems } = cartData;
    const cartItem = cartItems.find(cartItem => cartItem.product.productId == productId);
    cartItem.quantity -= 1;
    cartData.price -= productData.price;
    if (cartItem.quantity < 1) {
      cartItems.splice(cartItems.indexOf(cartItem), 1);
    }
    await this.cartRepository.save(cartData);
    return { message: 'Remove Product From Cart Successfully' };
  }

  async paymentInCart(token: string) {
    const { userId } = await this.jwtService.verify(token);
    const cart = await this.cartRepository.findOne({ where: { userId }, relations: ['cartItems.product'] });
    const res = await api.patch('/user/payment', { amount: cart.price }, { headers: { token } });
    if (res.status === 200) {
      const entityManager = this.dataSource.createEntityManager();
      entityManager.transaction(async em => {
        const { cartItems } = cart;
        const updateProductPromises = cartItems.map(async (cartItem) => {
          const product = await em.findOneBy(Product, { productId: cartItem.product.productId });
          product.quantity -= cartItem.quantity;
          return em.save(Product, product);
        });

        await Promise.all([
          updateProductPromises,
          em.delete(CartItem, { cart: { cartId: cart.cartId } }),
          em.delete(Cart, { cartId: cart.cartId, userId }),
        ]);

      });
      return { message: 'Pay Successfully' };
    }
  }
}

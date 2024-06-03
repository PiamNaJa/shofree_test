import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  cartId: number;

  @Column({ nullable: false, type: 'int', name: 'user_id' })
  userId: number;

  @Column({ nullable: false, type: 'int' })
  price: number;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  cartItems: CartItem[];
}
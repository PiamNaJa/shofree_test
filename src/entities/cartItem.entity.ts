import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
    @PrimaryGeneratedColumn({ name: 'cart_item_id' })
    cartItemId: number;

    @Column({ nullable: false, type: 'int' })
    quantity: number;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    @JoinColumn({ name: 'cart_id' })
    cart: Cart;

    @ManyToOne(() => Product, product => product.cartItem, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>; // fix Cannot access 'Product' before initialization
}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId: number;

  @Column({ nullable: true, type: 'varchar', name: 'product_sku_id', unique: true })
  productSkuId: string;

  @Column({ nullable: false, type: 'varchar', name: 'product_name' })
  productName: string;

  @Column({ nullable: false, type: 'int' })
  price: number;

  @Column({ nullable: false, type: 'int', default: 1 })
  quantity: number;

  @OneToMany(() => CartItem, cartItem => cartItem.product, { cascade: true})
  cartItem: CartItem[];
}
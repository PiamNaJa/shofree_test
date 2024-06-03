import { Injectable } from "@nestjs/common";
import { CartItem } from "src/entities/cartItem.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CartItemRepository extends Repository<CartItem> {
    constructor(private readonly dataSource: DataSource) {
        super(CartItem, dataSource.createEntityManager());
    }
}
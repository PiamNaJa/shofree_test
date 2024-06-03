import { Injectable } from "@nestjs/common";
import { Cart } from "src/entities/cart.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CartRepository extends Repository<Cart> {
    constructor(private readonly dataSource: DataSource) {
        super(Cart, dataSource.createEntityManager());
    }
}
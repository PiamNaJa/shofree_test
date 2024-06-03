import { Module } from '@nestjs/common';
import { ProductController } from 'src/controllers/product.controller';
import { ProductRepository } from 'src/repository/product.repository';
import { ProductService } from 'src/services/product.service';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
})
export class ProductModule { }

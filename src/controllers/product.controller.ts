import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AddProductDto } from 'src/dto/product.dto';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('/product')
    async AddProduct(@Body(new ValidationPipe()) productDto: AddProductDto): Promise<{ message: string; }> {
        return this.productService.addProduct(productDto);
    }

    @Get('/product')
    async GetProducts(): Promise<{ data: Product[]; }> {
        return this.productService.getProducts();
    }
}

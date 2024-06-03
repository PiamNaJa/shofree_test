import { BadRequestException, Injectable } from '@nestjs/common';
import { AddProductDto } from 'src/dto/product.dto';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from 'src/repository/product.repository';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    async addProduct(productDto: AddProductDto): Promise<{ message: string; }> {
        if (productDto.productSkuId) {
            const product = await this.productRepository.findOneBy({ productSkuId: productDto.productSkuId });
            if (product) {
                throw new BadRequestException('Product already exists');
            }
        }
        await this.productRepository.save(productDto);
        return { message: 'Product added successfully' };
    }

    async getProducts(): Promise<{ data: Product[]; }> {
        const products = await this.productRepository.find();
        return { data: products };
    }
}

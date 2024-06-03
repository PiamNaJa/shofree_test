import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class AddProductDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'new product'
    })
    productName: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty({
        default: 30
    })
    price: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty({
        default: 3
    })
    quantity: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    productSkuId: string;
}
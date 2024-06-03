import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class AddProductToCartDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        default: 1
    })
    productId: number;
}

export class RemoveProductFromCartDto extends AddProductToCartDto { }
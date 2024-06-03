import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'book',
    })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'test',
    })
    password: string;
}

export class UserResDto {
    userId: number;
    username: string;
    firstname: string;
    lastname: string;
}
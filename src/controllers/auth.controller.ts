import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async Login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<{ token: string; }> {
        return this.authService.login(loginDto);
    }
}

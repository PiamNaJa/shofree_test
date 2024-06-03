import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/user')
    @UseGuards(TokenGuard)
    async GetUser(@Headers('token') token: string) {
        return await this.userService.getUser(token);
    }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserResDto } from 'src/dto/auth.dto';
import { api } from 'src/utils/api.utils';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async getUser(token: string): Promise<UserResDto> {
        await this.jwtService.verify(token);
        const res = await api.get('/user', { headers: { token } });
        return res.data as UserResDto;
    }
}

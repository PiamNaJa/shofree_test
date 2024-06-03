import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto/auth.dto';
import { api } from 'src/utils/api.utils';

@Injectable()
export class AuthService {
    async login(loginDto: LoginDto): Promise<{ token: string; }> {
        const res = await api.post('/login', loginDto);
        if (res.status === 201) {
            return res.data as { token: string; };
        }
        throw new UnauthorizedException('username or password is incorrect');
    }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const { token } = request.headers;
        if (!token) {
            throw new UnauthorizedException('Token is required');
        }
        return true;
    }
}
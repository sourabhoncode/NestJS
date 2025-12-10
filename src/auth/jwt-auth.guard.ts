import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        console.log("JwtAuthGuard TRIGGERED");
        const req = context.switchToHttp().getRequest();
        console.log("Auth Header:", req.headers.authorization);
        return super.canActivate(context);
    }
}

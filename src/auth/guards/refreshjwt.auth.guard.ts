import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('refreshToken') {
    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        req.body.refreshToken = ctx.getArgs().refreshToken;    
        return req;
    }


    // 
}

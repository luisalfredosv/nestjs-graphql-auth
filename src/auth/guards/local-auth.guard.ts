import { AuthGuard } from '@nestjs/passport';
export class LocalStrategy extends AuthGuard('local') {}
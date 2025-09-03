import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AccessLevel } from '../../users/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.accessLevel !== AccessLevel.ADMIN) {
      throw new ForbiddenException('Apenas administradores podem aceder a este recurso.');
    }

    return true;
  }
}
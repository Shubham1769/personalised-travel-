import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseValidator } from './basevalidator';

@Injectable()
export class CustomValidationPipe implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const schema = this.reflector.get('dtoSchema', context.getHandler());
    const whiteListed = this.reflector.get<boolean>(
      'dtoWhitelisted',
      context.getHandler()
    );
    const validator = new BaseValidator();

    validator.setContext(req);
    req._dto = await validator.fire(req.all(), schema, whiteListed);

    return true;
  }
}

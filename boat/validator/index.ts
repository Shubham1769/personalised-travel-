import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BaseValidator } from './basevalidator';
import { CustomValidationPipe } from './validationPipe';

export * from './decorators';

export { BaseValidator };

export function Validate(DTO: any, forbidNonWhitelisted = true) {
  return applyDecorators(
    SetMetadata('dtoSchema', DTO),
    SetMetadata('dtoWhitelisted', forbidNonWhitelisted),
    UseGuards(CustomValidationPipe),
    ApiBody({ type: DTO }),
  );
}

export const Dto = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request._dto;
  },
);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccountAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.accountAddress;
  },
);

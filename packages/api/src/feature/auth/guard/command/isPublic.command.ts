import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { IS_PUBLIC_KEY } from "@sparcs-students/api/common/decorators/skip-auth.decorator";

import { AuthCommand, AuthResult } from "../auth.command";

@Injectable()
export class IsPublicCommand implements AuthCommand {
  constructor(private reflector: Reflector) {}

  public next(
    context: ExecutionContext,
    prevResult: AuthResult,
  ): Promise<AuthResult> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // eslint-disable-next-line no-param-reassign
      prevResult.isPublic = true;
      return Promise.resolve(prevResult);
    }
    return Promise.resolve(prevResult);
  }
}

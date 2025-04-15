import { Reflector } from "@nestjs/core";
import { ExecutionContext, Injectable } from "@nestjs/common";

import { AuthRepository } from "@sparcs-students/api/feature/auth/repository/auth.repository";
import { MMember } from "@sparcs-students/api/feature/auth/type/member.model";

import { AuthCommand, AuthResult } from "../auth.command";

@Injectable()
export class SidCommand implements AuthCommand {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthRepository,
  ) {}

  public async next(
    context: ExecutionContext,
    prevResult: AuthResult,
  ): Promise<AuthResult> {
    const request = context.switchToHttp().getRequest();
    context.switchToHttp().getResponse<Response>();
    const { sid } = request.cookies;
    if (sid) {
      const memberDbResult = await this.authService.findUserByUid(sid);
      const member = MMember.fromDBResult(memberDbResult);
      if (!member) {
        return Promise.resolve(prevResult);
      }
      request.user = member;
      // eslint-disable-next-line no-param-reassign
      prevResult.authentication = true;
      // eslint-disable-next-line no-param-reassign
      prevResult.authorization = false;
      return Promise.resolve(prevResult);
    }
    return Promise.resolve(prevResult);
  }
}

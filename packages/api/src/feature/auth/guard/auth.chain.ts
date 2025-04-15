import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthCommand, AuthResult } from "./auth.command";

@Injectable()
export class AuthChain {
  private authChain: AuthCommand[];

  constructor() {
    this.authChain = [];
  }

  public register(command: AuthCommand) {
    this.authChain.push(command);
    return this;
  }

  public async execute(context: ExecutionContext) {
    let result = {
      authorization: false,
      authentication: false,
      isPublic: false,
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const command of this.authChain) {
      // eslint-disable-next-line no-await-in-loop
      result = await command.next(context, result);
    }
    return this.handleException(result);
  }

  private async handleException(result: AuthResult) {
    if (result.isPublic) return true;

    if (!result.authentication) throw new UnauthorizedException();
    // @todo: authorization 구현 시 자유도 높게 구현 가능
    // if (!result.authorization) throw new ForbiddenException();
    return true;
  }
}

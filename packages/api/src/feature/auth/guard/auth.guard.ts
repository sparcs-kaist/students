import { CanActivate, ExecutionContext } from "@nestjs/common";

import { AuthChain } from "@sparcs-students/api/feature/auth/guard/auth.chain";

export class AuthGuard implements CanActivate {
  constructor(private readonly authChain: AuthChain) {}

  async canActivate(context: ExecutionContext) {
    return this.authChain.execute(context);
  }
}

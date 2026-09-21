import { Injectable } from "@nestjs/common";

import { JwtHeaderCommand } from "@sparcs-students/api/feature/auth/guard/command/jwt.header.command";

import { AuthChain } from "./auth.chain";
import { IsPublicCommand } from "./command/isPublic.command";
import { JwtCookieCommand } from "./command/jwt.cookie.command";
import { SidCommand } from "./command/sid.command";
import { RequireOrganizationCommand } from "./command/requireOrganization.command";
import { RequirePositionCommand } from "./command/requirePosition.command";

@Injectable()
export class AuthConfig {
  constructor(
    private authChain: AuthChain,
    private readonly jwtCookieCommand: JwtCookieCommand,
    private readonly jwtHeaderCommand: JwtHeaderCommand,
    private readonly sidCommand: SidCommand,
    private readonly isPublicCommand: IsPublicCommand,
    private readonly requirePositionCommand: RequirePositionCommand,
    private readonly requireOrganizationCommand: RequireOrganizationCommand,
  ) {}

  public async config(env: string) {
    if (env === "local") return this.getLocalGuardConfig();
    if (env === "dev") return this.getDevGuardConfig();
    if (env === "prod") return this.getProdGuardConfig();
    return this.getProdGuardConfig();
  }

  private getLocalGuardConfig = () =>
    this.authChain
      .register(this.isPublicCommand)
      .register(this.sidCommand)
      .register(this.jwtHeaderCommand)
      .register(this.jwtCookieCommand)
      .register(this.requirePositionCommand)
      .register(this.requireOrganizationCommand);

  private getDevGuardConfig = () =>
    this.authChain
      .register(this.isPublicCommand)
      .register(this.sidCommand)
      .register(this.jwtHeaderCommand)
      .register(this.jwtCookieCommand)
      .register(this.requirePositionCommand)
      .register(this.requireOrganizationCommand);

  private getProdGuardConfig = () =>
    this.authChain
      .register(this.jwtHeaderCommand)
      .register(this.jwtCookieCommand)
      .register(this.isPublicCommand)
      .register(this.requirePositionCommand)
      .register(this.requireOrganizationCommand);
}

import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { OrganizationTypeEnum } from "@sparcs-students/interface/common/enum/organization.enum";
import { REQUIRE_ORGANIZATIONS_KEY } from "@sparcs-students/api/common/decorators/require-organization.decorator";
import { OrganizationCheckerService } from "@sparcs-students/api/feature/auth/service/organization-checker.service";
import { AuthCommand, AuthResult } from "../auth.command";

@Injectable()
export class RequireOrganizationCommand implements AuthCommand {
  constructor(
    private readonly reflector: Reflector,
    private readonly organizationChecker: OrganizationCheckerService,
  ) {}

  public async next(
    context: ExecutionContext,
    prevResult: AuthResult,
  ): Promise<AuthResult> {
    if (prevResult.isPublic) return prevResult;
    if (!prevResult.authentication) return prevResult;

    const required = this.reflector.getAllAndOverride<OrganizationTypeEnum[]>(
      REQUIRE_ORGANIZATIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required || required.length === 0) return prevResult;

    const request = context.switchToHttp().getRequest();
    const studentId: number | undefined = request?.user?.studentId;

    if (!studentId) {
      return { ...prevResult, authorization: false };
    }

    const now = new Date();
    const checks = await Promise.all(
      required.map(type =>
        this.organizationChecker.isMemberOfOrganizationType(
          studentId,
          type,
          now,
        ),
      ),
    );

    return { ...prevResult, authorization: checks.some(Boolean) };
  }
}

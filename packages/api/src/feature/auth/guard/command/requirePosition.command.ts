import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import {
  Position,
  REQUIRE_POSITIONS_KEY,
} from "@sparcs-students/api/common/decorators/require-position.decorator";
import { PositionCheckerService } from "@sparcs-students/api/feature/auth/service/position-checker.service";

import { AuthCommand, AuthResult } from "../auth.command";

@Injectable()
export class RequirePositionCommand implements AuthCommand {
  constructor(
    private readonly reflector: Reflector,
    private readonly positionChecker: PositionCheckerService,
  ) {}

  public async next(
    context: ExecutionContext,
    prevResult: AuthResult,
  ): Promise<AuthResult> {
    // Public이면 통과
    if (prevResult.isPublic) return prevResult;

    // 인증이 아직 안 되었으면 여기선 손대지 않음(Unauthorized는 체인 마지막에서 처리)
    if (!prevResult.authentication) return prevResult;

    const required = this.reflector.getAllAndOverride<Position[]>(
      REQUIRE_POSITIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 요구 직책이 없으면 그대로 통과 (authorization 기본 true 유지)
    if (!required || required.length === 0) return prevResult;

    const request = context.switchToHttp().getRequest();
    const studentId: number | undefined = request?.user?.studentId;

    // studentId 없으면(학생 아니면) 직책 검증 불가
    if (!studentId) {
      return { ...prevResult, authorization: false };
    }

    const now = new Date();

    const checks = await Promise.all(
      required.map(pos => this.checkOne(pos, studentId, now)),
    );

    const ok = checks.some(Boolean);
    return { ...prevResult, authorization: ok };
  }

  private async checkOne(
    pos: Position,
    studentId: number,
    now: Date,
  ): Promise<boolean> {
    if (pos === Position.MANAGER)
      return this.positionChecker.isManager(studentId, now);

    if (pos === Position.PRESIDENT)
      return this.positionChecker.isPresident(studentId, now);

    if (pos === Position.STAFF)
      return this.positionChecker.isStaff(studentId, now);

    if (pos === Position.UAPRESIDENT)
      return this.positionChecker.isUapresident(studentId, now);

    return false;
  }
}

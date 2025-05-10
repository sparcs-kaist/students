import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

import { AuthService } from "@sparcs-students/api/feature/auth/service/auth.service";
import {
  AuthCommand,
  AuthResult,
} from "@sparcs-students/api/feature/auth/guard/auth.command";
import settings from "@sparcs-students/api/settings";
import { MMember } from "@sparcs-students/api/feature/auth/type/member.model";
import { AuthRepository } from "@sparcs-students/api/feature/auth/repository/auth.repository";
import { JwtException } from "@sparcs-students/api/common/exceptions/jwt.exception";

@Injectable()
export class JwtHeaderCommand implements AuthCommand {
  private readonly jwtConfig = settings().getJwtConfig();

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  public async next(
    context: ExecutionContext,
    prevResult: AuthResult,
  ): Promise<AuthResult> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    const accessToken = this.extractTokenFromAuthorizationHeader(request);
    const refreshToken = request.headers["x-refresh-token"] as
      | string
      | undefined;

    try {
      if (!accessToken) throw new JwtException("jwt expired");

      const payload = await this.verifyToken(accessToken);
      const member = await this.getMemberFromPayload(payload);

      request.user = member;
      return this.setAuthenticated(prevResult);
    } catch (e: unknown) {
      if (
        e instanceof JwtException &&
        e.message === "jwt expired" &&
        refreshToken
      ) {
        return this.handleRefreshToken(
          refreshToken,
          request,
          response,
          prevResult,
        );
      }
      return prevResult;
    }
  }

  private async verifyToken(token: string): Promise<MMember> {
    return (await this.jwtService.verifyAsync(token, {
      secret: this.jwtConfig.secret,
      ignoreExpiration: false,
    })) as MMember;
  }

  private async getMemberFromPayload(payload: MMember): Promise<MMember> {
    const user = await this.authRepository.findMemberById(payload.id);
    if (!user) throw new NotFoundException("user is not found");
    return MMember.fromDBResult(user);
  }

  private async handleRefreshToken(
    refreshToken: string,
    request,
    response: Response,
    result: AuthResult,
  ): Promise<AuthResult> {
    try {
      const payload = await this.verifyToken(refreshToken);
      const member = await this.getMemberFromPayload(payload);

      const stored = await this.authRepository.findUserAndRefreshToken(
        member.id,
        refreshToken,
      );
      const isValid =
        stored && (await bcrypt.compare(refreshToken, stored.refreshToken));

      if (!isValid) return result;

      const newAccessToken = this.authService.getAccessToken(member);

      if (!response)
        throw new InternalServerErrorException(
          "Response object not found in request context",
        );

      response.setHeader("x-access-token", newAccessToken); // 쿠키 대신 헤더에 토큰 전달
      // eslint-disable-next-line no-param-reassign
      request.user = member;
      return this.setAuthenticated(result);
    } catch (err) {
      return result;
    }
  }

  private extractTokenFromAuthorizationHeader(
    request: Request,
  ): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader || typeof authHeader !== "string") return undefined;

    const [scheme, token] = authHeader.split(" ");
    return scheme === "Bearer" && token ? token : undefined;
  }

  private setAuthenticated(result: AuthResult): AuthResult {
    // eslint-disable-next-line no-param-reassign
    result.authentication = true;
    return result;
  }
}

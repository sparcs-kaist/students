import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  Session,
  UsePipes,
} from "@nestjs/common";
import { Response } from "express";

import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import apiAut001, {
  ApiAut001RequestQuery,
  ApiAut001ResponseOk,
} from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut001";
import apiAut004, {
  ApiAut004RequestQuery,
} from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut004";
import logger from "@sparcs-students/api/common/util/logger";
import apiAut002, {
  ApiAut002ResponseCreated,
} from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut002";
import apiAut003, {
  ApiAut003ResponseOk,
} from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut003";
import { AuthService } from "../service/auth.service";
import { Request, UserRefreshTokenPayload } from "../dto/auth.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get("/auth/sign-in")
  @UsePipes(new ZodPipe(apiAut001))
  async getAuthSignIn(
    @Req() req: Request,
    @Query() query: ApiAut001RequestQuery,
  ): Promise<ApiAut001ResponseOk> {
    const url = await this.authService.getAuthSignIn(query, req);
    return { url };
  }

  @Public()
  @Get("/auth/sign-in/callback")
  @UsePipes(new ZodPipe(apiAut004))
  async postAuthSigninCallback(
    @Res() res: Response,
    @Query() query: ApiAut004RequestQuery,
    @Session() session: Request["session"],
  ) {
    const { next, token } = await this.authService.getAuthSignInCallback(
      query,
      session,
    );

    res.cookie("refreshToken", token.refreshToken, {
      expires: token.refreshTokenExpiresAt,
      httpOnly: true,
      path: "/auth/refresh",
    });
    res.cookie("refreshToken", token.refreshToken, {
      expires: token.refreshTokenExpiresAt,
      httpOnly: true,
      path: "/auth/sign-out",
    });
    res.cookie("accessToken", token.accessToken, {
      expires: token.accessTokenTokenExpiresAt,
      httpOnly: false,
    });
    logger.debug(`Redirecting to ${next}`);
    return res.redirect(next);
  }

  @Public()
  @Post("/auth/refresh")
  @UsePipes(new ZodPipe(apiAut002))
  async postAuthRefresh(
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut002ResponseCreated> {
    return this.authService.postAuthRefresh(req.user);
  }

  @Public()
  @Post("/auth/sign-out")
  @UsePipes(new ZodPipe(apiAut003))
  postAuthSignout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut003ResponseOk> {
    const { refreshToken } = req?.cookies || {};
    res.cookie("refreshToken", null, {
      maxAge: -1,
      httpOnly: true,
      path: "/auth/refresh",
    });
    res.cookie("refreshToken", null, {
      maxAge: -1,
      httpOnly: true,
      path: "/auth/sign-out",
    });
    return this.authService.postAuthSignout(req.user, refreshToken);
  }

  // test용 API, 실제 사용하지 않음
  // @Get("/auth/test")
  // test(@GetStudent() user: GetStudent) {
  //   function printObjectPropertyTypes<T>(obj: T): void {
  //     // eslint-disable-next-line no-restricted-syntax, guard-for-in
  //     for (const key in obj) {
  //       logger.debug(`Property ${key} is of type ${typeof obj[key]}`);
  //     }
  //   }
  //
  //   printObjectPropertyTypes(user);
  //   logger.debug(user.studentId + user.studentNumber);
  // }
}

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
import {
  apiAut001,
  apiAut002,
  apiAut003,
  apiAut004,
  ApiAut001RequestQuery,
  ApiAut001ResponseOk,
  ApiAut002ResponseCreated,
  ApiAut003ResponseOk,
  ApiAut004RequestQuery,
} from "@sparcs-students/interface/api/auth/index";

import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import logger from "@sparcs-students/api/common/util/logger";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";

import { AuthService } from "../service/auth.service";
import { Request, UserRefreshTokenPayload } from "../dto/auth.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get("/sign-in")
  @UsePipes(new ZodPipe(apiAut001))
  async getAuthSignIn(
    @Req() req: Request,
    @Query() query: ApiAut001RequestQuery,
  ): Promise<ApiAut001ResponseOk> {
    const url = await this.authService.getAuthSignIn(query, req);
    return { url };
  }

  @Public()
  @Get("/sign-in/callback")
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
      path: "/",
    });
    res.cookie("accessToken", token.accessToken, {
      expires: token.accessTokenExpiresAt,
      httpOnly: false,
      path: "/",
    });
    logger.debug(`Redirecting to ${next}`);
    return res.redirect(next);
  }

  @Public()
  @Post("/refresh")
  @UsePipes(new ZodPipe(apiAut002))
  async postAuthRefresh(
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut002ResponseCreated> {
    return this.authService.postAuthRefresh(req.user);
  }

  @Post("/sign-out")
  @UsePipes(new ZodPipe(apiAut003))
  postAuthSignout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut003ResponseOk> {
    const { refreshToken } = req?.cookies || {};
    // res.cookie("refreshToken", null, {
    //   maxAge: -1,
    //   httpOnly: true,
    //   path: "/auth/refresh",
    // });
    res.cookie("accessToken", null, {
      maxAge: -1,
      httpOnly: true,
      path: "/",
    });
    res.cookie("refreshToken", null, {
      maxAge: -1,
      httpOnly: true,
      path: "/",
    });
    console.debug(req.user);
    return this.authService.postAuthSignout(req.user, refreshToken);
  }

  // test용 API, 실제 사용하지 않음
  @Get("/profile")
  test(@GetStudent() user: StudentProfile) {
    function printObjectPropertyTypes<T>(obj: T): void {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in obj) {
        logger.debug(`Property ${key} is of type ${typeof obj[key]}`);
      }
    }

    printObjectPropertyTypes(user);
    logger.debug(user.studentId + user.studentNumber);
    return user;
  }
}

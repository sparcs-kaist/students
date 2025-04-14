import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import settings from "@sparcs-students/api/settings";
import { SSOUser } from "@sparcs-students/api/feature/auth/dto/sso-user.dto";
import logger from "@sparcs-students/api/common/util/logger";
import { ApiAut001RequestQuery } from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut001";
import { ApiAut004RequestQuery } from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut004";
import { ApiAut002ResponseCreated } from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut002";
import { ApiAut003ResponseOk } from "@sparcs-students/root/packages/interface/src/api/auth/endpoint/apiAut003";
import { AuthRepository } from "@sparcs-students/api/feature/auth/repository/auth.repository";
import {
  MMember,
  RemoveOptional,
} from "@sparcs-students/api/feature/auth/type/member.model";
import { SSOClient } from "../util/sparcs-sso";
import { Request } from "../dto/auth.dto";

@Injectable()
export class AuthService {
  private readonly ssoClient;

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    const ssoConfig = settings().getSsoConfig();
    const ssoClient = new SSOClient(
      ssoConfig.ssoClientId,
      ssoConfig.ssoSecretKey,
    );
    this.ssoClient = ssoClient;
  }

  /**
   * @param query
   * @param req
   * @description getAuthSignIn의 서비스 진입점입니다.
   * @returns SPRACS SSO의 로그인 url을 리턴합니다.
   */
  public async getAuthSignIn(query: ApiAut001RequestQuery, req: Request) {
    // eslint-disable-next-line no-param-reassign
    req.session.next = query.next ?? "/";
    const { url, state } = this.ssoClient.get_login_params();

    // eslint-disable-next-line no-param-reassign
    req.session.ssoState = state;
    return url;
  }

  /**
   * @param query
   * @param session
   * @description getAuthSignInCallback의 서비스 진입점입니다.
   * @returns
   */
  public async getAuthSignInCallback(
    query: ApiAut004RequestQuery,
    session: Request["session"],
  ) {
    const ssoProfile: SSOUser = await this.ssoClient.get_user_info(query.code);
    logger.info(JSON.stringify(ssoProfile));

    let studentNumber = ssoProfile.kaist_info.ku_std_no || "00000000";
    let email =
      ssoProfile.kaist_info.mail?.replace("mailto:", "") ||
      "unknown@kaist.ac.kr";
    const uid = ssoProfile.uid || "00000000";
    let sid = ssoProfile.sid || "00000000";
    let name = ssoProfile.kaist_info.ku_kname || "unknown";
    let type = ssoProfile.kaist_info.ku_person_type || "Student";
    let department = ssoProfile.kaist_info.ku_kaist_org_id || "0000";

    if (process.env.NODE_ENV === "local") {
      studentNumber = process.env.USER_KU_STD_NO;
      email = process.env.USER_MAIL;
      sid = process.env.USER_SID;
      name = process.env.USER_KU_KNAME;
      type = process.env.USER_KU_PERSON_TYPE;
      department = process.env.USER_KU_KAIST_ORG_ID;
    }

    const memberDbResult = await this.authRepository.findOrCreateUser(
      email,
      studentNumber,
      uid,
      sid,
      name,
      type,
      department,
    );
    const member = MMember.fromDBResult(memberDbResult);
    const accessToken = this.getAccessToken(member);
    delete member.department;
    delete member.studentNumber;
    delete member.organization;
    delete member.duration;
    const refreshToken = this.getRefreshToken(member);
    const current = new Date(); // todo 시간 변경 필요.
    const accessTokenTokenExpiresAt = new Date(
      current.getTime() + parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN),
    );
    const refreshTokenExpiresAt = new Date(
      current.getTime() + parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN),
    );
    const nextUrl = session.next ?? "/";

    const token = {
      accessToken,
      refreshToken,
      refreshTokenExpiresAt,
      accessTokenTokenExpiresAt,
    };

    return (await this.authRepository.createRefreshTokenRecord(
      memberDbResult.user.id,
      refreshToken,
      refreshTokenExpiresAt,
    ))
      ? {
          next: nextUrl,
          token,
        }
      : (() => {
          throw new HttpException("Cannot store refreshtoken", 500);
        })();
  }

  /**
   * @description Refresh Token을 통해 Access Token을 재발급합니다.
   * 새로운 새로운 organization으로 진입하는 경우 새로운 access token을 발급해야합니다.
   * @param _user
   */
  async postAuthRefresh(_user: {
    id: number;
    organizationId?: number;
  }): Promise<ApiAut002ResponseCreated> {
    const memberDbResult = await this.authRepository.findMemberById(
      _user.id,
      _user.organizationId,
    );
    const member = MMember.fromDBResult(memberDbResult);
    const accessToken = this.getAccessToken(member);

    return {
      accessToken,
    };
  }

  // TODO: 로직 수정 필요
  async postAuthSignout(
    _user: {
      id: number;
      sid: string;
      name: string;
      email: string;
    },
    refreshToken: string,
  ): Promise<ApiAut003ResponseOk> {
    return (await this.authRepository.deleteRefreshTokenRecord(
      _user.id,
      refreshToken,
    ))
      ? {}
      : (() => {
          throw new HttpException("Cannot delete refreshtoken", 500);
        })();
  }

  getAccessToken(user: MMember) {
    const accessToken = this.jwtService.sign(user, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    return accessToken;
  }

  getRefreshToken(user: RemoveOptional<MMember>) {
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        sid: user.sid,
        name: user.name,
        email: user.email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    );
    return refreshToken;
  }
}

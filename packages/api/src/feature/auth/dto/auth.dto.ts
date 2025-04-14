import { Request as _Request } from "express";
import {
  MMember,
  RemoveOptional,
} from "@sparcs-students/api/feature/auth/type/member.model";

export interface UserRefreshTokenPayload {
  user: RemoveOptional<MMember> & { organizationId?: number };
}

export interface UserAccessTokenPayload {
  user: RemoveOptional<MMember> & { organizationId?: number };
}

export type Request = _Request & RequestExtra;
export interface RequestExtra {
  session: {
    next: string;
    ssoState: string;
  };
}

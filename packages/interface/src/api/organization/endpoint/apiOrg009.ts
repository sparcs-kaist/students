import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zTeamLeaderRequestCreate,
  zTeamLeaderResponse,
} from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 각 단체장단의 권한으로, teamLeader를 임명합니다.
 */

const url = () => `/president/organizations/teams/leader`;
const method = "POST";
export const ApiOrg009RequestUrl = "/president/organizations/teams/leader";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  teamLeader: zTeamLeaderRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    teamLeaderId: zTeamLeaderResponse,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Forbidden"),
    message: z.literal("Unauthorized"),
  }),
};

const apiOrg009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg009RequestParam = z.infer<typeof apiOrg009.requestParam>;
type ApiOrg009RequestQuery = z.infer<typeof apiOrg009.requestQuery>;
type ApiOrg009RequestBody = z.infer<typeof apiOrg009.requestBody>;
type ApiOrg009ResponseCreated = z.infer<
  (typeof apiOrg009.responseBodyMap)[201]
>;

export default apiOrg009;

export type {
  ApiOrg009RequestParam,
  ApiOrg009RequestQuery,
  ApiOrg009RequestBody,
  ApiOrg009ResponseCreated,
};

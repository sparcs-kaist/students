import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zTeamRequestCreate, zTeamResponse } from "../type/organization.type";

/**
 * @version v0.1
 * @description 각 단체장단의 권한으로, 단체 내에 새로운 team을 만들어냅니다.
 */

const url = () => `/president/organizations/teams/team`;
const method = "POST";
export const ApiOrg007RequestUrl = "/president/organizations/teams/team";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  team: zTeamRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    team: zTeamResponse,
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

const apiOrg007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg007RequestParam = z.infer<typeof apiOrg007.requestParam>;
type ApiOrg007RequestQuery = z.infer<typeof apiOrg007.requestQuery>;
type ApiOrg007RequestBody = z.infer<typeof apiOrg007.requestBody>;
type ApiOrg007ResponseCreated = z.infer<
  (typeof apiOrg007.responseBodyMap)[201]
>;

export default apiOrg007;

export type {
  ApiOrg007RequestParam,
  ApiOrg007RequestQuery,
  ApiOrg007RequestBody,
  ApiOrg007ResponseCreated,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zTeamMemberRequestCreate,
  zTeamMemberResponse,
} from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 각 단체장단의 권한으로, teamMember를 임명합니다.
 */

const url = () => `/president/organizations/teams/member`;
const method = "POST";
export const ApiOrg008RequestUrl = "/president/organizations/teams/member";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  teamMember: zTeamMemberRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: zTeamMemberResponse,
};

const responseErrorMap = {};

const apiOrg008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg008RequestParam = z.infer<typeof apiOrg008.requestParam>;
type ApiOrg008RequestQuery = z.infer<typeof apiOrg008.requestQuery>;
type ApiOrg008RequestBody = z.infer<typeof apiOrg008.requestBody>;
type ApiOrg008ResponseCreated = z.infer<
  (typeof apiOrg008.responseBodyMap)[201]
>;

export default apiOrg008;

export type {
  ApiOrg008RequestParam,
  ApiOrg008RequestQuery,
  ApiOrg008RequestBody,
  ApiOrg008ResponseCreated,
};

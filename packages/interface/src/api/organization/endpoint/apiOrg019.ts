import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zTeamMember } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로 팀 멤버(teamMember)의 임기를 종료합니다.
 */

const url = (id: string) =>
  `/president/organizations/teams/member/${id}/retire`;
const method = "PATCH";
export const ApiOrg019RequestUrl =
  "/president/organizations/teams/member/:id/retire";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({
  endTerm: z.coerce.date().nullable().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    TeamMember: zTeamMember,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg019 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg019RequestParam = z.infer<typeof apiOrg019.requestParam>;
type ApiOrg019RequestQuery = z.infer<typeof apiOrg019.requestQuery>;
type ApiOrg019RequestBody = z.infer<typeof apiOrg019.requestBody>;
type ApiOrg019ResponseOk = z.infer<(typeof apiOrg019.responseBodyMap)[200]>;

export default apiOrg019;

export type {
  ApiOrg019RequestParam,
  ApiOrg019RequestQuery,
  ApiOrg019RequestBody,
  ApiOrg019ResponseOk,
};

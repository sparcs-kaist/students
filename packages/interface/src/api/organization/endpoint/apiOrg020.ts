import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zTeamLeader } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로 팀 리더(teamLeader)의 임기를 종료합니다.
 */

const url = (id: string) =>
  `/president/organizations/teams/leader/${id}/retire`;
const method = "PATCH";
export const ApiOrg020RequestUrl =
  "/president/organizations/teams/leader/:id/retire";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({
  endTerm: z.coerce.date().nullable().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    TeamLeader: zTeamLeader,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg020 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg020RequestParam = z.infer<typeof apiOrg020.requestParam>;
type ApiOrg020RequestQuery = z.infer<typeof apiOrg020.requestQuery>;
type ApiOrg020RequestBody = z.infer<typeof apiOrg020.requestBody>;
type ApiOrg020ResponseOk = z.infer<(typeof apiOrg020.responseBodyMap)[200]>;

export default apiOrg020;

export type {
  ApiOrg020RequestParam,
  ApiOrg020RequestQuery,
  ApiOrg020RequestBody,
  ApiOrg020ResponseOk,
};

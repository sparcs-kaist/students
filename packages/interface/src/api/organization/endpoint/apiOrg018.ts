import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로, 단체(organization) 내의 팀(team)을 삭제합니다.
 */

const url = (id: number) => `/president/organizations/teams/team/${id}/delete`;
const method = "DELETE";
export const ApiOrg018RequestUrl =
  "/president/organizations/teams/team/:id/delete";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiOrg018 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg018RequestParam = z.infer<typeof apiOrg018.requestParam>;
type ApiOrg018RequestQuery = z.infer<typeof apiOrg018.requestQuery>;
type ApiOrg018RequestBody = z.infer<typeof apiOrg018.requestBody>;
type ApiOrg018ResponseCreated = z.infer<
  (typeof apiOrg018.responseBodyMap)[200]
>;

export default apiOrg018;

export type {
  ApiOrg018RequestParam,
  ApiOrg018RequestQuery,
  ApiOrg018RequestBody,
  ApiOrg018ResponseCreated,
};

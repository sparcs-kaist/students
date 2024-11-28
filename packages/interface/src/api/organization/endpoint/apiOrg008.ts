import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 기구장단 권한으로 팀에 멤버를 생성합니다.
 * 만약 팀이 없거나 유저가 없는 경우 404 에러를 반환합니다.
 * 만약 팀에 이미 유저가 있는 경우 400 에러를 반환합니다.
 */

const url = () => `/president/organizations/teams/member`;
const method = "POST";
export const ApiOrg008RequestUrl = "/president/organizations/teams/member";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  teamId: zId,
  userId: zId,
  startTerm: z.coerce.date(),
  endTerm: z.coerce.date().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    teamMemberId: zId,
  }),
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

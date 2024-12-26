import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 기구장단 권한으로 팀에 리더를 생성합니다.
 * 만약 팀이 없거나 유저가 없거나 유저가 팀멤버가 아닌 경우 404 에러를 반환합니다.
 * 만약 이미 팀에 리더가 있는 경우 에러가 발생합니다.
 */

const url = () => `/president/organizations/teams/leader`;
const method = "POST";
export const ApiOrg009RequestUrl = "/president/organizations/teams/leader";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  teamId: zId,
  userId: zId,
  role: z.string().max(30),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    teamLeaderId: zId,
  }),
};

const responseErrorMap = {};

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

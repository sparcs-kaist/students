import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOrgName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 기구장단 권한으로 새로운 팀을 생성합니다.
 */

const url = () => `/president/organizations/teams/team`;
const method = "POST";
export const ApiOrg007RequestUrl = "/president/organizations/teams/team";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  organizationId: zId,
  semesterId: zId,
  name: zOrgName,
  detail: z.coerce.string(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    teamId: zId,
  }),
};

const responseErrorMap = {};

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

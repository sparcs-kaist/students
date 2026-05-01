import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 로그인한 학생이 소속된 단체(organization) 멤버십 목록을 조회합니다.
 */

const url = () => `/organizations/me/memberships`;
const method = "GET";
export const ApiOrg025RequestUrl = "/organizations/me/memberships";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const zMyMembership = z.object({
  membershipId: z.number(),
  organizationId: z.number(),
  name: z.string(),
  nameEng: z.string(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizations: z.array(zMyMembership),
  }),
};

const responseErrorMap = {};

const apiOrg025 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg025RequestParam = z.infer<typeof apiOrg025.requestParam>;
type ApiOrg025RequestQuery = z.infer<typeof apiOrg025.requestQuery>;
type ApiOrg025RequestBody = z.infer<typeof apiOrg025.requestBody>;
type ApiOrg025ResponseOk = z.infer<(typeof apiOrg025.responseBodyMap)[200]>;

export default apiOrg025;

export type {
  ApiOrg025RequestParam,
  ApiOrg025RequestQuery,
  ApiOrg025RequestBody,
  ApiOrg025ResponseOk,
};

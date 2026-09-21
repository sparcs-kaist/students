import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zOrganizationRoleRequestCreate,
  zOrganizationRole,
} from "../type/organization.role.type";

/**
 * @version v0.1
 * @description 조직 내 역할을 생성합니다.
 */

const url = () => "/president/organizations/role";
const method = "POST";
export const ApiOrg028RequestUrl = "/president/organizations/role";

const requestParam = z.object({});
const requestQuery = z.object({});
const requestBody = z.object({
  organizationRole: zOrganizationRoleRequestCreate,
});
const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({ organizationRole: zOrganizationRole }),
};

const apiOrg028 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap: {},
};
type ApiOrg028RequestBody = z.infer<typeof apiOrg028.requestBody>;
type ApiOrg028ResponseCreated = z.infer<
  (typeof apiOrg028.responseBodyMap)[201]
>;
export default apiOrg028;
export type { ApiOrg028RequestBody, ApiOrg028ResponseCreated };

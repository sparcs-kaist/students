import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import {
  zOrganizationRoleRequestUpdate,
  zOrganizationRole,
} from "../type/organization.role.type";

/**
 * @version v0.1
 * @description 조직 내 역할을 수정합니다.
 */

const url = (id: number) => `/president/organizations/role/${id}`;
const method = "PATCH";
export const ApiOrg029RequestUrl = "/president/organizations/role/:id";

const requestParam = z.object({ id: zId });
const requestQuery = z.object({});
const requestBody = z.object({
  organizationRole: zOrganizationRoleRequestUpdate,
});
const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({ organizationRole: zOrganizationRole }),
};

const apiOrg029 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap: {},
};
type ApiOrg029RequestParam = z.infer<typeof apiOrg029.requestParam>;
type ApiOrg029RequestBody = z.infer<typeof apiOrg029.requestBody>;
type ApiOrg029ResponseOk = z.infer<(typeof apiOrg029.responseBodyMap)[200]>;
export default apiOrg029;
export type {
  ApiOrg029RequestParam,
  ApiOrg029RequestBody,
  ApiOrg029ResponseOk,
};

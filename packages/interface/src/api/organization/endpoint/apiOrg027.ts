import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zOrganizationRole } from "../type/organization.role.type";

/**
 * @version v0.1
 * @description organizationId와 roleName을 기반으로 해당 역할의 조직 내 역할 이력을 조회합니다.
 */

const url = () => "/uapresident/organizations/get-history-by-rolename";
const method = "GET";
export const ApiOrg027RequestUrl =
  "/uapresident/organizations/get-history-by-rolename";

const requestParam = z.object({});
const requestQuery = z.object({
  organizationId: zId,
  roleName: z.string().trim().min(1).max(100),
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
});
const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({ histories: z.array(zOrganizationRole) }),
};

const apiOrg027 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap: {},
};

type ApiOrg027RequestQuery = z.infer<typeof apiOrg027.requestQuery>;
type ApiOrg027ResponseOk = z.infer<(typeof apiOrg027.responseBodyMap)[200]>;

export default apiOrg027;
export type { ApiOrg027RequestQuery, ApiOrg027ResponseOk };

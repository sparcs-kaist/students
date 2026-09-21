import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zOrganizationRole } from "../type/organization.role.type";

/**
 * @version v0.1
 * @description organizationId와 roleName을 기반으로 해당 역할의 조직 내 역할 이력을 조회합니다.
 */

const url = () => "/uapresident/organizations/get-history-by-rolename-v2";
const method = "GET";
export const ApiOrg032RequestUrl =
  "/uapresident/organizations/get-history-by-rolename-v2";

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

const apiOrg032 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap: {},
};

type ApiOrg032RequestQuery = z.infer<typeof apiOrg032.requestQuery>;
type ApiOrg032ResponseOk = z.infer<(typeof apiOrg032.responseBodyMap)[200]>;

export default apiOrg032;
export type { ApiOrg032RequestQuery, ApiOrg032ResponseOk };

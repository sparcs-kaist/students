import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zOrganizationRole } from "../type/organization.role.type";

/**
 * @version v0.1
 * @description 단체 내 역할 부여 내역을 조회합니다.
 */

const url = (organizationId: number) =>
  `/president/organizations/role?organizationId=${organizationId}`;
const method = "GET";
export const ApiOrg027RequestUrl = "/president/organizations/role";

const requestParam = z.object({});
const requestQuery = z.object({ organizationId: zId });
const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationRoles: z.array(zOrganizationRole),
  }),
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

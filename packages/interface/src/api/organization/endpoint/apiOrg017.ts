import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOrganizationManager } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로 매니저(organizationManager)의 임기를 종료합니다.
 */

const url = (id: string) => `/president/organizations/manager/${id}/retire`;
const method = "PATCH";
export const ApiOrg017RequestUrl =
  "/president/organizations/manager/:id/retire";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({
  endTerm: z.coerce.date().nullable().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    OrganizationManager: zOrganizationManager,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg017 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg017RequestParam = z.infer<typeof apiOrg017.requestParam>;
type ApiOrg017RequestQuery = z.infer<typeof apiOrg017.requestQuery>;
type ApiOrg017RequestBody = z.infer<typeof apiOrg017.requestBody>;
type ApiOrg017ResponseOk = z.infer<(typeof apiOrg017.responseBodyMap)[200]>;

export default apiOrg017;

export type {
  ApiOrg017RequestParam,
  ApiOrg017RequestQuery,
  ApiOrg017RequestBody,
  ApiOrg017ResponseOk,
};

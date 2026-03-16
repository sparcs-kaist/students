import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOrganizationPresident } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 총학생회장(uapresident) 권한으로 단체장(president)을 임명합니다.
 */

export const zOrganizationPresidentRequestCreate = zOrganizationPresident
  .omit({
    id: true,
  })
  .openapi("OrganizationPresidentRequestCreate");

const url = () => `/uapresident/organizations/president`;
const method = "POST";
export const ApiOrg003RequestUrl = "/uapresident/organizations/president";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  OrganizationPresident: zOrganizationPresidentRequestCreate,
  ignorePrev: z.boolean(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organizationPresident: zOrganizationPresident,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.literal("Already President"),
  }),
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiOrg003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg003RequestParam = z.infer<typeof apiOrg003.requestParam>;
type ApiOrg003RequestQuery = z.infer<typeof apiOrg003.requestQuery>;
type ApiOrg003RequestBody = z.infer<typeof apiOrg003.requestBody>;
type ApiOrg003ResponseCreated = z.infer<
  (typeof apiOrg003.responseBodyMap)[201]
>;

export default apiOrg003;

export type {
  ApiOrg003RequestParam,
  ApiOrg003RequestQuery,
  ApiOrg003RequestBody,
  ApiOrg003ResponseCreated,
};

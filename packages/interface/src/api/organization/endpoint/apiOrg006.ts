import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOrganizationManager } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장단 권한으로 매니저를 임명합니다.
 */

export const zOrganizationManagerRequestCreate = zOrganizationManager
  .omit({
    id: true,
  })
  .openapi("OrganizationManagerRequestCreate");

const url = () => `/president/organizations/manager`;
const method = "POST";
export const ApiOrg006RequestUrl = "/president/organizations/manager";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  OrganizationManager: zOrganizationManagerRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organizationManager: zOrganizationManager,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.literal("Already Manager"),
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

const apiOrg006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg006RequestParam = z.infer<typeof apiOrg006.requestParam>;
type ApiOrg006RequestQuery = z.infer<typeof apiOrg006.requestQuery>;
type ApiOrg006RequestBody = z.infer<typeof apiOrg006.requestBody>;
type ApiOrg006ResponseCreated = z.infer<
  (typeof apiOrg006.responseBodyMap)[201]
>;

export default apiOrg006;

export type {
  ApiOrg006RequestParam,
  ApiOrg006RequestQuery,
  ApiOrg006RequestBody,
  ApiOrg006ResponseCreated,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOrganizationMember } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로 멤버(organizationMember)를 임명합니다.
 */

export const zOrganizationMemberRequestCreate = zOrganizationMember
  .omit({
    id: true,
  })
  .openapi("OrganizationMemberRequestCreate");

const url = () => `/president/organizations/member`;
const method = "POST";
export const ApiOrg005RequestUrl = "/president/organizations/member";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  OrganizationMember: zOrganizationMemberRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organizationMember: zOrganizationMember,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.literal("Already Member"),
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

const apiOrg005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg005RequestParam = z.infer<typeof apiOrg005.requestParam>;
type ApiOrg005RequestQuery = z.infer<typeof apiOrg005.requestQuery>;
type ApiOrg005RequestBody = z.infer<typeof apiOrg005.requestBody>;
type ApiOrg005ResponseCreated = z.infer<
  (typeof apiOrg005.responseBodyMap)[201]
>;

export default apiOrg005;

export type {
  ApiOrg005RequestParam,
  ApiOrg005RequestQuery,
  ApiOrg005RequestBody,
  ApiOrg005ResponseCreated,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOrganizationMember } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 특정 단체에 멤버가 되기를 신청합니다.
 */

export const zOrganizationMemberApplyRequestCreate = zOrganizationMember
  .omit({
    id: true,
  })
  .partial({
    student: true,
    duration: true,
  })
  .openapi("OrganizationMemberApplyRequestCreate");

const url = () => `/organizations/apply`;
const method = "POST";
export const ApiOrg011RequestUrl = "/organizations/apply";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  OrganizationMember: zOrganizationMemberApplyRequestCreate,
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

const apiOrg011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg011RequestParam = z.infer<typeof apiOrg011.requestParam>;
type ApiOrg011RequestQuery = z.infer<typeof apiOrg011.requestQuery>;
type ApiOrg011RequestBody = z.infer<typeof apiOrg011.requestBody>;
type ApiOrg011ResponseCreated = z.infer<
  (typeof apiOrg011.responseBodyMap)[201]
>;

export default apiOrg011;

export type {
  ApiOrg011RequestParam,
  ApiOrg011RequestQuery,
  ApiOrg011RequestBody,
  ApiOrg011ResponseCreated,
};

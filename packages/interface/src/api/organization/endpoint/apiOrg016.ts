import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOrganizationMember } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로 멤버(organizationMember)의 임기를 종료합니다.
 */

const url = (id: string) => `/president/organizations/member/${id}/retire`;
const method = "PATCH";
export const ApiOrg016RequestUrl = "/president/organizations/member/:id/retire";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({
  endTerm: z.coerce.date().nullable().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    OrganizationMember: zOrganizationMember,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg016 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg016RequestParam = z.infer<typeof apiOrg016.requestParam>;
type ApiOrg016RequestQuery = z.infer<typeof apiOrg016.requestQuery>;
type ApiOrg016RequestBody = z.infer<typeof apiOrg016.requestBody>;
type ApiOrg016ResponseOk = z.infer<(typeof apiOrg016.responseBodyMap)[200]>;

export default apiOrg016;

export type {
  ApiOrg016RequestParam,
  ApiOrg016RequestQuery,
  ApiOrg016RequestBody,
  ApiOrg016ResponseOk,
};

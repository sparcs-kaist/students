import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 기구장의 권한으로 OrganizationMember를 임명합니다.
 */

const url = () => `/president/organizations/member`;
const method = "POST";
export const ApiOrg005RequestUrl = "/president/organizations/member";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  userId: zId,
  organizationId: zId,
  startTerm: z.coerce.date(),
  endTerm: z.coerce.date().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organizationMemberId: zId,
  }),
};

const responseErrorMap = {};

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

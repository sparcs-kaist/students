import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOperatingCommitteeMember } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장단 권한으로 운영위원회 멤버를 임명합니다.
 */

export const zOperatingCommitteeMemberRequestCreate = zOperatingCommitteeMember
  .omit({
    id: true,
  })
  .openapi("OperatingCommitteeMemberRequestCreate");

const url = () => `/president/organizations/operating-committee/member`;
const method = "POST";
export const ApiOrg013RequestUrl =
  "/president/organizations/operating-committee/member";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  operatingCommitteeMember: zOperatingCommitteeMemberRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    operatingCommitteeMember: zOperatingCommitteeMember,
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

const apiOrg013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg013RequestParam = z.infer<typeof apiOrg013.requestParam>;
type ApiOrg013RequestQuery = z.infer<typeof apiOrg013.requestQuery>;
type ApiOrg013RequestBody = z.infer<typeof apiOrg013.requestBody>;
type ApiOrg013ResponseCreated = z.infer<
  (typeof apiOrg013.responseBodyMap)[201]
>;

export default apiOrg013;

export type {
  ApiOrg013RequestParam,
  ApiOrg013RequestQuery,
  ApiOrg013RequestBody,
  ApiOrg013ResponseCreated,
};

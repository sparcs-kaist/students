import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zOperatingCommitteeMember } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로 운영위원회 멤버(operatingCommitteeMember)의 임기를 종료합니다.
 */

const url = (id: number) =>
  `/president/organizations/operating-committee/member/${id}/retire`;
const method = "PATCH";
export const ApiOrg022RequestUrl =
  "/president/organizations/operating-committee/member/:id/retire";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({
  endTerm: z.coerce.date(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    OperatingCommitteeMember: zOperatingCommitteeMember,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg022 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg022RequestParam = z.infer<typeof apiOrg022.requestParam>;
type ApiOrg022RequestQuery = z.infer<typeof apiOrg022.requestQuery>;
type ApiOrg022RequestBody = z.infer<typeof apiOrg022.requestBody>;
type ApiOrg022ResponseOk = z.infer<(typeof apiOrg022.responseBodyMap)[200]>;

export default apiOrg022;

export type {
  ApiOrg022RequestParam,
  ApiOrg022RequestQuery,
  ApiOrg022RequestBody,
  ApiOrg022ResponseOk,
};

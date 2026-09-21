import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zOrganizationRole } from "../type/organization.role.type";

/**
 * @version v0.1
 * @description studentId를 기반으로 해당 학생의 조직 내 역할 이력을 조회합니다.
 */

const url = (studentId: number) =>
  `/uapresident/organizations/get-history-by-id-v2?studentId=${studentId}`;
const method = "GET";
export const ApiOrg031RequestUrl =
  "/uapresident/organizations/get-history-by-id-v2";

const requestParam = z.object({});
const requestQuery = z.object({
  studentId: zId,
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
});
const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({ histories: z.array(zOrganizationRole) }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg031 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg031RequestParam = z.infer<typeof apiOrg031.requestParam>;
type ApiOrg031RequestQuery = z.infer<typeof apiOrg031.requestQuery>;
type ApiOrg031RequestBody = z.infer<typeof apiOrg031.requestBody>;
type ApiOrg031ResponseOk = z.infer<(typeof apiOrg031.responseBodyMap)[200]>;

export default apiOrg031;

export type {
  ApiOrg031RequestParam,
  ApiOrg031RequestQuery,
  ApiOrg031RequestBody,
  ApiOrg031ResponseOk,
};

import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zOrganizationRole } from "../type/organization.role.type";

/**
 * @version v0.1
 * @description studentId를 기반으로 해당 학생의 조직 내 역할 이력을 조회합니다.
 */

const url = (studentId: number) =>
  `/uapresident/organizations/get-history-byId?studentId=${studentId}`;
const method = "GET";
export const ApiOrg026RequestUrl =
  "/uapresident/organizations/get-history-byId";

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

const apiOrg026 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg026RequestParam = z.infer<typeof apiOrg026.requestParam>;
type ApiOrg026RequestQuery = z.infer<typeof apiOrg026.requestQuery>;
type ApiOrg026RequestBody = z.infer<typeof apiOrg026.requestBody>;
type ApiOrg026ResponseOk = z.infer<(typeof apiOrg026.responseBodyMap)[200]>;

export default apiOrg026;

export type {
  ApiOrg026RequestParam,
  ApiOrg026RequestQuery,
  ApiOrg026RequestBody,
  ApiOrg026ResponseOk,
};

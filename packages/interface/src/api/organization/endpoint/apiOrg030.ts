import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 조직 내 역할을 삭제합니다.
 */

const url = (id: number) => `/president/organizations/role/${id}`;
const method = "DELETE";
export const ApiOrg030RequestUrl = "/president/organizations/role/:id";

const requestParam = z.object({ id: zId });
const requestQuery = z.object({});
const requestBody = z.object({});
const responseBodyMap = { [HttpStatusCode.NoContent]: z.object({}) };
const apiOrg030 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap: {},
};
type ApiOrg030RequestParam = z.infer<typeof apiOrg030.requestParam>;
export default apiOrg030;
export type { ApiOrg030RequestParam };

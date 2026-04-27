import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 단체장(president) 권한으로 운영위원회(operatingCommittee)을 삭제합니다.
 */

const url = (id: number) =>
  `/president/organizations/operating-committee/${id}/delete`;
const method = "DELETE";
export const ApiOrg021RequestUrl =
  "/president/organizations/operating-committee/:id/delete";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiOrg021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg021RequestParam = z.infer<typeof apiOrg021.requestParam>;
type ApiOrg021RequestQuery = z.infer<typeof apiOrg021.requestQuery>;
type ApiOrg021RequestBody = z.infer<typeof apiOrg021.requestBody>;
type ApiOrg021ResponseOk = z.infer<(typeof apiOrg021.responseBodyMap)[200]>;

export default apiOrg021;

export type {
  ApiOrg021RequestParam,
  ApiOrg021RequestQuery,
  ApiOrg021RequestBody,
  ApiOrg021ResponseOk,
};

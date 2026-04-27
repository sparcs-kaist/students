import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 총학생회장(uapresident) 권한으로 단체(organization)를 삭제합니다.
 */

const url = (id: number) =>
  `/uapresident/organizations/organization/${id}/delete`;
const method = "DELETE";
export const ApiOrg014RequestUrl =
  "/uapresident/organizations/organization/:id/delete";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiOrg014 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg014RequestParam = z.infer<typeof apiOrg014.requestParam>;
type ApiOrg014RequestQuery = z.infer<typeof apiOrg014.requestQuery>;
type ApiOrg014RequestBody = z.infer<typeof apiOrg014.requestBody>;
type ApiOrg014ResponseOk = z.infer<(typeof apiOrg014.responseBodyMap)[200]>;

export default apiOrg014;

export type {
  ApiOrg014RequestParam,
  ApiOrg014RequestQuery,
  ApiOrg014RequestBody,
  ApiOrg014ResponseOk,
};

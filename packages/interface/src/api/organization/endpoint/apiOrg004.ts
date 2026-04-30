import { HttpStatusCode } from "axios";
import { z } from "zod";
import { zOrganizationPresident } from "../type/organization.student.type";

/**
 * @version v0.1
 * @description 총학생회장(uapresident)의 권한으로 단체장(president)의 임기를 종료합니다.
 */

const url = (id: number) => `/uapresident/organizations/president/${id}/retire`;
const method = "PATCH";
export const ApiOrg004RequestUrl =
  "/uapresident/organizations/president/:id/retire";

const requestParam = z.object({
  id: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({
  endTerm: z.coerce.date().nullable().optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    OrganizationPresident: zOrganizationPresident,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z.object({
    status: z.literal("Error"),
    message: z.string(),
  }),
};

const apiOrg004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg004RequestParam = z.infer<typeof apiOrg004.requestParam>;
type ApiOrg004RequestQuery = z.infer<typeof apiOrg004.requestQuery>;
type ApiOrg004RequestBody = z.infer<typeof apiOrg004.requestBody>;
type ApiOrg004ResponseOk = z.infer<(typeof apiOrg004.responseBodyMap)[200]>;

export default apiOrg004;

export type {
  ApiOrg004RequestParam,
  ApiOrg004RequestQuery,
  ApiOrg004RequestBody,
  ApiOrg004ResponseOk,
};

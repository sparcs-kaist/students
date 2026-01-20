import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zOrganization } from "../type/organization.type";

/**
 * @version v0.1
 * @description 특정 semester, 특정 집단의 단체 목록을 불러옵니다.
 */

const url = () => `/organizations/getbytype`;
const method = "GET";
export const ApiOrg015RequestUrl = "/organizations/getbytype";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  semesterId: zId,
  organizationTypeEnum: z.coerce.number(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationLists: z.array(zOrganization),
  }),
};

const responseErrorMap = {};

const apiOrg015 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg015RequestParam = z.infer<typeof apiOrg015.requestParam>;
type ApiOrg015RequestQuery = z.infer<typeof apiOrg015.requestQuery>;
type ApiOrg015RequestBody = z.infer<typeof apiOrg015.requestBody>;
type ApiOrg015ResponseOK = z.infer<(typeof apiOrg015.responseBodyMap)[200]>;

export default apiOrg015;

export type {
  ApiOrg015RequestParam,
  ApiOrg015RequestQuery,
  ApiOrg015RequestBody,
  ApiOrg015ResponseOK,
};

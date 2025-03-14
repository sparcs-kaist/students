import { HttpStatusCode } from "axios";
import { z } from "zod";

import { REST_API_METHOD, registry } from "@sparcs-students/interface/open-api";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import {
  zOrganization,
  zOrganizationRequestCreate,
} from "../type/organization.type";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description 총학생회장 권한으로 새로운 단체를 생성합니다.
 */

const url = () => `/uapresident/organizations/organization`;
const method = "POST";
export const ApiOrg002RequestUrl = "/uapresident/organizations/organization";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  organization: zOrganizationRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    organization: zOrganization,
  }),
};

const responseErrorMap = {};

const apiOrg002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg002RequestParam = z.infer<typeof apiOrg002.requestParam>;
type ApiOrg002RequestQuery = z.infer<typeof apiOrg002.requestQuery>;
type ApiOrg002RequestBody = z.infer<typeof apiOrg002.requestBody>;
type ApiOrg002ResponseCreated = z.infer<
  (typeof apiOrg002.responseBodyMap)[201]
>;

export default apiOrg002;

export type {
  ApiOrg002RequestParam,
  ApiOrg002RequestQuery,
  ApiOrg002RequestBody,
  ApiOrg002ResponseCreated,
};

registry.registerPath({
  method: REST_API_METHOD[method],
  path: ApiOrg002RequestUrl,
  summary: "단체 생성",
  description: "총학생회장 권한으로 새로운 단체를 생성합니다.",
  tags: ["organization"],
  request: {
    params: apiOrg002.requestParam,
    query: apiOrg002.requestQuery,
    body: {
      content: {
        "application/json": {
          schema: apiOrg002.requestBody,
        },
      },
    },
  },
  responses: {
    200: {
      description: "성공",
      content: {
        "application/json": {
          schema: responseBodyMap[201],
        },
      },
    },
  },
});

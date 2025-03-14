import { HttpStatusCode } from "axios";
import { z } from "zod";

import { registry, REST_API_METHOD } from "@sparcs-students/interface/open-api";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { zOrganizationPresidentResponse } from "../type/organization.student.type";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description
 */

const url = () => `/organizations/organizationPresidents`;
const method = "GET";
export const ApiOrg003RequestUrl = "/organizations/organizationPresidents";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    organizationLists: z.array(zOrganizationPresidentResponse),
  }),
};

const responseErrorMap = {};

const apiOrg003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiOrg003RequestParam = z.infer<typeof apiOrg003.requestParam>;
type ApiOrg003RequestQuery = z.infer<typeof apiOrg003.requestQuery>;
type ApiOrg003RequestBody = z.infer<typeof apiOrg003.requestBody>;
type ApiOrg003ResponseOK = z.infer<(typeof apiOrg003.responseBodyMap)[200]>;

export default apiOrg003;

export type {
  ApiOrg003RequestParam,
  ApiOrg003RequestQuery,
  ApiOrg003RequestBody,
  ApiOrg003ResponseOK,
};

registry.registerPath({
  method: REST_API_METHOD[method],
  path: ApiOrg003RequestUrl,
  summary: "반기별 단체목록 조회",
  description: "조회 가이드에 사용되는 반기별 단체목록을 가져옵니다.",
  tags: ["organization"],
  request: {
    params: apiOrg003.requestParam,
    query: apiOrg003.requestQuery,
    body: {
      content: {
        "application/json": {
          schema: apiOrg003.requestBody,
        },
      },
    },
  },
  responses: {
    200: {
      description: "성공",
      content: {
        "application/json": {
          schema: responseBodyMap[200],
        },
      },
    },
  },
});

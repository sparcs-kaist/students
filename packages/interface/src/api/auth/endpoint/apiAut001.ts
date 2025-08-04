import { HttpStatusCode } from "axios";
import { z } from "zod";

import { registry, restMethod } from "@sparcs-students/interface/open-api";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description 로그인을 시도합니다
 */

const url = () => `/auth/sign-in`;
export const ApiAut001RequestUrl = "/auth/sign-in";
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  next: z.string().optional(),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    url: z.string(),
  }),
};

const responseErrorMap = {};

const apiAut001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut001RequestParam = z.infer<typeof apiAut001.requestParam>;
type ApiAut001RequestQuery = z.infer<typeof apiAut001.requestQuery>;
type ApiAut001RequestBody = z.infer<typeof apiAut001.requestBody>;
type ApiAut001ResponseOk = z.infer<(typeof apiAut001.responseBodyMap)[200]>;

export default apiAut001;

export type {
  ApiAut001RequestParam,
  ApiAut001RequestQuery,
  ApiAut001RequestBody,
  ApiAut001ResponseOk,
};

registry.registerPath({
  tags: ["Auth"],
  method: restMethod.method[method],
  path: ApiAut001RequestUrl,
  description: `
  # AUT-001

  로그인을 시도합니다.

  SPARCS SSO로 이동하여, 로그인을 진행합니다.
  `,
  summary: "AUT-001: 로그인을 시도합니다.",
  request: {
    params: requestParam,
    query: requestQuery,
    body: {
      content: {
        "application/json": {
          schema: requestBody,
        },
      },
    },
  },
  responses: {
    [restMethod.code[method]]: {
      description: "성공적으로 로그인을 시도했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[HttpStatusCode.Ok],
        },
      },
    },
  },
});

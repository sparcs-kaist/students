import { HttpStatusCode } from "axios";
import { z } from "zod";

import { registry, restMethod } from "@sparcs-students/interface/open-api";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description 로그아웃을 시도합니다.
 */

const url = () => `/auth/sign-out`;
export const ApiAut003RequestUrl = "/auth/sign-out";
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiAut003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut003RequestParam = z.infer<typeof apiAut003.requestParam>;
type ApiAut003RequestQuery = z.infer<typeof apiAut003.requestQuery>;
type ApiAut003RequestBody = z.infer<typeof apiAut003.requestBody>;
type ApiAut003ResponseOk = z.infer<(typeof apiAut003.responseBodyMap)[201]>;

export default apiAut003;

export type {
  ApiAut003RequestParam,
  ApiAut003RequestQuery,
  ApiAut003RequestBody,
  ApiAut003ResponseOk,
};

registry.registerPath({
  tags: ["Auth"],
  method: restMethod.method[method],
  path: ApiAut003RequestUrl,
  description: `
  # AUT-003

  로그아웃을 시도합니다.
  `,
  summary: "AUT-003: 로그아웃을 시도합니다.",
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
      description: "성공적으로 로그아웃 했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[HttpStatusCode.Created],
        },
      },
    },
  },
});

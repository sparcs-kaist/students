import { registry, restMethod } from "@sparcs-students/interface/open-api";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description 만료된 access token을 재발급 합니다
 */

const url = () => `/auth/refresh`;
export const ApiAut002RequestUrl = "/auth/refresh";
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    accessToken: z.coerce.string().optional(),
  }),
};

const responseErrorMap = {};

const apiAut002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut002RequestParam = z.infer<typeof apiAut002.requestParam>;
type ApiAut002RequestQuery = z.infer<typeof apiAut002.requestQuery>;
type ApiAut002RequestBody = z.infer<typeof apiAut002.requestBody>;
type ApiAut002ResponseCreated = z.infer<
  (typeof apiAut002.responseBodyMap)[201]
>;

export default apiAut002;

export type {
  ApiAut002RequestParam,
  ApiAut002RequestQuery,
  ApiAut002RequestBody,
  ApiAut002ResponseCreated,
};

registry.registerPath({
  tags: ["Auth"],
  method: restMethod.method[method],
  path: ApiAut002RequestUrl,
  description: `
  # AUT-002

  만료된 access token을 재발급 합니다.
  `,
  summary: "AUT-002: 만료된 access token을 재발급 합니다.",
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
      description: "성공적으로 만료된 access token을 재발급 했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[HttpStatusCode.Created],
        },
      },
    },
  },
});

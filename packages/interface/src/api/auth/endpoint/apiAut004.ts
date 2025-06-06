import { HttpStatusCode } from "axios";
import "zod-openapi/extend";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { registry, restMethod } from "@sparcs-students/interface/open-api";

/**
 * @version v0.1
 * @description SPARCS SSO 로그인 콜백을 처리합니다.
 */

const url = () => `/auth/sign-in/callback`;
export const ApiAut004RequestUrl = url();
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  state: z.string(),
  code: z.string(),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: z
    .object({
      message: z.string(),
    })
    .openapi({
      description:
        "kaist iam을 제외한 다른 방법으로 sparcs sso에 로그인 시도했을 경우 발생합니다.",
    }),
};

const apiAut004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut004RequestParam = z.infer<typeof apiAut004.requestParam>;
type ApiAut004RequestQuery = z.infer<typeof apiAut004.requestQuery>;
type ApiAut004RequestBody = z.infer<typeof apiAut004.requestBody>;
type ApiAut004ResponseOk = z.infer<(typeof apiAut004.responseBodyMap)[200]>;

export default apiAut004;

export type {
  ApiAut004RequestParam,
  ApiAut004RequestQuery,
  ApiAut004RequestBody,
  ApiAut004ResponseOk,
};

extendZodWithOpenApi(z);

registry.registerPath({
  tags: ["Auth"],
  method: restMethod.method[method],
  path: ApiAut004RequestUrl,
  description: `
  # AUT-004

  SPARCS SSO 로그인 콜백을 처리합니다.

  uid, sid 로 email을 upsert 처리 합니다.

  studentNumber로 userId를 upsert 처리 합니다.

  `,
  summary: "AUT-004: SPARCS SSO 로그인 콜백",
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
      description: "성공적으로 SPARCS SSO 로그인 콜백을 처리했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[HttpStatusCode.Ok],
        },
      },
    },
  },
});

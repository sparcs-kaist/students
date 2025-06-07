import {
  createErrorResponse,
  PaginationRequest,
  PaginationResponse,
} from "@sparcs-students/interface/common/api";
import { IApiObject } from "@sparcs-students/interface/type";
import { HttpStatusCode } from "axios";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { registry, restMethod } from "@sparcs-students/interface/open-api";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description 임시 기능의 동아리의 하위 기능의 상세정보를 가져옵니다
 */

const url = (id: string) => `/temporary/students/club/subfeature/${id}`;
const method = "GET";

// 만약 url param이 string이라면, 아래와 같이 url() 형태로 작성합니다.
export const ApiTmp000RequestUrl = url(":id");

// 만약 url param이 url() 형태로 작성할 수 없다면, 아래와 같이 문자열을 직접 작성합니다.
// export const ApiTmp000RequestUrl = "/temporary/students/club/subfeature/:id";

const requestParam = z.object({
  id: z.string(),
});

const requestQuery = PaginationRequest.extend({
  additional: z.string(),
});

const requestBody = z.object({
  name: z.string().max(20),
  age: z.number().int().positive().max(20),
});

const responseBodyMap = {
  // POST 이외 나머지
  [HttpStatusCode.Ok]: PaginationResponse.extend({
    name: z.string().max(20),
    age: z.number().int().min(20).max(30),
    // 중략 ㅎㅎ
  }),
  // POST
  [HttpStatusCode.Created]: PaginationResponse.extend({
    name: z.string().max(20),
    age: z.number().int().min(20).max(30),
    createdAt: z.date(),
    // 중략 ㅎㅎ
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: createErrorResponse(
    "Unauthorized",
    "You are not authorized to access this resource.",
  ),
  [HttpStatusCode.Forbidden]: createErrorResponse(
    "Forbidden",
    "You are not allowed to access this resource.",
  ),
};

export const apiTmp000: IApiObject<typeof url, typeof method> = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

registry.registerPath({
  tags: [], // 태그를 작성합니다. ex: tags: ["File"]
  method: restMethod.method[method],
  path: ApiTmp000RequestUrl,
  description: `
  # TMP-000

  MD 문법으로 설명 작성
  `,
  summary: "TMP-000: 임시 기능의 동아리의 하위 기능의 상세정보를 가져옵니다",
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
      description: "상태에 대한 설명",
      content: {
        "application/json": {
          schema: responseBodyMap[restMethod.code[method]],
        },
      },
    },
  },
});

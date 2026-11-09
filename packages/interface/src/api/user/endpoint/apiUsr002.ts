import { HttpStatusCode } from "axios";
import { z } from "zod";

import { registry, restMethod } from "@sparcs-students/interface/open-api";

/**
 * @version v0.1
 * @description 로그인한 사용자의 기본 정보와 소속 단체를 조회합니다.
 */

const url = () => `/users/me`;
const method = "GET";
export const ApiUsr002RequestUrl = "/users/me";

const requestParam = z.object({});
const requestQuery = z.object({});
const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    student: z.object({
      id: z.number(),
      studentNumber: z.number().nullable(),
      user: z.object({
        id: z.number(),
        sid: z.string().nullable(),
        uid: z.string().nullable(),
        email: z.string().email(),
        name: z.string(),
      }),
      department: z
        .object({
          id: z.number(),
          name: z.string(),
        })
        .nullable(),
    }),
    organizations: z.array(
      z.object({
        membershipId: z.number(),
        organizationId: z.number(),
        name: z.string(),
        nameEng: z.string(),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiUsr002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiUsr002RequestParam = z.infer<typeof apiUsr002.requestParam>;
type ApiUsr002RequestQuery = z.infer<typeof apiUsr002.requestQuery>;
type ApiUsr002RequestBody = z.infer<typeof apiUsr002.requestBody>;
type ApiUsr002ResponseOk = z.infer<(typeof apiUsr002.responseBodyMap)[200]>;

export default apiUsr002;

export type {
  ApiUsr002RequestParam,
  ApiUsr002RequestQuery,
  ApiUsr002RequestBody,
  ApiUsr002ResponseOk,
};

registry.registerPath({
  tags: ["User"],
  method: restMethod.method[method],
  path: ApiUsr002RequestUrl,
  description: `
  # USR-002

  로그인한 사용자의 이메일, 학번, 소속 단체를 조회합니다.
  `,
  summary: "USR-002: 내 정보 조회",
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
      description: "로그인한 사용자의 정보를 조회했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[HttpStatusCode.Ok],
        },
      },
    },
  },
});

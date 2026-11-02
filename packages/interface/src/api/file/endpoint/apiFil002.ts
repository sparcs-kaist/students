import { HttpStatusCode } from "axios";
import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { registry, restMethod } from "@sparcs-students/interface/open-api";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description S3 파일 조회를 위해 presigned url을 발급합니다.
 * - 파일의 고유 ID를 입력받아, 해당 파일을 다운로드하거나 조회할 수 있는 임시 URL을 반환합니다.
 */

const url = (id: number) => `/files/${id}`;
export const ApiFil002RequestUrl = "/files/{id}";
const method = "GET";

const requestParam = z.object({
  id: z.coerce.number().int().positive().openapi({
    description: "조회할 파일의 ID",
  }),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    url: z.string().openapi({
      description: "조회/다운로드할 파일의 S3 presigned url",
    }),
  }),
};

const responseErrorMap = {
  [HttpStatusCode.NotFound]: z
    .object({
      status: z.literal("Error"),
      message: z.string(),
    })
    .openapi({
      description: "존재하지 않는 파일 ID의 요청",
    }),
};

const apiFil002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFil002RequestParam = z.infer<typeof apiFil002.requestParam>;
type ApiFil002RequestQuery = z.infer<typeof apiFil002.requestQuery>;
type ApiFil002RequestBody = z.infer<typeof apiFil002.requestBody>;
type ApiFil002ResponseOk = z.infer<(typeof apiFil002.responseBodyMap)[200]>;

export default apiFil002;

export type {
  ApiFil002RequestParam,
  ApiFil002RequestQuery,
  ApiFil002RequestBody,
  ApiFil002ResponseOk,
};

registry.registerPath({
  tags: ["File"],
  method: restMethod.method[method],
  path: ApiFil002RequestUrl,
  description: `
  # FIL-002

  S3 파일 조회를 위해 presigned GET url을 발급합니다.

  - 파일의 고유 ID를 입력받아, 해당 파일을 다운로드하거나 조회할 수 있는 임시 URL을 반환합니다.
  `,
  summary: "FIL-002: 파일 조회를 위한 presigned GET url 발급",
  request: {
    params: requestParam,
    query: requestQuery,
  },
  responses: {
    [restMethod.code[method]]: {
      description: "성공적으로 파일 조회를 위한 presigned url을 발급했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[restMethod.code[method]],
        },
      },
    },
    404: {
      description: "파일을 찾을 수 없습니다.",
      content: {
        "application/json": {
          schema: responseErrorMap[404],
        },
      },
    },
  },
});

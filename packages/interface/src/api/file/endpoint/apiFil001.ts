import { HttpStatusCode } from "axios";
import { z } from "zod";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { registry, restMethod } from "@sparcs-students/interface/open-api";
import { zFile } from "../type/file.type";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description S3 업로드를 위해 presigned url을 발급합니다.
 * - 로그인되어 있어야 사용 가능합니다.
 * - 제출한 metadata 개수만큼의 URL과 filedId pair를 제공합니다.
 */

const url = () => `/files/upload`;
export const ApiFil001RequestUrl = url();
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  metadata: z.array(
    z.object({
      name: zFile.shape.name,
      size: zFile.shape.size,
      type: z.string().max(256).openapi({
        description: "aws s3 업로드 presigned url을 위한 MIME type",
      }),
    }),
  ),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    files: z.array(
      z.object({
        uploadUrl: z.string().openapi({
          description: "파일 업로드 URL",
        }),
        id: zFile.shape.id,
        name: zFile.shape.name,
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiFil001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFil001RequestParam = z.infer<typeof apiFil001.requestParam>;
type ApiFil001RequestQuery = z.infer<typeof apiFil001.requestQuery>;
type ApiFil001RequestBody = z.infer<typeof apiFil001.requestBody>;
type ApiFil001ResponseCreated = z.infer<
  (typeof apiFil001.responseBodyMap)[201]
>;

export default apiFil001;

export type {
  ApiFil001RequestParam,
  ApiFil001RequestQuery,
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
};

registry.registerPath({
  tags: ["File"],
  method: restMethod.method[method],
  path: ApiFil001RequestUrl,
  description: `
  # FIL-001

  S3 업로드를 위해 presigned url을 발급합니다.

  - 로그인되어 있어야 사용 가능합니다.
  - 제출한 metadata 개수만큼의 URL과 filedId pair를 제공합니다.

  `,
  summary: "FIL-001: S3 업로드를 위한 presigned url 발급",
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
      description:
        "성공적으로 S3 업로드를 위한 presigned url 발급을 처리했습니다.",
      content: {
        "application/json": {
          schema: responseBodyMap[restMethod.code[method]],
        },
      },
    },
  },
});

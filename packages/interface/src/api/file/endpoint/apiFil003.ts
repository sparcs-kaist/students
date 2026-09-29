import { HttpStatusCode } from "axios";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { registry, restMethod } from "@sparcs-students/interface/open-api";

extendZodWithOpenApi(z);

/**
 * @version v0.1
 * @description DB 및 S3에서 파일을 완전히 삭제합니다.
 * - 본인이 올린 파일만 삭제 가능합니다.
 */

const url = (id: number) => `/files/${id}`;
export const ApiFil003RequestUrl = "/files/{id}";
const method = "DELETE";

const requestParam = z.object({
  id: z.coerce.number().int().positive().openapi({
    description: "삭제할 파일의 ID",
    example: 1,
  }),
});

const requestQuery = z.object({});
const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z
    .object({
      status: z.literal("Success"),
      message: z.string(),
    })
    .openapi({
      description: "성공적으로 파일을 삭제했습니다.",
    }),
};

const responseErrorMap = {
  [HttpStatusCode.Forbidden]: z
    .object({
      status: z.literal("Error"),
      message: z.string(),
    })
    .openapi({
      description: "본인이 업로드한 파일이 아님",
    }),
  [HttpStatusCode.NotFound]: z
    .object({
      status: z.literal("Error"),
      message: z.string(),
    })
    .openapi({
      description: "존재하지 않는 파일 ID의 요청",
    }),
};

const apiFil003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFil003RequestParam = z.infer<typeof apiFil003.requestParam>;
type ApiFil003ResponseOk = z.infer<(typeof apiFil003.responseBodyMap)[200]>;

export default apiFil003;
export type { ApiFil003RequestParam, ApiFil003ResponseOk };

registry.registerPath({
  tags: ["File"],
  method: restMethod.method[method],
  path: ApiFil003RequestUrl,
  description: `
  # FIL-003
  DB 및 S3에서 파일을 완전히 삭제합니다.
  - 본인이 올린 파일만 삭제 가능합니다.
  `,
  summary: "FIL-003: 파일 삭제",
  request: { params: requestParam },
  responses: {
    [restMethod.code[method]]: {
      description: "파일 삭제 성공",
      content: {
        "application/json": {
          schema: responseBodyMap[restMethod.code[method]],
        },
      },
    },
    403: {
      description: "권한 없음",
      content: { "application/json": { schema: responseErrorMap[403] } },
    },
    404: {
      description: "파일을 찾을 수 없음",
      content: { "application/json": { schema: responseErrorMap[404] } },
    },
  },
});

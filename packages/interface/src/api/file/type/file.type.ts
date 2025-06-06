import { z } from "zod";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zFileName } from "@sparcs-students/interface/common/stringLength";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const zFile = z
  .object({
    id: zId.openapi({
      description: "파일 ID",
    }),
    name: zFileName.openapi({
      description: "파일 이름",
    }),
    extension: z.string().max(30).openapi({
      description: "파일 확장자",
    }),
    size: z.coerce.number().openapi({
      description: "파일 크기",
    }),
    url: z.string().openapi({
      description: "파일 Presigned URL",
    }),
    userId: zId.openapi({
      description: "파일 소유자 ID",
    }),
  })
  .openapi("File");

export type IFile = z.infer<typeof zFile>;

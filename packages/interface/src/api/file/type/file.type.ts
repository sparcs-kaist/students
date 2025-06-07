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
    signedAt: z.date().openapi({
      description: "파일 업로드 시간",
    }),
    userId: zId.openapi({
      description: "파일 소유자 ID",
    }),
  })
  .openapi("File");

export const zrFile = z
  .object({
    id: zFile.shape.id,
    name: zFile.shape.name,
    extension: zFile.shape.extension,
    size: zFile.shape.size,
    url: z.string().openapi({
      description: "파일 Presigned URL",
    }),
  })
  .openapi("File");

export type IFile = z.infer<typeof zFile>;
export type IRFile = z.infer<typeof zrFile>;

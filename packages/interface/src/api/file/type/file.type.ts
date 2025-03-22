import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";

export const zFile = z.object({
  id: zId,
  name: z.string().max(255),
  extension: z.string().max(30),
  size: z.coerce.number(),
  url: z.string(),
  userId: zId, // 엔티티적으로 그렇게 중요한 정보가 아니어서 그냥 id만 적음
});

export type IFile = z.infer<typeof zFile>;

import { z } from "zod";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zFileName } from "@sparcs-students/interface/common/stringLength";

export const zFile = z.object({
  id: zId,
  name: zFileName,
  extension: z.string().max(30),
  size: z.coerce.number(),
  url: z.string(),
  userId: zId,
});

export type IFile = z.infer<typeof zFile>;

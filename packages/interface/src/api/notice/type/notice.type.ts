import { z } from "zod";
import { zId } from "@sparcs-students/interface/common/type/ids";

export const zNotice = z.object({
  id: zId,
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const zNoticeRequestCreate = zNotice.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const zNoticeRequestUpdate = zNoticeRequestCreate;

export type INotice = z.infer<typeof zNotice>;
export type INoticeRequestCreate = z.infer<typeof zNoticeRequestCreate>;
export type INoticeRequestUpdate = z.infer<typeof zNoticeRequestUpdate>;

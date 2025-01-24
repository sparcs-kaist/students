import { zUserName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";

export const zUser = z.object({
  id: zId,
  // sid: z.string().max(100),
  email: z.string().email(),
  name: zUserName,
});

export type IUser = z.infer<typeof zUser>;

export const zStudent = z.object({
  id: zId,
  studentNumber: z.string().max(20),
  user: zUser,
  // department: zDepartment,
});

export type IStudent = z.infer<typeof zStudent>;

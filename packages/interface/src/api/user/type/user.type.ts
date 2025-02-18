import { zUserName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";

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

export const zMember = z.object({
  // 로그인 토큰 발급을 위한 Member.
  id: zId,
  organization: zOrganization,
  user: zUser,
  studentNumber: zStudent.shape.studentNumber,
  name: zStudent.shape.user.shape.name,
  duration: zDuration,
  // department: zDepartment,
});

import { z } from "zod";

import { zUserName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";

export const zDepartment = z.object({
  id: zId,
  name: z.string().max(100),
});

export type IDepartment = z.infer<typeof zDepartment>;

export const zUser = z.object({
  id: zId,
  sid: z.string().max(100),
  uid: z.string().max(100),
  email: z.string().email(),
  name: zUserName,
});

export type IUser = z.infer<typeof zUser>;

export const zStudent = z.object({
  id: zId,
  studentNumber: z.number(),
  user: zUser,
  department: zDepartment,
});

export type IStudent = z.infer<typeof zStudent>;

export const zMember = z.object({
  // 로그인 토큰 발급을 위한 Member.
  id: zId,
  organization: zOrganization.pick({ id: true }).optional(),
  user: zUser.pick({ id: true }),
  studentNumber: zStudent.shape.studentNumber.optional(),
  name: zStudent.shape.user.shape.name,
  email: zStudent.shape.user.shape.email,
  sid: zStudent.shape.user.shape.sid,
  uid: zStudent.shape.user.shape.uid,
  duration: zDuration.optional(),
  department: zDepartment.pick({ id: true }).optional(),
});

export type IMember = z.infer<typeof zMember>;

import {
  OrganizationPresidentTypeE,
  OrganizationStateE,
  OrganizationTypeE,
} from "@sparcs-students/interface/common/enum";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zPhoneNumber } from "@sparcs-students/interface/common/type/phoneNumber.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { z } from "zod";
import {
  zName,
  zNameEng,
} from "@sparcs-students/interface/common/stringLength";

export const zOrganization = z.object({
  id: z.string(),
  name: z.string(),
  nameEng: z.string(),
  organizationTypeEnum: z.nativeEnum(OrganizationTypeE),
  foundingYear: z.coerce.number(),
  duration: zDuration,
  organizationStateEnum: z.nativeEnum(OrganizationStateE),
  email: z.string().email(),
});

export type IOrganization = z.infer<typeof zOrganization>;

export const zOrganizationPresident = z.object({
  id: zId,
  organizationId: zOrganization.shape.id,
  organizationPresidentTypeEnum: z.nativeEnum(OrganizationPresidentTypeE), // 정, 부
  title: z.string().max(100), // 회장, 위원장, ... 학부총학생회 산하 선거조작조사특임위원회 위원장이면 좀 길어서 100자 제한
  studentId: zStudent.shape.id, // Student.id
  phoneNumber: zPhoneNumber,
  duration: zDuration,
});

export type IOrganizationPresident = z.infer<typeof zOrganizationPresident>;

export const zOrganizationMember = z.object({
  // 기본적인 기구에 포함된 기록. 직책 등은 Team으로 구분.
  id: zId,
  organizationId: zOrganization.shape.id,
  studentId: zStudent.shape.id, // Student.id
  duration: zDuration,
});

export type IOrganizationMember = z.infer<typeof zOrganizationMember>;

export const zOperatingCommittee = z.object({
  id: zId,
  organizationId: zOrganization.shape.id,
  name: zName,
  nameEng: zNameEng,
  duration: zDuration,
});

export type IOperatingCommittee = z.infer<typeof zOperatingCommittee>;

export const zOperatingCommitteeMember = z.object({
  id: zId,
  operatingCommitteeId: zOperatingCommittee.shape.id,
  studentId: zStudent.shape.id, // Student.id
  title: zName,
  duration: zDuration,
});

export type IOperatingCommitteeMember = z.infer<
  typeof zOperatingCommitteeMember
>;

export const zOrganizationManager = z.object({
  id: zId,
  organizationId: zOrganization.shape.id,
  studentId: zStudent.shape.id, // Student.id
  duration: zDuration,
});

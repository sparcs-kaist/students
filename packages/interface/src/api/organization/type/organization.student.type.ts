import { OrganizationPresidentTypeE } from "@sparcs-students/interface/common/enum";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zPhoneNumber } from "@sparcs-students/interface/common/type/phoneNumber.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";
import { zOperatingCommittee, zOrganization, zTeam } from "./organization.type";

// OrganizationPresident: 기구장 엔티티
export const zOrganizationPresident = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  organizationPresidentTypeEnum: z.nativeEnum(OrganizationPresidentTypeE), // 정, 부
  title: z.string().max(100), // 회장, 위원장, ... 학부총학생회 산하 선거조작조사특임위원회 위원장이면 좀 길어서 100자 제한
  student: zStudent.pick({ id: true }), // Student.id
  phoneNumber: zPhoneNumber,
  duration: zDuration,
});

export type IOrganizationPresident = z.infer<typeof zOrganizationPresident>;

// OrganizationMember: 기구원 엔티티
export const zOrganizationMember = z.object({
  // 기본적인 기구에 포함된 기록. 직책 등은 Team으로 구분.
  id: zId,
  organization: zOrganization.pick({ id: true }),
  student: zStudent.pick({ id: true }), // Student.id
  duration: zDuration,
});

export type IOrganizationMember = z.infer<typeof zOrganizationMember>;

// OrganizationManager: 기구 담당자 엔티티
export const zOrganizationManager = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  student: zStudent.pick({ id: true }), // Student.id
  duration: zDuration,
});

export type IOrganizationManager = z.infer<typeof zOrganizationManager>;

// OperatingCommitteeMember: 운영위원 엔티티
export const zOperatingCommitteeMember = z.object({
  id: zId,
  operatingCommittee: zOperatingCommittee.pick({ id: true }),
  student: zStudent.pick({ id: true }), // Student.id
  title: zName,
  duration: zDuration,
});

export type IOperatingCommitteeMember = z.infer<
  typeof zOperatingCommitteeMember
>;

export const zTeamMember = z.object({
  id: zId,
  team: zTeam.pick({ id: true }),
  student: zStudent.pick({ id: true }),
  duration: zDuration,
});

export type ITeamMember = z.infer<typeof zTeamMember>;

export const zTeamLeader = z.object({
  id: zId,
  team: zTeam.pick({ id: true }),
  studentId: zId,
  duration: zDuration,
});

export type ITeamLeader = z.infer<typeof zTeamLeader>;

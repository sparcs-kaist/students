import { OrganizationPresidentTypeEnum } from "@sparcs-students/interface/common/enum";
import { zId } from "@sparcs-students/interface/common/type/ids";
import {
  zDuration,
  zDurationCreate,
} from "@sparcs-students/interface/common/type/time.type";
import { zPhoneNumber } from "@sparcs-students/interface/common/type/phoneNumber.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";
import { zOperatingCommittee, zOrganization, zTeam } from "./organization.type";

// OrganizationPresident: 기구장 엔티티
export const zOrganizationPresident = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  organizationPresidentTypeEnum: z.nativeEnum(OrganizationPresidentTypeEnum), // 정, 부
  title: z.string().max(100), // 회장, 위원장, ... 학부총학생회 산하 선거조작조사특임위원회 위원장이면 좀 길어서 100자 제한
  student: zStudent.pick({ id: true }), // Student.id
  phoneNumber: zPhoneNumber,
  duration: zDuration,
});

export const zOrganizationPresidentRequestCreate = zOrganizationPresident
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zOrganizationPresidentResponse = zOrganizationPresident.extend({
  organization: zOrganization,
  student: zStudent,
});

export type IOrganizationPresident = z.infer<typeof zOrganizationPresident>;
export type IOrganizationPresidentRequestCreate = z.infer<
  typeof zOrganizationPresidentRequestCreate
>;
export type IOrganizationPresidentResponse = z.infer<
  typeof zOrganizationPresidentResponse
>;

// OrganizationMember: 기구원 엔티티
export const zOrganizationMember = z.object({
  // 기본적인 기구에 포함된 기록. 직책 등은 Team으로 구분.
  id: zId,
  organization: zOrganization.pick({ id: true }),
  student: zStudent.pick({ id: true }), // Student.id
  duration: zDuration,
});

export const zOrganizationMemberRequestCreate = zOrganizationMember
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zOrganizationMemberResponse = zOrganizationMember.extend({
  organization: zOrganization,
  student: zStudent,
});

export type IOrganizationMember = z.infer<typeof zOrganizationMember>;
export type IOrganizationMemberRequestCreate = z.infer<
  typeof zOrganizationMemberRequestCreate
>;
export type IOrganizationMemberResponse = z.infer<
  typeof zOrganizationMemberResponse
>;

// OrganizationManager: 기구 담당자 엔티티
export const zOrganizationManager = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  student: zStudent.pick({ id: true }), // Student.id
  duration: zDuration,
});

export const zOrganizationManagerRequestCreate = zOrganizationManager
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zOrganizationManagerResponse = zOrganizationManager.extend({
  organization: zOrganization,
  student: zStudent,
});

export type IOrganizationManager = z.infer<typeof zOrganizationManager>;
export type IOrganizationManagerRequestCreate = z.infer<
  typeof zOrganizationManagerRequestCreate
>;
export type IOrganizationManagerResponse = z.infer<
  typeof zOrganizationManagerResponse
>;

// OperatingCommitteeMember: 운영위원 엔티티
export const zOperatingCommitteeMember = z.object({
  id: zId,
  operatingCommittee: zOperatingCommittee.pick({ id: true }),
  student: zStudent.pick({ id: true }), // Student.id
  title: zName,
  legalBasis: z.string().max(255),
  duration: zDuration,
});

export const zOperatingCommitteeMemberRequestCreate = zOperatingCommitteeMember
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zOperatingCommitteeMemberResponse =
  zOperatingCommitteeMember.extend({
    operatingCommittee: zOperatingCommittee,
    student: zStudent,
  });

export type IOperatingCommitteeMember = z.infer<
  typeof zOperatingCommitteeMember
>;
export type IOperatingCommitteeMemberRequestCreate = z.infer<
  typeof zOperatingCommitteeMemberRequestCreate
>;
export type IOperatingCommitteeMemberResponse = z.infer<
  typeof zOperatingCommitteeMemberResponse
>;

export const zTeamMember = z.object({
  id: zId,
  team: zTeam.pick({ id: true }),
  student: zStudent.pick({ id: true }),
  duration: zDuration,
});

export const zTeamMemberRequestCreate = zTeamMember
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zTeamMemberResponse = zTeamMember.extend({
  team: zTeam,
  student: zStudent,
});

export type ITeamMember = z.infer<typeof zTeamMember>;
export type ITeamMemberRequestCreate = z.infer<typeof zTeamMemberRequestCreate>;
export type ITeamMemberResponse = z.infer<typeof zTeamMemberResponse>;

export const zTeamLeader = z.object({
  id: zId,
  team: zTeam.pick({ id: true }),
  student: zStudent.pick({ id: true }),
  title: zName,
  duration: zDuration,
});

export const zTeamLeaderRequestCreate = zTeamLeader
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zTeamLeaderResponse = zTeamLeader.extend({
  team: zTeam,
  student: zStudent,
});

export type ITeamLeader = z.infer<typeof zTeamLeader>;
export type ITeamLeaderRequestCreate = z.infer<typeof zTeamLeaderRequestCreate>;
export type ITeamLeaderResponse = z.infer<typeof zTeamLeaderResponse>;

// OrganizationMemberApplication: 기구원 신청 엔티티
export const zOrganizationMemberApplication = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  student: zStudent.pick({ id: true }), // Student.id
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]), // 신청 상태
  createdAt: z.string(), // 신청 생성 시간
  updatedAt: z.string(), // 신청 업데이트 시간 -> 이거 필요한 가..? 수정이 되여..?
});

export const zOrganizationMemberApplicationRequestCreate =
  zOrganizationMemberApplication.omit({
    id: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    // 신청을 취소하는 기능이 추가될까요? 그럼 앞에서 했던 것처럼 deletedAt으로 삭제가 아니라 취소 기록을 남겨야 할까여여?
  });

export const zOrganizationMemberApplicationResponse =
  zOrganizationMemberApplication;

export type IOrganizationMemberApplication = z.infer<
  typeof zOrganizationMemberApplication
>;
export type IOrganizationMemberApplicationRequestCreate = z.infer<
  typeof zOrganizationMemberApplicationRequestCreate
>;
export type IOrganizationMemberApplicationResponse = z.infer<
  typeof zOrganizationMemberApplicationResponse
>;

// OrganizationApplicationRequest: 조직 가입 신청 요청
export const zOrganizationApplicationRequest = z.object({
  organizationId: zId,
  studentId: zId, // 필요한가?
});

export const zOrganizationApplicationResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

export type IOrganizationApplicationRequest = z.infer<
  typeof zOrganizationApplicationRequest
>;
export type IOrganizationApplicationResponse = z.infer<
  typeof zOrganizationApplicationResponse
>;

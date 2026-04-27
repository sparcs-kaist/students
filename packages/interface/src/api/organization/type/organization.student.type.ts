import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { OrganizationPresidentTypeEnum } from "@sparcs-students/interface/common/enum";
import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zPhoneNumber } from "@sparcs-students/interface/common/type/phoneNumber.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { z } from "zod";
import { zName } from "@sparcs-students/interface/common/stringLength";
import { zOperatingCommittee, zOrganization, zTeam } from "./organization.type";

extendZodWithOpenApi(z);

// OrganizationPresident: 기구장 엔티티
export const zOrganizationPresident = z
  .object({
    id: zId,
    organization: zExtractId(zOrganization).openapi({
      description: "기구장이 속한 기구",
    }),
    organizationPresidentTypeEnum: z
      .nativeEnum(OrganizationPresidentTypeEnum)
      .openapi({
        description: "기구장의 직책",
        examples: [
          OrganizationPresidentTypeEnum.Chief,
          OrganizationPresidentTypeEnum.Vice,
        ],
      }),
    title: z
      .string()
      .max(100)
      .openapi({
        description: "기구장의 직책",
        examples: ["회장", "위원장", "국장", "단장"],
      }),
    student: zExtractId(zStudent).openapi({
      description: "기구장의 학생 정보",
    }),
    phoneNumber: zPhoneNumber.openapi({
      description: "기구장의 전화번호",
    }),
    duration: zDuration,
  })
  .openapi("OrganizationPresident");

export type IOrganizationPresident = z.infer<typeof zOrganizationPresident>;

// OrganizationMember: 기구원 엔티티
export const zOrganizationMember = z
  .object({
    // 기본적인 기구에 포함된 기록. 직책 등은 Team으로 구분.
    id: zId.openapi({
      description: "기구원 ID",
    }),
    organization: zExtractId(zOrganization).openapi({
      description: "기구원이 속한 기구",
    }),
    student: zExtractId(zStudent).openapi({
      description: "기구원의 학생 정보",
    }),
    duration: zDuration.openapi({
      description: "기구원이 등록된 기간으로, endTerm이 null이면 현활",
    }),
  })
  .openapi("OrganizationMember");

export type IOrganizationMember = z.infer<typeof zOrganizationMember>;

// OrganizationManager: 기구 담당자 엔티티
export const zOrganizationManager = z
  .object({
    id: zId.openapi({
      description: "기구 담당자 ID",
    }),
    organization: zExtractId(zOrganization).openapi({
      description: "기구 담당자가 속한 기구",
    }),
    student: zExtractId(zStudent).openapi({
      description: "기구 담당자의 학생 정보",
    }),
    duration: zDuration.openapi({
      description: "기구 담당자가 등록된 기간으로, endTerm이 null이면 현활",
    }),
  })
  .openapi("OrganizationManager");

export type IOrganizationManager = z.infer<typeof zOrganizationManager>;

// OperatingCommitteeMember: 운영위원 엔티티
export const zOperatingCommitteeMember = z
  .object({
    id: zId,
    operatingCommittee: zExtractId(zOperatingCommittee),
    student: zExtractId(zStudent), // Student.id
    title: zName,
    legalBasis: z.string().max(255),
    duration: zDuration,
  })
  .openapi("OperatingCommitteeMember");

export type IOperatingCommitteeMember = z.infer<
  typeof zOperatingCommitteeMember
>;

export const zTeamMember = z.object({
  id: zId,
  team: zExtractId(zTeam),
  student: zExtractId(zStudent),
  duration: zDuration,
});

export const zTeamMemberRequestCreate = zTeamMember.omit({
  id: true,
});

export const zTeamMemberResponse = zTeamMember.pick({
  id: true,
});

export type ITeamMember = z.infer<typeof zTeamMember>;
export type ITeamMemberRequestCreate = z.infer<typeof zTeamMemberRequestCreate>;
export type ITeamMemberResponse = z.infer<typeof zTeamMemberResponse>;

export const zTeamLeader = z.object({
  id: zId,
  team: zExtractId(zTeam),
  student: zExtractId(zStudent),
  // title: zName,
  duration: zDuration,
});

export const zTeamLeaderRequestCreate = zTeamLeader.omit({
  id: true,
});

export const zTeamLeaderResponse = zTeamLeader.pick({
  id: true,
});
export type ITeamLeader = z.infer<typeof zTeamLeader>;
export type ITeamLeaderRequestCreate = z.infer<typeof zTeamLeaderRequestCreate>;
export type ITeamLeaderResponse = z.infer<typeof zTeamLeaderResponse>;

// Staff: 집행위원 엔티티
export const zStaff = z
  .object({
    id: zId.openapi({
      description: "집행위원 ID",
    }),
    student: zExtractId(zStudent).openapi({
      description: "집행위원의 학생 정보",
    }),
    duration: zDuration.openapi({
      description: "집행 위원이 등록된 기간으로, endTerm이 null이면 현활",
    }),
  })
  .openapi("Staff");

export const zStaffRequestCreate = zStaff.omit({ id: true });

export type IStaff = z.infer<typeof zStaff>;
export type IStaffRequestCreate = z.infer<typeof zStaffRequestCreate>;

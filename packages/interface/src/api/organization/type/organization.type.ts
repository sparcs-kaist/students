import {
  OrganizationStateEnum,
  OrganizationTypeEnum,
} from "@sparcs-students/interface/common/enum";
import { zId } from "@sparcs-students/interface/common/type/ids";
import {
  zDuration,
  zDurationCreate,
} from "@sparcs-students/interface/common/type/time.type";
import { z } from "zod";
import {
  zName,
  zNameEng,
} from "@sparcs-students/interface/common/stringLength";

// Organization: 기구 엔티티
export const zOrganization = z.object({
  id: zId,
  name: zName,
  nameEng: zNameEng,
  organizationTypeEnum: z.nativeEnum(OrganizationTypeEnum),
  foundingYear: z.coerce.number(),
  duration: zDuration,
  organizationStateEnum: z.nativeEnum(OrganizationStateEnum), // 정규 or 비대위
});

export const zOrganizationRequestCreate = zOrganization
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export type IOrganization = z.infer<typeof zOrganization>;
export type IOrganizationRequestCreate = z.infer<
  typeof zOrganizationRequestCreate
>;

// OperatingCommittee: 운영위원회 엔티티
export const zOperatingCommittee = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  name: zName,
  nameEng: zNameEng,
  duration: zDuration,
});

export const zOperatingCommitteeResponse = zOperatingCommittee.extend({
  organization: zOrganization,
});

export const zOperatingCommitteeRequestCreate = zOperatingCommittee
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zOperatingCommitteRequestUpdate = zOperatingCommittee.pick({
  id: true,
  name: true,
  nameEng: true,
  duration: true,
});

export type IOperatingCommittee = z.infer<typeof zOperatingCommittee>;
export type IOperatingCommitteeResponse = z.infer<
  typeof zOperatingCommitteeResponse
>;
export type IOperatingCommitteeRequestCreate = z.infer<
  typeof zOperatingCommitteeRequestCreate
>;
export type IOperatingCommitteeRequestUpdate = z.infer<
  typeof zOperatingCommitteRequestUpdate
>;

// Team: 팀 엔티티
export const zTeam = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  name: zName,
  duration: zDuration,
});

export const zTeamRequestCreate = zTeam
  .omit({
    id: true,
    duration: true,
  })
  .extend({ duration: zDurationCreate });

export const zTeamResponse = zTeam.extend({
  organization: zOrganization,
});

export type ITeam = z.infer<typeof zTeam>;
export type ITeamResponse = z.infer<typeof zTeamResponse>;
export type ITeamRequestCreate = z.infer<typeof zTeamRequestCreate>;

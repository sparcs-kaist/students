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
  id: z.string(),
  name: z.string(),
  nameEng: z.string(),
  organizationTypeEnum: z.nativeEnum(OrganizationTypeEnum),
  foundingYear: z.coerce.number(),
  duration: zDuration,
  organizationStateEnum: z.nativeEnum(OrganizationStateEnum), // 정규 or 비대위
});

export type IOrganization = z.infer<typeof zOrganization>;

export const zOrganizationCreate = zOrganization
  .omit({
    id: true,
    duration: true,
  })
  .merge(zDurationCreate);

export const zOrganizationSummary = zOrganization.pick({
  id: true,
  name: true,
  nameEng: true,
  organizationTypeEnum: true,
  organizationStateEnum: true,
});

// OperatingCommittee: 운영위원회 엔티티
export const zOperatingCommittee = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  name: zName,
  nameEng: zNameEng,
  duration: zDuration,
});

export type IOperatingCommittee = z.infer<typeof zOperatingCommittee>;

// Team: 팀 엔티티
export const zTeam = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  name: zName,
  duration: zDuration,
});

export type ITeam = z.infer<typeof zTeam>;

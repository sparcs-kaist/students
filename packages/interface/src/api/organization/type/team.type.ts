import { zName } from "@sparcs-students/interface/common/stringLength";
import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";

import { zOrganization } from "./organization.type";

export const zTeam = z.object({
  id: zId,
  organizationId: zOrganization.shape.id,
  name: zName,
  duration: zDuration,
});

export type ITeam = z.infer<typeof zTeam>;

export const zTeamMember = z.object({
  id: zId,
  teamId: zTeam.shape.id,
  studentId: zId,
  duration: zDuration,
});

export type ITeamMember = z.infer<typeof zTeamMember>;

export const zTeamLeader = z.object({
  id: zId,
  teamId: zTeam.shape.id,
  studentId: zId,
  duration: zDuration,
});

export type ITeamLeader = z.infer<typeof zTeamLeader>;

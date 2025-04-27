import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import {
  zOrganization,
  zTeam,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { DocumentItemStatusEnum } from "@sparcs-students/interface/common/enum";
import {
  zDateTime,
  zDuration,
} from "@sparcs-students/interface/common/type/time.type";
import { zDocumentItemName } from "@sparcs-students/interface/common/stringLength";

// ProjectProposal: 사업계획서 각 행 엔티티
export const zProjectProposal = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  halfYear: zHalfYear.pick({ id: true }),
  //   projectProposalStatusEnum: z.nativeEnum(ProjectProposalStatusEnum),
  DocumentItemStatusEnum: z.nativeEnum(DocumentItemStatusEnum),
  name: zDocumentItemName,
  method: z.string(),
  prepareDuration: zDuration.nullable(),
  duration: zDuration.nullable(), // null: 반기 단위 상시 사업
  team: zTeam.pick({ id: true }),
  leader: zStudent.pick({ id: true }).nullable(),
  purpose: z.string(),
  target: z.string(),
  detail: z.string(),
  submittedAt: zDateTime.nullable(),
});

export type IProjectProposal = z.infer<typeof zProjectProposal>;

// ProjectProposalTimeline: 사업계획서 타임라인 엔티티
export const zProjectProposalTimeline = z.object({
  id: zId,
  projectProposal: zProjectProposal.pick({ id: true }),
  name: z.string().max(255),
  duration: zDuration,
  detail: z.string(),
  note: z.string().optional(),
});

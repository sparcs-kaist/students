import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import {
  zOrganization,
  zTeam,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { zDuration } from "@sparcs-students/interface/common/type/time.type";
import { zDocumentItemName } from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

// ProjectProposal: 사업계획서 각 행 엔티티
export const zProjectProposal = z
  .object({
    id: zId,
    organization: zExtractId(zOrganization),
    halfYear: zExtractId(zHalfYear),
    name: zDocumentItemName,
    method: z.string(),
    prepareDuration: zDuration.optional(),
    duration: zDuration.optional(), // null: 반기 단위 상시 사업
    timelines: z.array(
      z.object({
        name: z.string().max(255),
        duration: zDuration,
        detail: z.string(),
        note: z.string().optional(),
      }),
    ),
    team: zExtractId(zTeam),
    leader: zExtractId(zStudent).nullable(),
    purpose: z.string(),
    target: z.string(),
    detail: z.string(),
  })
  .merge(zRevisionBase);

export type IProjectProposal = z.infer<typeof zProjectProposal>;

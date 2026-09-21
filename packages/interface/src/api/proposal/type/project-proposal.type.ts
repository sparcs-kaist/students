import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import {
  zExtractCode,
  zCode,
} from "@sparcs-students/interface/common/type/codes";
import { z } from "zod";
import {
  zOrganization,
  zTeam,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { zDocumentItemName } from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

// ProjectProposal: 사업계획서 각 행 엔티티
export const zProjectProposal = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export const zProjectProposalRequestCreate = zProjectProposal.omit({
  id: true,
});

export type IProjectProposal = z.infer<typeof zProjectProposal>;
export type IProjectProposalRequestCreate = z.infer<
  typeof zProjectProposalRequestCreate
>;

export const zProjectProposalRevision = z
  .object({
    id: zId,
    projectProposal: zExtractId(zProjectProposal),
    name: zDocumentItemName,
    method: z.string(),
    prepareStartTerm: z.coerce.date(),
    prepareEndTerm: z.coerce.date(),
    startTerm: z.coerce.date(),
    endTerm: z.coerce.date(),
    team: zExtractId(zTeam),
    manager: zExtractId(zStudent),
    purpose: z.string(),
    target: z.string(),
    detail: z.string(),
    note: z.string(),
    code: zCode,
  })
  .merge(zRevisionBase);

export const zProjectProposalRevisionRequestCreate =
  zProjectProposalRevision.omit({
    id: true,
  });

export const zProjectProposalRevisionRequestUpdate = z
  .object({ id: zId })
  .merge(
    zProjectProposalRevision
      .omit({
        id: true,
        projectProposal: true,
        code: true,
      })
      .partial(),
  );

export const zProjectProposalRevisionResponse = zProjectProposalRevision.pick({
  id: true,
});

export type IProjectProposalRevision = z.infer<typeof zProjectProposalRevision>;
export type IProjectProposalRevisionRequestCreate = z.infer<
  typeof zProjectProposalRevisionRequestCreate
>;
export type IProjectProposalRevisionRequestUpdate = z.infer<
  typeof zProjectProposalRevisionRequestUpdate
>;
export type IProjectProposalRevisionResponse = z.infer<
  typeof zProjectProposalRevisionResponse
>;

export const zProjectProposalTimeline = z.object({
  id: zId,
  projectProposalRevision: zExtractCode(zProjectProposalRevision),
  startTerm: z.coerce.date(),
  endTerm: z.coerce.date(),
  detail: z.string(),
  note: z.string(),
});

export const zProjectProposalTimelineRequestCreate =
  zProjectProposalTimeline.omit({
    id: true,
  });

export const zProjectProposalTimelineRequestUpdate = z
  .object({ id: zId })
  .merge(
    zProjectProposalTimeline
      .omit({
        id: true,
        projectProposalRevision: true,
      })
      .partial(),
  );

export const zProjectProposalTimelineResponse = zProjectProposalTimeline.pick({
  id: true,
});

export type IProjectProposalTimeline = z.infer<typeof zProjectProposalTimeline>;
export type IProjectProposalTimelineRequestCreate = z.infer<
  typeof zProjectProposalTimelineRequestCreate
>;
export type IProjectProposalTimelineRequestUpdate = z.infer<
  typeof zProjectProposalTimelineRequestUpdate
>;
export type IProjectProposalTimelineResponse = z.infer<
  typeof zProjectProposalTimelineResponse
>;

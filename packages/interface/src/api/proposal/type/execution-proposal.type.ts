import z from "zod";
import { zId, zExtractId } from "@sparcs-students/interface/common/type/ids";
import {
  zOperatingCommittee,
  zTeam,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

export const zExecutionProposal = z.object({
  id: zId,
  operatingComittee: zExtractId(zOperatingCommittee),
  note: z.string(),
});

export type IExecutionProposal = z.infer<typeof zExecutionProposal>;

export const zExecutionProposalRevision = z
  .object({
    id: zId,
    executionProposal: zExtractId(zExecutionProposal),
    team: zExtractId(zTeam),
    description: z.string(),
  })
  .merge(zRevisionBase);

export type IExecutionProposalRevision = z.infer<
  typeof zExecutionProposalRevision
>;

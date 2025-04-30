import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import {
  zOperatingCommittee,
  zOrganization,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import { z } from "zod";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

export const zOperatingCommitteeProposal = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  operatingCommittee: zExtractId(zOperatingCommittee), // TODO: 운위 ㅏㄷㄴ위인지 기구 단위인지에 따라 확정 후 이 주석 삭제
  halfYear: zExtractId(zHalfYear),
});

export type IOperatingCommitteeProposal = z.infer<
  typeof zOperatingCommitteeProposal
>;

export const zOperatingCommitteeProposalRevision = z
  .object({
    id: zId,
    operatingCommitteeProposal: zExtractId(zOperatingCommitteeProposal),
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IOperatingCommitteeProposalRevision = z.infer<
  typeof zOperatingCommitteeProposalRevision
>;

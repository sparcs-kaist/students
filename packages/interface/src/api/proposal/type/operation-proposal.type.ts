import z from "zod";
import { zId, zExtractId } from "@sparcs-students/interface/common/type/ids";
import { zFile } from "@sparcs-students/interface/api/file/type/file.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

export const zOperationProposal = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  halfYear: zExtractId(zHalfYear),
});

export type IOperationProposal = z.infer<typeof zOperationProposal>;

export const zOperationProposalRevision = z
  .object({
    id: zId,
    operationProposal: zExtractId(zOperationProposal),
    organizationDiagramFile: zExtractId(zFile),
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IOperationProposalRevision = z.infer<
  typeof zOperationProposalRevision
>;

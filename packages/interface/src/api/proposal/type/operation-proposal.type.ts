import z from "zod";
import { zId, zExtractId } from "@sparcs-students/interface/common/type/ids";
import { zFile } from "@sparcs-students/interface/api/file/type/file.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

export const zOperationProposal = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export const zOperationProposalRequestCreate = zOperationProposal.omit({
  id: true,
});

export type IOperationProposal = z.infer<typeof zOperationProposal>;
export type IOperationProposalRequestCreate = z.infer<
  typeof zOperationProposalRequestCreate
>;

export const zOperationProposalRevision = z
  .object({
    id: zId,
    operationProposal: zExtractId(zOperationProposal),
    organizationDiagram: zExtractId(zFile).openapi({
      description: "조직도 파일",
    }),
    note: z.string(),
  })
  .merge(zRevisionBase);

export const zOperationProposalRevisionRequestCreate =
  zOperationProposalRevision.omit({
    id: true,
  });

export const zOperationProposalRevisionRequestUpdate = z
  .object({ id: zId })
  .merge(
    zOperationProposalRevision
      .omit({
        id: true,
        operationProposal: true,
      })
      .partial(),
  );

export const zOperationProposalRevisionResponse =
  zOperationProposalRevision.pick({
    id: true,
  });

export type IOperationProposalRevision = z.infer<
  typeof zOperationProposalRevision
>;
export type IOperationProposalRevisionRequestCreate = z.infer<
  typeof zOperationProposalRevisionRequestCreate
>;
export type IOperationProposalRevisionRequestUpdate = z.infer<
  typeof zOperationProposalRevisionRequestUpdate
>;
export type IOperationProposalRevisionResponse = z.infer<
  typeof zOperationProposalRevisionResponse
>;

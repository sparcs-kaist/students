import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { zProjectProposalRevision } from "@sparcs-students/interface/api/proposal/type/project-proposal.type";

export const zProjectProposalDocumentReview = z.object({
  id: zId,
  projectProposalRevision: zExtractId(zProjectProposalRevision),
  student: zExtractId(zStudent),
  documentReviewStatusEnum: z.nativeEnum(DocumentReviewStatusEnum),
  detail: z.string().optional(),
});

export type IProjectProposalDocumentReview = z.infer<
  typeof zProjectProposalDocumentReview
>;

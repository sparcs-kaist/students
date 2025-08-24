import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum";
import { zBudgetProposalIncomeRevision } from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";

export const zBudgetProposalIncomeDocumentReview = z.object({
  id: zId,
  budgetProposalIncomeRevision: zExtractId(zBudgetProposalIncomeRevision),
  student: zExtractId(zStudent),
  documentReviewStatusEnum: z.nativeEnum(DocumentReviewStatusEnum),
  detail: z.string().optional(),
});

export const zBudgetProposalIncomeDocumentReviewRequestCreate =
  zBudgetProposalIncomeDocumentReview.omit({
    id: true,
    student: true,
  });

export type IBudgetProposalIncomeDocumentReview = z.infer<
  typeof zBudgetProposalIncomeDocumentReview
>;
export type IBudgetProposalIncomeDocumentReviewRequestCreate = z.infer<
  typeof zBudgetProposalIncomeDocumentReviewRequestCreate
>;

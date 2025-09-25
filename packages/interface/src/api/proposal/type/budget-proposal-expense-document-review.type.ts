import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum";
import { zBudgetProposalExpenseRevision } from "@sparcs-students/interface/api/proposal/type/budget-proposal-expense.type";

export const zBudgetProposalExpenseDocumentReview = z.object({
  id: zId,
  budgetProposalExpenseRevision: zExtractId(zBudgetProposalExpenseRevision),
  student: zExtractId(zStudent),
  documentReviewStatusEnum: z.nativeEnum(DocumentReviewStatusEnum),
  detail: z.string().optional(),
});

export const zBudgetProposalExpenseDocumentReviewRequestCreate =
  zBudgetProposalExpenseDocumentReview.omit({
    id: true,
    student: true,
  });

export type IBudgetProposalExpenseDocumentReview = z.infer<
  typeof zBudgetProposalExpenseDocumentReview
>;
export type IBudgetProposalExpenseDocumentReviewRequestCreate = z.infer<
  typeof zBudgetProposalExpenseDocumentReviewRequestCreate
>;

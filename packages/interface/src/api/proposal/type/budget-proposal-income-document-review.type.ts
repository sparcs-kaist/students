import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum";
import { zBudgetProposalIncome } from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";

export const zBudgetProposalIncomeDocumentReview = z.object({
  id: zId,
  budgetProposalIncomeRevision: zExtractId(zBudgetProposalIncome),
  student: zExtractId(zStudent),
  documentReviewStatusEnum: z.nativeEnum(DocumentReviewStatusEnum),
  detail: z.string().optional(),
});

export type IBudgetProposalIncomeDocumentReview = z.infer<
  typeof zBudgetProposalIncomeDocumentReview
>;

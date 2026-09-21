import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum";
import { zBudgetReportExpenseRevision } from "@sparcs-students/interface/api/report/type/budget-report-expense.type";

export const zBudgetReportExpenseDocumentReview = z.object({
  id: zId,
  budgetReportExpenseRevision: zExtractId(zBudgetReportExpenseRevision),
  student: zExtractId(zStudent),
  documentReviewStatusEnum: z.nativeEnum(DocumentReviewStatusEnum),
  detail: z.string().optional(),
});

export const zBudgetReportExpenseDocumentReviewRequestCreate =
  zBudgetReportExpenseDocumentReview.omit({
    id: true,
    student: true,
  });

export type IBudgetReportExpenseDocumentReview = z.infer<
  typeof zBudgetReportExpenseDocumentReview
>;
export type IBudgetReportExpenseDocumentReviewRequestCreate = z.infer<
  typeof zBudgetReportExpenseDocumentReviewRequestCreate
>;

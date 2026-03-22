import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum";
import { zBudgetReportIncomeRevision } from "@sparcs-students/interface/api/report/type/budget-report-income.type";

export const zBudgetReportIncomeDocumentReview = z.object({
  id: zId,
  budgetReportIncomeRevision: zExtractId(zBudgetReportIncomeRevision),
  student: zExtractId(zStudent),
  documentReviewStatusEnum: z.nativeEnum(DocumentReviewStatusEnum),
  detail: z.string().optional(),
});

export const zBudgetReportIncomeDocumentReviewRequestCreate =
  zBudgetReportIncomeDocumentReview.omit({
    id: true,
    student: true,
  });

export type IBudgetReportIncomeDocumentReview = z.infer<
  typeof zBudgetReportIncomeDocumentReview
>;
export type IBudgetReportIncomeDocumentReviewRequestCreate = z.infer<
  typeof zBudgetReportIncomeDocumentReviewRequestCreate
>;

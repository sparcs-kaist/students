import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetReportIncomeDocumentReview } from "@sparcs-students/interface/api/report/index";

export interface IBudgetReportIncomeDocumentReviewCreate {
  budgetReportIncomeRevision: IBudgetReportIncomeDocumentReview["budgetReportIncomeRevision"];
  student: IBudgetReportIncomeDocumentReview["student"];
  documentReviewStatusEnum: IBudgetReportIncomeDocumentReview["documentReviewStatusEnum"];
  detail?: IBudgetReportIncomeDocumentReview["detail"];
}

export class MBudgetReportIncomeDocumentReview
  extends MEntity
  implements IBudgetReportIncomeDocumentReview
{
  static modelName = "BudgetReportIncomeDocumentReview";

  budgetReportIncomeRevision: IBudgetReportIncomeDocumentReview["budgetReportIncomeRevision"];

  student: IBudgetReportIncomeDocumentReview["student"];

  documentReviewStatusEnum: IBudgetReportIncomeDocumentReview["documentReviewStatusEnum"];

  detail?: IBudgetReportIncomeDocumentReview["detail"];

  constructor(data: IBudgetReportIncomeDocumentReview) {
    super();
    Object.assign(this, data);
  }
}

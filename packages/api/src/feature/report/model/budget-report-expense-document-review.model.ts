import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetReportExpenseDocumentReview } from "@sparcs-students/interface/api/report/index";

export interface IBudgetReportExpenseDocumentReviewCreate {
  budgetReportExpenseRevision: IBudgetReportExpenseDocumentReview["budgetReportExpenseRevision"];
  student: IBudgetReportExpenseDocumentReview["student"];
  documentReviewStatusEnum: IBudgetReportExpenseDocumentReview["documentReviewStatusEnum"];
  detail?: IBudgetReportExpenseDocumentReview["detail"];
}

export class MBudgetReportExpenseDocumentReview
  extends MEntity
  implements IBudgetReportExpenseDocumentReview
{
  static modelName = "BudgetReportExpenseDocumentReview";

  budgetReportExpenseRevision: IBudgetReportExpenseDocumentReview["budgetReportExpenseRevision"];

  student: IBudgetReportExpenseDocumentReview["student"];

  documentReviewStatusEnum: IBudgetReportExpenseDocumentReview["documentReviewStatusEnum"];

  detail?: IBudgetReportExpenseDocumentReview["detail"];

  constructor(data: IBudgetReportExpenseDocumentReview) {
    super();
    Object.assign(this, data);
  }
}

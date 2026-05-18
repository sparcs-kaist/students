import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetProposalIncomeDocumentReview } from "@sparcs-students/interface/api/proposal/index";

export interface IBudgetProposalIncomeDocumentReviewCreate {
  budgetProposalIncomeRevision: IBudgetProposalIncomeDocumentReview["budgetProposalIncomeRevision"];

  student: IBudgetProposalIncomeDocumentReview["student"];

  documentReviewStatusEnum: IBudgetProposalIncomeDocumentReview["documentReviewStatusEnum"];

  detail?: IBudgetProposalIncomeDocumentReview["detail"];
}

export class MBudgetProposalIncomeDocumentReview
  extends MEntity
  implements IBudgetProposalIncomeDocumentReview
{
  static modelName = "BudgetProposalIncomeDocumentReview";

  budgetProposalIncomeRevision: IBudgetProposalIncomeDocumentReview["budgetProposalIncomeRevision"];

  student: IBudgetProposalIncomeDocumentReview["student"];

  documentReviewStatusEnum: IBudgetProposalIncomeDocumentReview["documentReviewStatusEnum"];

  detail?: IBudgetProposalIncomeDocumentReview["detail"];

  constructor(data: IBudgetProposalIncomeDocumentReview) {
    super();
    Object.assign(this, data);
  }
}

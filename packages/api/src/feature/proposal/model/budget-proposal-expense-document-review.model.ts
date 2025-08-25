import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetProposalExpenseDocumentReview } from "@sparcs-students/interface/api/proposal/index";

export interface IBudgetProposalExpenseDocumentReviewCreate {
  budgetProposalExpenseRevision: IBudgetProposalExpenseDocumentReview["budgetProposalExpenseRevision"];
  student: IBudgetProposalExpenseDocumentReview["student"];
  documentReviewStatusEnum: IBudgetProposalExpenseDocumentReview["documentReviewStatusEnum"];
  detail?: IBudgetProposalExpenseDocumentReview["detail"];
}

export class MBudgetProposalExpenseDocumentReview
  extends MEntity
  implements IBudgetProposalExpenseDocumentReview
{
  static modelName = "BudgetProposalExpenseDocumentReview";

  budgetProposalExpenseRevision: IBudgetProposalExpenseDocumentReview["budgetProposalExpenseRevision"];

  student: IBudgetProposalExpenseDocumentReview["student"];

  documentReviewStatusEnum: IBudgetProposalExpenseDocumentReview["documentReviewStatusEnum"];

  detail?: IBudgetProposalExpenseDocumentReview["detail"];

  constructor(data: IBudgetProposalExpenseDocumentReview) {
    super();
    Object.assign(this, data);
  }
}

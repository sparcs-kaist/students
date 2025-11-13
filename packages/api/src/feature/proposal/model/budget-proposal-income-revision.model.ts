import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IBudgetProposalIncomeRevision } from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";

export interface IBudgetProposalIncomeRevisionCreate {
  budgetProposalIncome: IBudgetProposalIncomeRevision["budgetProposalIncome"];

  budgetDomainEnum: IBudgetProposalIncomeRevision["budgetDomainEnum"];

  budgetDivisionIncomeEnum: IBudgetProposalIncomeRevision["budgetDivisionIncomeEnum"];

  name: IBudgetProposalIncomeRevision["name"];

  amount: IBudgetProposalIncomeRevision["amount"];

  detail: IBudgetProposalIncomeRevision["detail"];

  code: IBudgetProposalIncomeRevision["code"];
}

export class MBudgetProposalIncomeRevision
  extends MRevisionEntity
  implements IBudgetProposalIncomeRevision
{
  static modelName = "BudgetProposalIncomeRevision";

  budgetProposalIncome: IBudgetProposalIncomeRevision["budgetProposalIncome"];

  budgetDomainEnum: IBudgetProposalIncomeRevision["budgetDomainEnum"];

  budgetDivisionIncomeEnum: IBudgetProposalIncomeRevision["budgetDivisionIncomeEnum"];

  name: IBudgetProposalIncomeRevision["name"];

  amount: IBudgetProposalIncomeRevision["amount"];

  detail: IBudgetProposalIncomeRevision["detail"];

  code: IBudgetProposalIncomeRevision["code"];

  constructor(data: IBudgetProposalIncomeRevision) {
    super();
    Object.assign(this, data);
  }
}

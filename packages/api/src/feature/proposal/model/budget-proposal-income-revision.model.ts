import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IBudgetProposalIncomeRevision } from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";

export interface IBudgetProposalIncomeRevisionCreate {
  previousBudgetReportIncome: IBudgetProposalIncomeRevision["previousBudgetReportIncome"];

  budgetProposalIncome: IBudgetProposalIncomeRevision["budgetProposalIncome"];

  budgetDomainEnum: IBudgetProposalIncomeRevision["budgetDomainEnum"];

  budgetDivisionIncomeEnum: IBudgetProposalIncomeRevision["budgetDivisionIncomeEnum"];

  name: IBudgetProposalIncomeRevision["name"];

  amount: IBudgetProposalIncomeRevision["amount"];

  detail: IBudgetProposalIncomeRevision["detail"];

  note: IBudgetProposalIncomeRevision["note"];

  documentStatusEnum: IBudgetProposalIncomeRevision["documentStatusEnum"];
}

export class MBudgetProposalIncomeRevision
  extends MRevisionEntity
  implements IBudgetProposalIncomeRevision
{
  static modelName = "BudgetProposalIncomeRevision";

  previousBudgetReportIncome: IBudgetProposalIncomeRevision["previousBudgetReportIncome"];

  budgetProposalIncome: IBudgetProposalIncomeRevision["budgetProposalIncome"];

  budgetDomainEnum: IBudgetProposalIncomeRevision["budgetDomainEnum"];

  budgetDivisionIncomeEnum: IBudgetProposalIncomeRevision["budgetDivisionIncomeEnum"];

  name: IBudgetProposalIncomeRevision["name"];

  amount: IBudgetProposalIncomeRevision["amount"];

  detail: IBudgetProposalIncomeRevision["detail"];

  note: IBudgetProposalIncomeRevision["note"];

  constructor(data: IBudgetProposalIncomeRevision) {
    super();
    Object.assign(this, data);
  }
}

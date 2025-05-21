import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IBudgetProposalExpenseRevision } from "@sparcs-students/interface/api/proposal/type/budget-proposal-expense.type";

export interface IBudgetProposalExpenseRevisionCreate {
  budgetProposalExpense: IBudgetProposalExpenseRevision["budgetProposalExpense"];

  previousBudgetReportExpense: IBudgetProposalExpenseRevision["previousBudgetReportExpense"];

  budgetDomainEnum: IBudgetProposalExpenseRevision["budgetDomainEnum"];

  budgetDivisionExpenseEnum: IBudgetProposalExpenseRevision["budgetDivisionExpenseEnum"];

  budgetClassExpenseEnum: IBudgetProposalExpenseRevision["budgetClassExpenseEnum"];

  amount: IBudgetProposalExpenseRevision["amount"];

  detail: IBudgetProposalExpenseRevision["detail"];

  documentStatusEnum: IBudgetProposalExpenseRevision["documentStatusEnum"];
}

export class MBudgetProposalExpenseRevision
  extends MRevisionEntity
  implements IBudgetProposalExpenseRevision
{
  static modelName = "BudgetProposalExpense";

  budgetProposalExpense: IBudgetProposalExpenseRevision["budgetProposalExpense"];

  previousBudgetReportExpense: IBudgetProposalExpenseRevision["previousBudgetReportExpense"];

  budgetDomainEnum: IBudgetProposalExpenseRevision["budgetDomainEnum"];

  budgetDivisionExpenseEnum: IBudgetProposalExpenseRevision["budgetDivisionExpenseEnum"];

  budgetClassExpenseEnum: IBudgetProposalExpenseRevision["budgetClassExpenseEnum"];

  amount: IBudgetProposalExpenseRevision["amount"];

  detail: IBudgetProposalExpenseRevision["detail"];

  constructor(data: IBudgetProposalExpenseRevision) {
    super();
    Object.assign(this, data);
  }
}

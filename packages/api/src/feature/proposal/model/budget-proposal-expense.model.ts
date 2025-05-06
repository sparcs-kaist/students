import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetProposalExpense } from "@sparcs-students/interface/api/proposal/type/budget-proposal-expense.type";

export interface IBudgetProposalExpenseCreate extends IBudgetProposalExpense {
  organizationId: number;
  semesterId: number;
}

export class MBudgetProposalExpense
  extends MEntity
  implements IBudgetProposalExpense
{
  static modelName = "BudgetProposalExpense";

  organization: IBudgetProposalExpense["organization"];

  semester: IBudgetProposalExpense["semester"];

  projectProposal: IBudgetProposalExpense["projectProposal"];

  constructor(data: IBudgetProposalExpenseCreate) {
    super();
    Object.assign(this, data);
  }
}

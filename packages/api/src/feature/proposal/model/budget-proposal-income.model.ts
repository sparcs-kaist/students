import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetProposalIncome } from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";

export interface IBudgetProposalIncomeCreate extends IBudgetProposalIncome {
  organization: IBudgetProposalIncome["organization"];

  semester: IBudgetProposalIncome["semester"];
}

export class MBudgetProposalIncome
  extends MEntity
  implements IBudgetProposalIncome
{
  static modelName = "BudgetProposalIncome";

  organization: IBudgetProposalIncome["organization"];

  semester: IBudgetProposalIncome["semester"];

  constructor(data: IBudgetProposalIncome) {
    super();
    Object.assign(this, data);
  }
}

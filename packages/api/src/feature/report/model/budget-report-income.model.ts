import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetReportIncome } from "@sparcs-students/interface/api/report/type/budget-report-income.type";

export interface IBudgetReportIncomeCreate extends IBudgetReportIncome {
  organization: IBudgetReportIncome["organization"];

  semester: IBudgetReportIncome["semester"];
}

export class MBudgetReportIncome
  extends MEntity
  implements IBudgetReportIncome
{
  static modelName = "BudgetReportIncome";

  organization: IBudgetReportIncome["organization"];

  semester: IBudgetReportIncome["semester"];

  budgetProposalIncome: IBudgetReportIncome["budgetProposalIncome"];

  constructor(data: IBudgetReportIncome) {
    super();
    Object.assign(this, data);
  }
}

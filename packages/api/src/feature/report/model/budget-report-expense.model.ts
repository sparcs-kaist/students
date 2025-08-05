import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IBudgetReportExpense } from "@sparcs-students/interface/api/report/type/budget-report-expense.type";

export interface IBudgetReportExpenseCreate extends IBudgetReportExpense {
  organization: IBudgetReportExpense["organization"];

  semester: IBudgetReportExpense["semester"];

  projectReport: IBudgetReportExpense["projectReport"];
}

export class MBudgetReportExpense
  extends MEntity
  implements IBudgetReportExpense
{
  static modelName = "BudgetReportExpense";

  organization: IBudgetReportExpense["organization"];

  semester: IBudgetReportExpense["semester"];

  projectReport: IBudgetReportExpense["projectReport"];

  constructor(data: IBudgetReportExpense) {
    super();
    Object.assign(this, data);
  }
}

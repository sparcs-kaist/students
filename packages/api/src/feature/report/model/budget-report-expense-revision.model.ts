import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IBudgetReportExpenseRevision } from "@sparcs-students/interface/api/report/type/budget-report-expense.type";

export interface IBudgetReportExpenseRevisionCreate {
  budgetReportExpense: IBudgetReportExpenseRevision["budgetReportExpense"];

  amount: IBudgetReportExpenseRevision["amount"];

  note: IBudgetReportExpenseRevision["note"];
}

export class MBudgetReportExpenseRevision
  extends MRevisionEntity
  implements IBudgetReportExpenseRevision
{
  static modelName = "BudgetReportExpenseRevision";

  budgetReportExpense: IBudgetReportExpenseRevision["budgetReportExpense"];

  amount: IBudgetReportExpenseRevision["amount"];

  note: IBudgetReportExpenseRevision["note"];

  constructor(data: IBudgetReportExpenseRevision) {
    super();
    Object.assign(this, data);
  }
}

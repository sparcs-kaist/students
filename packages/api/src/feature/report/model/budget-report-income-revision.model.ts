import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IBudgetReportIncomeRevision } from "@sparcs-students/interface/api/report/type/budget-report-income.type";

export interface IBudgetReportIncomeRevisionCreate {
  budgetReportIncome: IBudgetReportIncomeRevision["budgetReportIncome"];

  amount: IBudgetReportIncomeRevision["amount"];

  note: IBudgetReportIncomeRevision["note"];
}

export class MBudgetReportIncomeRevision
  extends MRevisionEntity
  implements IBudgetReportIncomeRevision
{
  static modelName = "BudgetReportIncomeRevision";

  budgetReportIncome: IBudgetReportIncomeRevision["budgetReportIncome"];

  amount: IBudgetReportIncomeRevision["amount"];

  note: IBudgetReportIncomeRevision["note"];

  constructor(data: IBudgetReportIncomeRevision) {
    super();
    Object.assign(this, data);
  }
}

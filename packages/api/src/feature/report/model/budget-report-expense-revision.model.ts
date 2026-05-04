import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IBudgetReportExpenseRevision } from "@sparcs-students/interface/api/report/type/budget-report-expense.type";

export interface IBudgetReportExpenseRevisionCreate {
  budgetReportExpense: IBudgetReportExpenseRevision["budgetReportExpense"];

  budgetDomainEnum: IBudgetReportExpenseRevision["budgetDomainEnum"];

  budgetDivisionExpenseEnum: IBudgetReportExpenseRevision["budgetDivisionExpenseEnum"];

  budgetClassExpenseEnum: IBudgetReportExpenseRevision["budgetClassExpenseEnum"];

  name: IBudgetReportExpenseRevision["name"];

  amount: IBudgetReportExpenseRevision["amount"];

  detail: IBudgetReportExpenseRevision["detail"];

  code: IBudgetReportExpenseRevision["code"];
}

export class MBudgetReportExpenseRevision
  extends MRevisionEntity
  implements IBudgetReportExpenseRevision
{
  static modelName = "BudgetReportExpense";

  budgetReportExpense: IBudgetReportExpenseRevision["budgetReportExpense"];

  budgetDomainEnum: IBudgetReportExpenseRevision["budgetDomainEnum"];

  budgetDivisionExpenseEnum: IBudgetReportExpenseRevision["budgetDivisionExpenseEnum"];

  budgetClassExpenseEnum: IBudgetReportExpenseRevision["budgetClassExpenseEnum"];

  name: IBudgetReportExpenseRevision["name"];

  amount: IBudgetReportExpenseRevision["amount"];

  detail: IBudgetReportExpenseRevision["detail"];

  code: IBudgetReportExpenseRevision["code"];

  constructor(data: IBudgetReportExpenseRevision) {
    super();
    Object.assign(this, data);
  }
}

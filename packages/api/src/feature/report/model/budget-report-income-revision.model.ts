import { MRevisionEntity } from "@sparcs-students/api/common/base/revision-entity.model";
import { IBudgetReportIncomeRevision } from "@sparcs-students/interface/api/report/type/budget-report-income.type";

export interface IBudgetReportIncomeRevisionCreate {
  budgetReportIncome: IBudgetReportIncomeRevision["budgetReportIncome"];

  budgetDomainEnum: IBudgetReportIncomeRevision["budgetDomainEnum"];

  budgetDivisionIncomeEnum: IBudgetReportIncomeRevision["budgetDivisionIncomeEnum"];

  name: IBudgetReportIncomeRevision["name"];

  amount: IBudgetReportIncomeRevision["amount"];

  detail: IBudgetReportIncomeRevision["detail"];

  note: IBudgetReportIncomeRevision["note"];

  documentStatusEnum: IBudgetReportIncomeRevision["documentStatusEnum"];
}

export class MBudgetReportIncomeRevision
  extends MRevisionEntity
  implements IBudgetReportIncomeRevision
{
  static modelName = "BudgetReportIncomeRevision";

  budgetReportIncome: IBudgetReportIncomeRevision["budgetReportIncome"];

  budgetDomainEnum: IBudgetReportIncomeRevision["budgetDomainEnum"];

  budgetDivisionIncomeEnum: IBudgetReportIncomeRevision["budgetDivisionIncomeEnum"];

  name: IBudgetReportIncomeRevision["name"];

  amount: IBudgetReportIncomeRevision["amount"];

  detail: IBudgetReportIncomeRevision["detail"];

  note: IBudgetReportIncomeRevision["note"];

  constructor(data: IBudgetReportIncomeRevision) {
    super();
    Object.assign(this, data);
  }
}

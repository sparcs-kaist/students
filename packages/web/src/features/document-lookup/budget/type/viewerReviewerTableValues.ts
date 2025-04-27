import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
  DocumentReviewStatusEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum";

export interface IncomeProps {
  code: number;
  id: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionIncome: BudgetDivisionIncomeEnum;
  item: string;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: DocumentReviewStatusEnum;
  review: string;
}

export interface ExpenditureProps {
  code: number;
  id: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionExpense: BudgetDivisionExpenseEnum;
  name: string;
  item: BudgetClassExpenseEnum;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: DocumentReviewStatusEnum;
  review: string;
}

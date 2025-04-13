import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
  DocumentReviewStatusEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum";

export interface ManagerIncomeProps {
  code: number;
  id: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionIncome: BudgetDivisionIncomeEnum;
  item: string;
  lastYear: number | string;
  thisYear: number | string;
  ratio: number | null;
  reason: string;
  status: DocumentReviewStatusEnum;
  review: string;
}

export interface ManagerExpenditureProps {
  code: number;
  id: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionExpenditure: BudgetDivisionExpenseEnum | undefined;
  projectName: string;
  item: BudgetClassExpenseEnum;
  lastYear: number | string;
  thisYear: number | string;
  ratio: number | null;
  reason: string;
  status: DocumentReviewStatusEnum;
  review: string;
}

export interface FormValues {
  incomes: ManagerIncomeProps[];
  expenditures: ManagerExpenditureProps[];
}

export interface ManagerProjectNameCandidate {
  budgetDomain: BudgetDomainEnum;
  budgetDivisionExpenditure: BudgetDivisionExpenseEnum | undefined;
  projectNameCandidate: string[];
}

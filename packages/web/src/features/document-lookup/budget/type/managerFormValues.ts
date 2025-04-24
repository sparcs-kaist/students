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
  id: number;
  code: number; // 코드
  rowId: number; // row index 필요한지 의문. 프론트 로직 상 필요했던 것 같기도
  budgetDomain: BudgetDomainEnum; // 구분
  budgetDivisionExpenditure: BudgetDivisionExpenseEnum | undefined; // 예산 분류
  projectName: string; // 사업명
  item: BudgetClassExpenseEnum; // 항목
  lastYear: number | string; // 작년 결산
  thisYear: number | string; // 올해 예산
  ratio: number | null; // 비율
  reason: string; // 근거
  status: DocumentReviewStatusEnum; // 검토 현황
  review: string; // 검토 내용
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

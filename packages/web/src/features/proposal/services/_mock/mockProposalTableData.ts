import { IncomeProps } from "@sparcs-students/web/features/proposal/components/IncomeTable";
import {
  BudgetClassExpenseE,
  BudgetDivisionIncomeE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";
import { ExpenditureProps } from "@sparcs-students/web/features/proposal/components/ExpenditureTable";
import { TotalProps } from "@sparcs-students/web/features/proposal/components/TotalTable";

export const mockIncomeData: IncomeProps[] = [
  {
    code: 101,
    budgetDomain: BudgetDomainE.Student,
    budgetDivisionIncome: BudgetDivisionIncomeE.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거",
    status: "승인",
    explanation: "대충 어쩌구저쩌구한 설명",
  },
];

export const mockExpenditureData: ExpenditureProps[] = [
  {
    code: 101,
    budgetDomain: BudgetDomainE.Student,
    budgetDivisionIncome: BudgetDivisionIncomeE.Substratum,
    name: "격려금",
    item: BudgetClassExpenseE.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거",
    status: "승인",
    explanation: "대충 어쩌구저쩌구한 설명",
  },
];

export const mockTotalData: TotalProps[] = [
  {
    budgetDomain: BudgetDomainE.Student,
    type: "수입",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
  },
];

import { IncomeProps } from "@sparcs-students/web/features/proposal/components/ViewerIncomeTable";
import {
  BudgetClassExpenseE,
  BudgetDivisionIncomeE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";
import { ExpenditureProps } from "@sparcs-students/web/features/proposal/components/ViewerExpenditureTable";
import { TotalProps } from "@sparcs-students/web/features/proposal/components/TotalTable";
import { ViewResultProps } from "@sparcs-students/web/features/proposal/components/ViewResult";

export const mockViewResultData: ViewResultProps = {
  fileName: "전산학부 24년도 예산안",
  organization: "전산학부",
  period: "2024년도 하반기",
  headPerson: "김스튜",
  submitDate: new Date(),
  dateList: [
    new Date(2025, 0, 24),
    new Date(2025, 0, 25),
    new Date(2025, 0, 26),
  ],
};

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

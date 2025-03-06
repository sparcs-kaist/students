import { ViewerIncomeProps } from "@sparcs-students/web/features/budget/components/ViewerIncomeTable";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum/budget.enum";
import { ViewerExpenditureProps } from "@sparcs-students/web/features/documents/components/ViewerExpenditureTable";
import { ViewResultProps } from "@sparcs-students/web/features/documents/components/ViewResult";
import { IncomeProps } from "@sparcs-students/web/features/budget/components/ReviewerIncomeTable";
import { ExpenditureProps } from "@sparcs-students/web/features/documents/components/ReviewerExpenditureTable";

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

export const mockViewerIncomeData: ViewerIncomeProps[] = [
  {
    code: 101,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
  {
    code: 102,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
  {
    code: 103,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 150000,
    ratio: 120.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
  {
    code: 201,
    budgetDomain: BudgetDomainEnum.School,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.School,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 150000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
];

export const mockViewerExpenditureData: ViewerExpenditureProps[] = [
  {
    code: 401,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "승인",
  },
  {
    code: 402,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 12500,
    thisYear: 125000,
    ratio: 1000.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "승인",
  },
  {
    code: 403,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "승인",
  },
  {
    code: 501,
    budgetDomain: BudgetDomainEnum.School,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "승인",
  },
];
export const mockIncomeData: IncomeProps[] = [
  {
    code: 101,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
  {
    code: 102,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
  {
    code: 103,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 150000,
    ratio: 120.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
  {
    code: 201,
    budgetDomain: BudgetDomainEnum.School,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.School,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 150000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: "승인",
    review: "",
  },
];

export interface ManagerIncomeProps {
  code: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionIncome: BudgetDivisionIncomeEnum;
  item: string;
  lastYear: number | string;
  thisYear: number | string;
  ratio: number | null;
  reason: string;
  status: string;
  review: string;
}

export const mockManagerIncomeData: ManagerIncomeProps[] = [
  {
    code: 0,
    budgetDomain: BudgetDomainEnum.Undefined,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Undefined,
    item: "",
    lastYear: "",
    thisYear: "",
    ratio: 100.0,
    reason: "",
    status: "",
    review: "",
  },
];

export const mockExpenditureData: ExpenditureProps[] = [
  {
    code: 401,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "승인",
    review: "",
  },
  {
    code: 402,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 12500,
    thisYear: 125000,
    ratio: 1000.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "수정 요청",
    review: "",
  },
  {
    code: 403,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "반려",
    review: "",
  },
  {
    code: 501,
    budgetDomain: BudgetDomainEnum.School,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: "승인",
    review: "",
  },
];

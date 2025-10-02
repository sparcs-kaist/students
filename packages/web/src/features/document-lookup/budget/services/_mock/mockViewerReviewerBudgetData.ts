import {
  ExpenditureProps,
  IncomeProps,
} from "@sparcs-students/web/features/document-lookup/budget/type/viewerReviewerTableValues";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
  DocumentReviewStatusEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum";
import { TotalProps } from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";

export const mockExpenditureData: ExpenditureProps[] = [
  {
    code: 401,
    id: 0,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
  {
    code: 402,
    id: 1,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 12500,
    thisYear: 125000,
    ratio: 1000.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: DocumentReviewStatusEnum.ReviseNeeded,
    review: "",
  },
  {
    code: 403,
    id: 2,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: DocumentReviewStatusEnum.Rejected,
    review: "",
  },
  {
    code: 501,
    id: 3,
    budgetDomain: BudgetDomainEnum.School,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason: "대충 어쩌구저쩌구한 근거\n아무말이나 적자\nㅁㄴㅇㄹ",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
];

export const mockIncomeData: IncomeProps[] = [
  {
    code: 101,
    id: 0,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
  {
    code: 102,
    id: 1,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 125000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
  {
    code: 103,
    id: 2,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Substratum,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 150000,
    ratio: 120.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
  {
    code: 201,
    id: 3,
    budgetDomain: BudgetDomainEnum.School,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.School,
    item: "기층기구회계 지원금",
    lastYear: 125000,
    thisYear: 150000,
    ratio: 100.0,
    reason:
      "대충 어쩌구저쩌구한 비고\n아무말이나 적자\nㅁㄴㅇㄹ\nㅁㄴㅇㄻㄴㅇㄹ",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
];

// TotalTable용 mock 데이터 (통합 데이터)
export const mockTotalData: TotalProps[] = [
  {
    budgetDomain: BudgetDomainEnum.Student,
    type: "수입",
    lastYear: 500000, // 학생회비 수입 합계
    thisYear: 525000,
    ratio: 105.0,
  },
  {
    budgetDomain: BudgetDomainEnum.Student,
    type: "지출",
    lastYear: 387500, // 학생회비 지출 합계
    thisYear: 500000,
    ratio: 129.03,
  },
  {
    budgetDomain: BudgetDomainEnum.Student,
    type: "총계",
    lastYear: 112500,
    thisYear: 25000,
    ratio: 22.22,
  },
  {
    budgetDomain: BudgetDomainEnum.School,
    type: "수입",
    lastYear: 125000, // 본회계 수입 합계
    thisYear: 150000,
    ratio: 120.0,
  },
  {
    budgetDomain: BudgetDomainEnum.School,
    type: "지출",
    lastYear: 125000, // 본회계 지출 합계
    thisYear: 125000,
    ratio: 100.0,
  },
  {
    budgetDomain: BudgetDomainEnum.School,
    type: "총계",
    lastYear: 0,
    thisYear: 25000,
    ratio: null,
  },
];

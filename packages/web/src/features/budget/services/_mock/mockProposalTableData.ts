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
// import { ManagerExpenditureProps } from "@sparcs-students/web/features/documents/components/ManagerExpenditureTable";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";

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

export const mockViewProjectResultData: ViewResultProps = {
  fileName: "전산학부 24년도 사업보고서",
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

export const mockViewerExpenditureData: ViewerExpenditureProps[] = [
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
    status: DocumentReviewStatusEnum.Accepted,
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
    status: DocumentReviewStatusEnum.Accepted,
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

export const mockManagerIncomeData: ManagerIncomeProps[] = [
  {
    code: 0,
    id: 0,
    budgetDomain: BudgetDomainEnum.Undefined,
    budgetDivisionIncome: BudgetDivisionIncomeEnum.Undefined,
    item: "",
    lastYear: "",
    thisYear: "",
    ratio: 100.0,
    reason: "",
    status: DocumentReviewStatusEnum.Unsaved,
    review: "",
  },
];

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

export const mockManagerExpenditureData: ManagerExpenditureProps[] = [
  {
    code: 401,
    id: 0,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpenditure: BudgetDivisionExpenseEnum.Operating,
    projectName: "격려금",
    item: BudgetClassExpenseEnum.Product,
    lastYear: "125000",
    thisYear: "125000",
    ratio: 100.0,
    reason: "",
    status: DocumentReviewStatusEnum.Unsaved,
    review: "",
  },
];

export interface ManagerProjectNameCandidate {
  budgetDomain: BudgetDomainEnum;
  budgetDivisionExpenditure: BudgetDivisionExpenseEnum | undefined;
  projectNameCandidate: string[];
}

export const mockManagerProjectNameCandidateList: ManagerProjectNameCandidate[] =
  [
    {
      budgetDomain: BudgetDomainEnum.School,
      budgetDivisionExpenditure: BudgetDivisionExpenseEnum.New,
      projectNameCandidate: ["작년의 어떠한 사업", "작년의 저떠한 사업"],
    },
  ];

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

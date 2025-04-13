import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/budget.enum";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";
import {
  ManagerExpenditureProps,
  ManagerIncomeProps,
  ManagerProjectNameCandidate,
} from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";

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

export const mockManagerProjectNameCandidateList: ManagerProjectNameCandidate[] =
  [
    {
      budgetDomain: BudgetDomainEnum.School,
      budgetDivisionExpenditure: BudgetDivisionExpenseEnum.New,
      projectNameCandidate: ["작년의 어떠한 사업", "작년의 저떠한 사업"],
    },
  ];

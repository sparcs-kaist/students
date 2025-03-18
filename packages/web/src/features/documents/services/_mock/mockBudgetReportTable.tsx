/* eslint-disable no-restricted-imports */
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum/budget.enum";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";
import { BudgetReportProps } from "../../components/BudgetReportTable";

const mockBudgetReportData: BudgetReportProps[] = [
  {
    code: 401,
    budgetDomain: BudgetDomainEnum.Student, // 예시 값
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating, // 예시 값
    name: "사무용품 구입",
    item: BudgetClassExpenseEnum.Product, // 예시 값
    proposal: 5000000,
    report: 5200000,
    ratio: 104,
    reason: "인플레이션으로 인한 단가 상승",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
  {
    code: 402,
    budgetDomain: BudgetDomainEnum.Student,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.New,
    name: "연구개발 비용",
    item: BudgetClassExpenseEnum.Delivery,
    proposal: 20000000,
    report: 21000000,
    ratio: 105,
    reason: "신규 프로젝트 착수",
    status: DocumentReviewStatusEnum.Rejected,
    review: "",
  },
  {
    code: 403,
    budgetDomain: BudgetDomainEnum.School,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Regular,
    name: "광고 및 홍보",
    item: BudgetClassExpenseEnum.Repair,
    proposal: 8000000,
    report: 7500000,
    ratio: 93.75,
    reason: "광고 예산 조정",
    status: DocumentReviewStatusEnum.ReviseNeeded,
    review: "",
  },
  {
    code: 404,
    budgetDomain: BudgetDomainEnum.Autonomous,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Operating,
    name: "시설 유지보수",
    item: BudgetClassExpenseEnum.Insurance,
    proposal: 10000000,
    report: 10000000,
    ratio: 100,
    reason: "유지보수 비용 변동 없음",
    status: DocumentReviewStatusEnum.Progress,
    review: "",
  },
  {
    code: 405,
    budgetDomain: BudgetDomainEnum.Autonomous,
    budgetDivisionExpense: BudgetDivisionExpenseEnum.Regular,
    name: "직원 교육",
    item: BudgetClassExpenseEnum.Install,
    proposal: 3000000,
    report: 4000000,
    ratio: 133.33,
    reason: "직원 역량 강화 투자 확대",
    status: DocumentReviewStatusEnum.LateAccepted,
    review: "",
  },
];

export default mockBudgetReportData;

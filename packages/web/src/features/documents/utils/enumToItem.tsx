import {
  BudgetClassExpenseE,
  BudgetDivisionIncomeE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";

export const budgetDomainToString = (domain: BudgetDomainE) => {
  switch (domain) {
    case BudgetDomainE.Student:
      return "학생회비";
    case BudgetDomainE.School:
      return "본회계";
    case BudgetDomainE.Autonomous:
      return "자치";
    default:
      return "";
  }
};

export const budgetDivisionIncomeToString = (
  division: BudgetDivisionIncomeE,
) => {
  switch (division) {
    case BudgetDivisionIncomeE.Substratum:
      return "기층기구회계";
    case BudgetDivisionIncomeE.Central:
      return "중앙회계";
    case BudgetDivisionIncomeE.Incentive:
      return "격려기금";
    case BudgetDivisionIncomeE.Interest:
      return "예금이자";
    case BudgetDivisionIncomeE.School:
      return "학교지원금";
    case BudgetDivisionIncomeE.Carryover:
      return "이월금";
    case BudgetDivisionIncomeE.Department:
      return "과비";
    case BudgetDivisionIncomeE.Organizational:
      return "단비";
    case BudgetDivisionIncomeE.External:
      return "외부지원금";
    case BudgetDivisionIncomeE.Extra:
      return "기타수익금";
    case BudgetDivisionIncomeE.CAC:
      return "문화자치기금";
    default:
      return "";
  }
};

export const budgetExpenseToString = (expense: BudgetClassExpenseE) => {
  switch (expense) {
    case BudgetClassExpenseE.Product:
      return "상품비";
    case BudgetClassExpenseE.Gift:
      return "증정비";
    case BudgetClassExpenseE.Supply:
      return "물품비";
    case BudgetClassExpenseE.Print:
      return "인쇄비";
    case BudgetClassExpenseE.Transport:
      return "출장비";
    case BudgetClassExpenseE.Meeting:
      return "회의비";
    case BudgetClassExpenseE.Labor:
      return "인건비";
    case BudgetClassExpenseE.Welfare:
      return "복리후생비";
    case BudgetClassExpenseE.Install:
      return "설치비";
    case BudgetClassExpenseE.Delivery:
      return "운반비";
    case BudgetClassExpenseE.Repair:
      return "수선비";
    case BudgetClassExpenseE.Telecom:
      return "통신비";
    case BudgetClassExpenseE.Insurance:
      return "보험료";
    case BudgetClassExpenseE.Extra:
      return "기타비";
    case BudgetClassExpenseE.Backup:
      return "예비비";
    case BudgetClassExpenseE.Incentive:
      return "격려금";
    default:
      return "";
  }
};

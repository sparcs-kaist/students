import {
  BudgetClassExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum/budget.enum";

export const budgetDomainToString = (domain: BudgetDomainEnum) => {
  switch (domain) {
    case BudgetDomainEnum.Student:
      return "학생회비";
    case BudgetDomainEnum.School:
      return "본회계";
    case BudgetDomainEnum.Autonomous:
      return "자치";
    default:
      return "";
  }
};

export const budgetDivisionIncomeToString = (
  division: BudgetDivisionIncomeEnum,
) => {
  switch (division) {
    case BudgetDivisionIncomeEnum.Substratum:
      return "기층기구회계";
    case BudgetDivisionIncomeEnum.Central:
      return "중앙회계";
    case BudgetDivisionIncomeEnum.Incentive:
      return "격려기금";
    case BudgetDivisionIncomeEnum.Interest:
      return "예금이자";
    case BudgetDivisionIncomeEnum.School:
      return "학교지원금";
    case BudgetDivisionIncomeEnum.Carryover:
      return "이월금";
    case BudgetDivisionIncomeEnum.Department:
      return "과비";
    case BudgetDivisionIncomeEnum.Organizational:
      return "단비";
    case BudgetDivisionIncomeEnum.External:
      return "외부지원금";
    case BudgetDivisionIncomeEnum.Extra:
      return "기타수익금";
    case BudgetDivisionIncomeEnum.CAC:
      return "문화자치기금";
    default:
      return "";
  }
};

export const budgetExpenseToString = (expense: BudgetClassExpenseEnum) => {
  switch (expense) {
    case BudgetClassExpenseEnum.Product:
      return "상품비";
    case BudgetClassExpenseEnum.Gift:
      return "증정비";
    case BudgetClassExpenseEnum.Supply:
      return "물품비";
    case BudgetClassExpenseEnum.Print:
      return "인쇄비";
    case BudgetClassExpenseEnum.Transport:
      return "출장비";
    case BudgetClassExpenseEnum.Meeting:
      return "회의비";
    case BudgetClassExpenseEnum.Labor:
      return "인건비";
    case BudgetClassExpenseEnum.Welfare:
      return "복리후생비";
    case BudgetClassExpenseEnum.Install:
      return "설치비";
    case BudgetClassExpenseEnum.Delivery:
      return "운반비";
    case BudgetClassExpenseEnum.Repair:
      return "수선비";
    case BudgetClassExpenseEnum.Telecom:
      return "통신비";
    case BudgetClassExpenseEnum.Insurance:
      return "보험료";
    case BudgetClassExpenseEnum.Extra:
      return "기타비";
    case BudgetClassExpenseEnum.Backup:
      return "예비비";
    case BudgetClassExpenseEnum.Incentive:
      return "격려금";
    default:
      return "";
  }
};

import {
  BudgetClassExpenseE,
  BudgetDivisionIncomeE,
  BudgetDomainE,
} from "@sparcs-students/interface/common/enum/budget.enum";
import {
  DarkStatusDetail,
  StatusDetail,
} from "@sparcs-students/web/utils/getTagDetail";

export const budgetDomainTagList: {
  // 구분
  [key in BudgetDomainE]: StatusDetail;
} = {
  [BudgetDomainE.Student]: {
    text: "학생회비",
    color: "BLUE",
  },
  [BudgetDomainE.School]: {
    text: "본회계",
    color: "YELLOW",
  },
  [BudgetDomainE.Autonomous]: {
    text: "자치",
    color: "PINK",
  },
};

export const budgetDivisionIncomeTagList: {
  // 예산 분류
  [key in BudgetDivisionIncomeE]: StatusDetail;
} = {
  [BudgetDivisionIncomeE.Substratum]: {
    text: "기층기구회계",
    color: "CYAN",
  },
  [BudgetDivisionIncomeE.Central]: {
    text: "중앙회계",
    color: "CYAN",
  },
  [BudgetDivisionIncomeE.Incentive]: {
    text: "격려기금",
    color: "MAROON",
  },
  [BudgetDivisionIncomeE.Interest]: {
    text: "예금이자",
    color: "AMBER",
  },
  [BudgetDivisionIncomeE.School]: {
    text: "학교지원금",
    color: "ORCHID",
  },
  [BudgetDivisionIncomeE.Carryover]: {
    text: "이월금",
    color: "MARINE",
  },
  [BudgetDivisionIncomeE.Department]: {
    text: "과비",
    color: "MELON",
  },
  [BudgetDivisionIncomeE.Organizational]: {
    text: "단비",
    color: "MELON",
  },
  [BudgetDivisionIncomeE.External]: {
    text: "외부지원금",
    color: "LEMON",
  },
  [BudgetDivisionIncomeE.Extra]: {
    text: "기타수익금",
    color: "LEMON",
  },
  [BudgetDivisionIncomeE.CAC]: {
    text: "문화자치기금",
    color: "TEAL",
  },
};

export const budgetClassExpenseTagList: {
  [key in BudgetClassExpenseE]: DarkStatusDetail;
} = {
  [BudgetClassExpenseE.Product]: {
    text: "상품비",
    color: "MELON",
  },
  [BudgetClassExpenseE.Gift]: {
    text: "증정비",
    color: "MELON",
  },
  [BudgetClassExpenseE.Supply]: {
    text: "물품비",
    color: "MELON",
  },
  [BudgetClassExpenseE.Print]: {
    text: "인쇄비",
    color: "MARINE",
  },
  [BudgetClassExpenseE.Transport]: {
    text: "출장비",
    color: "CYAN",
  },
  [BudgetClassExpenseE.Meeting]: {
    text: "회의비",
    color: "ORCHID",
  },
  [BudgetClassExpenseE.Labor]: {
    text: "인건비",
    color: "CYAN",
  },
  [BudgetClassExpenseE.Welfare]: {
    text: "복리후생비",
    color: "ORCHID",
  },
  [BudgetClassExpenseE.Install]: {
    text: "설치비",
    color: "MARINE",
  },
  [BudgetClassExpenseE.Delivery]: {
    text: "운반비",
    color: "MARINE",
  },
  [BudgetClassExpenseE.Repair]: {
    text: "수선비",
    color: "MARINE",
  },
  [BudgetClassExpenseE.Telecom]: {
    text: "통신비",
    color: "MARINE",
  },
  [BudgetClassExpenseE.Insurance]: {
    text: "보험료",
    color: "CYAN",
  },
  [BudgetClassExpenseE.Extra]: {
    text: "기타비",
    color: "LEMON",
  },
  [BudgetClassExpenseE.Backup]: {
    text: "예비비",
    color: "LEMON",
  },
  [BudgetClassExpenseE.Incentive]: {
    text: "격려금",
    color: "MAROON",
  },
};

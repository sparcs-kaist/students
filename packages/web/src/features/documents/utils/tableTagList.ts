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

export const getbudgetTypeTag = (type: string) => {
  switch (type) {
    case "수입":
      return { color: "GREEN100", text: type };
    case "지출":
      return { color: "GREEN600", text: type };
    case "총계":
      return { color: "GREEN800", text: type };
    default:
      return { color: "GRAY", text: "-" };
  }
};

export const getbudgetRatioTag = (ratio: number) => {
  if (ratio > 100) {
    return { color: "GREEN", text: `${ratio.toFixed(1)}%` };
  }
  if (ratio <= 100) {
    return { color: "THISTLE", text: `${ratio.toFixed(1)}%` };
  }
  return { color: "GRAY", text: `-` };
};

export const getbudgetStatusTag = (type: string) => {
  switch (type) {
    case "승인":
      return { color: "BLUE", text: type };
    case "반려":
      return { color: "RED", text: type };
    case "사후승인":
      return { color: "TEAL", text: type };
    default:
      return { color: "GRAY", text: type };
  }
};

export const getbudgetCodeTag = (code: number) => {
  switch (Math.trunc(code / 100)) {
    case 1:
    case 4:
      return { color: "BLUE", text: code };
    case 2:
    case 5:
      return { color: "YELLOW", text: code };
    case 3:
    case 6:
      return { color: "PINK", text: code };
    default:
      return { color: "GRAY", text: "-" };
  }
};

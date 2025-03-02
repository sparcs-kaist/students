import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum/budget.enum";
import {
  DarkStatusDetail,
  StatusDetail,
} from "@sparcs-students/web/utils/getTagDetail";

export const budgetDomainTagList: {
  // 구분
  [key in BudgetDomainEnum]: StatusDetail;
} = {
  [BudgetDomainEnum.Student]: {
    text: "학생회비",
    color: "BLUE",
  },
  [BudgetDomainEnum.School]: {
    text: "본회계",
    color: "YELLOW",
  },
  [BudgetDomainEnum.Autonomous]: {
    text: "자치",
    color: "PINK",
  },
  [BudgetDomainEnum.Undefined]: {
    text: "-",
    color: "GRAY",
  },
};

export const budgetDivisionIncomeTagList: {
  // 예산 분류
  [key in BudgetDivisionIncomeEnum]: StatusDetail;
} = {
  [BudgetDivisionIncomeEnum.Substratum]: {
    text: "기층기구회계",
    color: "CYAN",
  },
  [BudgetDivisionIncomeEnum.Central]: {
    text: "중앙회계",
    color: "CYAN",
  },
  [BudgetDivisionIncomeEnum.Incentive]: {
    text: "격려기금",
    color: "MAROON",
  },
  [BudgetDivisionIncomeEnum.Interest]: {
    text: "예금이자",
    color: "AMBER",
  },
  [BudgetDivisionIncomeEnum.School]: {
    text: "학교지원금",
    color: "ORCHID",
  },
  [BudgetDivisionIncomeEnum.Carryover]: {
    text: "이월금",
    color: "MARINE",
  },
  [BudgetDivisionIncomeEnum.Department]: {
    text: "과비",
    color: "MELON",
  },
  [BudgetDivisionIncomeEnum.Organizational]: {
    text: "단비",
    color: "MELON",
  },
  [BudgetDivisionIncomeEnum.External]: {
    text: "외부지원금",
    color: "LEMON",
  },
  [BudgetDivisionIncomeEnum.Extra]: {
    text: "기타수익금",
    color: "LEMON",
  },
  [BudgetDivisionIncomeEnum.CAC]: {
    text: "문화자치기금",
    color: "TEAL",
  },
};

export const budgetDivisionExpenseTagList: {
  [key in BudgetDivisionExpenseEnum]: StatusDetail;
} = {
  [BudgetDivisionExpenseEnum.Operating]: {
    text: "운영비",
    color: "CHERRY",
  },
  [BudgetDivisionExpenseEnum.Regular]: {
    text: "정기사업비",
    color: "MARINE",
  },
  [BudgetDivisionExpenseEnum.New]: {
    text: "비정기사업비",
    color: "LEMON",
  },
};

export const budgetClassExpenseTagList: {
  [key in BudgetClassExpenseEnum]: DarkStatusDetail;
} = {
  [BudgetClassExpenseEnum.Product]: {
    text: "상품비",
    color: "MELON",
  },
  [BudgetClassExpenseEnum.Gift]: {
    text: "증정비",
    color: "MELON",
  },
  [BudgetClassExpenseEnum.Supply]: {
    text: "물품비",
    color: "MELON",
  },
  [BudgetClassExpenseEnum.Print]: {
    text: "인쇄비",
    color: "MARINE",
  },
  [BudgetClassExpenseEnum.Transport]: {
    text: "출장비",
    color: "CYAN",
  },
  [BudgetClassExpenseEnum.Meeting]: {
    text: "회의비",
    color: "ORCHID",
  },
  [BudgetClassExpenseEnum.Labor]: {
    text: "인건비",
    color: "CYAN",
  },
  [BudgetClassExpenseEnum.Welfare]: {
    text: "복리후생비",
    color: "ORCHID",
  },
  [BudgetClassExpenseEnum.Install]: {
    text: "설치비",
    color: "MARINE",
  },
  [BudgetClassExpenseEnum.Delivery]: {
    text: "운반비",
    color: "MARINE",
  },
  [BudgetClassExpenseEnum.Repair]: {
    text: "수선비",
    color: "MARINE",
  },
  [BudgetClassExpenseEnum.Telecom]: {
    text: "통신비",
    color: "MARINE",
  },
  [BudgetClassExpenseEnum.Insurance]: {
    text: "보험료",
    color: "CYAN",
  },
  [BudgetClassExpenseEnum.Extra]: {
    text: "기타비",
    color: "LEMON",
  },
  [BudgetClassExpenseEnum.Backup]: {
    text: "예비비",
    color: "LEMON",
  },
  [BudgetClassExpenseEnum.Incentive]: {
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

export const getbudgetRatioTag = (ratio: number | null) => {
  if (ratio === null) {
    return { color: "GRAY", text: `-` };
  }
  if (ratio > 100) {
    return { color: "CHERRY", text: `${ratio.toFixed(2)}%` };
  }
  if (ratio <= 100) {
    return { color: "THISTLE", text: `${ratio.toFixed(2)}%` };
  }
  return { color: "GRAY", text: `-` };
};

export const getbudgetStatusTag = (type: string) => {
  switch (type) {
    case "승인":
      return { color: "BLUE", text: type };
    case "반려":
      return { color: "RED700", text: type };
    case "사후승인":
      return { color: "TEAL", text: type };
    case "검토승인":
      return { color: "CYAN", text: type };
    case "검토반려":
      return { color: "RED500", text: type };
    case "추가경정":
      return { color: "CYAN", text: type };
    case "검토중":
      return { color: "MELON", text: type };
    case "수정 요청":
      return { color: "LEMON", text: type };
    case "임시저장":
      return { color: "ORCHID", text: type };
    case "미저장":
      return { color: "YELLOW", text: type };
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

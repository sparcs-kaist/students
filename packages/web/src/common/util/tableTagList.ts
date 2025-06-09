/* eslint-disable import/no-relative-packages */
/* eslint-disable no-restricted-imports */
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/budget.enum";
import {
  DarkStatusDetail,
  StatusDetail,
} from "@sparcs-students/web/utils/getTagDetail";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";

import {
  MemberRoleEnum,
  OrganizationRegisterStatusEnum,
  OrganizationRoleTypeEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";

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
  [BudgetDivisionIncomeEnum.Undefined]: {
    text: "-",
    color: "GRAY",
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
  [BudgetDivisionExpenseEnum.Undefined]: {
    text: "-",
    color: "GRAY",
  },
};

export const budgetClassExpenseTagList: {
  [key in BudgetClassExpenseEnum]: DarkStatusDetail | StatusDetail;
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
  [BudgetClassExpenseEnum.Undefined]: {
    text: "-",
    color: "GRAY",
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

export const getbudgetStatusTag = (type: DocumentReviewStatusEnum) => {
  switch (
    type // TODO: enum
  ) {
    case DocumentReviewStatusEnum.Accepted:
      return { color: "BLUE", text: "승인" };
    case DocumentReviewStatusEnum.Rejected:
      return { color: "RED700", text: "반려" };
    case DocumentReviewStatusEnum.LateAccepted:
      return { color: "TEAL", text: "사후승인" };
    case DocumentReviewStatusEnum.ReviewAccepted:
      return { color: "CYAN", text: "검토승인" };
    case DocumentReviewStatusEnum.ReviewRejected:
      return { color: "RED500", text: "검토반려" };
    case DocumentReviewStatusEnum.Revised:
      return { color: "CYAN", text: "추가경정" };
    case DocumentReviewStatusEnum.Progress:
      return { color: "MELON", text: "검토중" };
    case DocumentReviewStatusEnum.ReviseNeeded:
      return { color: "LEMON", text: "수정요청" };
    case DocumentReviewStatusEnum.Draft:
      return { color: "ORCHID", text: "임시저장" };
    case DocumentReviewStatusEnum.Unsaved:
      return { color: "YELLOW", text: "미저장" };
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

export const getOrgainizationRoleTag = (type: OrganizationRoleTypeEnum) => {
  switch (type) {
    case OrganizationRoleTypeEnum.Chief:
      return { color: "GREEN800", text: "대표자" };
    case OrganizationRoleTypeEnum.Vice:
      return { color: "GREEN600", text: "부대표자" };
    case OrganizationRoleTypeEnum.BudgetManager:
      return { color: "GREEN300", text: "예결산 편집자" };
    case OrganizationRoleTypeEnum.Member:
      return { color: "GREEN100", text: "부원" };
    case OrganizationRoleTypeEnum.Commissioner:
      return { color: "GREEN100", text: "위원" };
    case OrganizationRoleTypeEnum.Director:
      return { color: "GREEN600", text: "부서장" };
    case OrganizationRoleTypeEnum.Chair:
      return { color: "GREEN600", text: "위원장" };
    default:
      return { color: "GRAY", text: type };
  }
};

export const getOrganizationRegisterStatusTag = (
  type: OrganizationRegisterStatusEnum,
) => {
  switch (type) {
    case OrganizationRegisterStatusEnum.Progress:
      return { color: "MELON", text: "임기 진행 중" };
    case OrganizationRegisterStatusEnum.Rejected:
      return { color: "MAROON", text: "등록 거절" };
    case OrganizationRegisterStatusEnum.Pending:
      return { color: "LEMON", text: "등록 대기 중" };
    case OrganizationRegisterStatusEnum.Completed:
      return { color: "CYAN", text: "임기 종료" };
    default:
      return { color: "GRAY", text: type };
  }
};

export const memberRoleTagList: {
  [key in MemberRoleEnum]: StatusDetail;
} = {
  [MemberRoleEnum.Chief]: {
    text: "대표자",
    color: "GREEN800",
  },
  [MemberRoleEnum.Vice]: {
    text: "부대표자",
    color: "GREEN600",
  },
  [MemberRoleEnum.Editor]: {
    text: "예결산 편집자",
    color: "GREEN300",
  },
  [MemberRoleEnum.Member]: {
    text: "부원",
    color: "GREEN100",
  },
};

export const getMemberTag = (role: number) => {
  // TODO: change to enum
  switch (role) {
    case 0: // 대표자
      return { color: "GREEN800", text: "대표자" };
    case 1: // 부대표자
      return { color: "GREEN600", text: "부대표자" };
    case 2: // 예결산 편집자
      return { color: "GREEN300", text: "예결산 편집자" };
    default: // 부원
      return { color: "GREEN100", text: "부원" };
  }
};

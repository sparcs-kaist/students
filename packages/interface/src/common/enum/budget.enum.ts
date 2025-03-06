// 예산 영역 E
export enum BudgetDomainEnum {
  Student = 1, // 학생회비
  School, // 본회계
  Autonomous, // 자치
  Undefined, // not defined!
}

// 예산 구분(수입) E
export enum BudgetDivisionIncomeEnum {
  Substratum = 1, // 기층기구회계
  Central, // 중앙회계
  Incentive, // 격려기금
  Interest, // 예금이자
  School, // 학교지원금
  Carryover, // 이월금
  Department, // 과비
  Organizational, // 단비
  External, // 외부지원금
  Extra, // 기타수익금
  CAC, // 문화자치기금
  Undefined,
}

// 예산 구분(지출) E
export enum BudgetDivisionExpenseEnum {
  Operating = 1, // 운영비
  Regular, // 정기사업비
  New, // 비정기사업비
}

// 예산 클래스 E
export enum BudgetClassExpenseEnum {
  Product = 1, // 상품비
  Gift, // 증정비
  Supply, // 물품비
  Print, // 인쇄비
  Transport, // 출장비
  Meeting, // 회의비
  Labor, // 인건비
  Welfare, // 복리후생비
  Install, // 설치비
  Delivery, // 운반비
  Repair, // 수선비
  Telecom, // 통신비
  Insurance, // 보험료
  Extra, // 기타비
  Backup, // 예비비
  Incentive, // 격려금
}

export enum BudgetDivisionIncomeItemEnum { // 예산 항목
  SubstratumSubsidy = 1, // 기층기구회계 지원금
  SubstratumCarryover, // 기층기구회계 이월금
  CentralSubsidy, // 중앙회계 지원금
  CentralCarryover, // 중앙회계 이월금
  Incentive, // 격려금
  SchoolSubsidy, // 학생지원팀 지원금
  Carryover, // 이월금
  Department, // 과비
  Organizational, // 단비
}

// 거래 유형 E
export enum TransactionTypeEnum {
  OfficialCard = 1, // 공금카드
  Bank, // 계좌이체
  Cash, // 현금거래
  PrivateCard, // 개인카드
  Personal, // 사비집행
}

// 보고서 파일 유형 E
export enum ReportFileTypeEnum {
  Receipt = 1, // 영수증
  CardPayment, // 카드매출전표
  Withdrawal, // 출금명세서
  Cash, // 현금영수증
  BankTransfer, // 개인/법인통장 이체명세서
}

// BudgetDomainE
export const getDisplayNameBudgetDomainEnum = (
  type: BudgetDomainEnum | undefined,
) => {
  switch (type) {
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

export const getEnumBudgetDomain = (type: string | undefined) => {
  switch (type) {
    case "학생회비":
      return BudgetDomainEnum.Student;
    case "본회계":
      return BudgetDomainEnum.School;
    case "자치":
      return BudgetDomainEnum.Autonomous;
    default:
      return BudgetDomainEnum.Undefined;
  }
};

// BudgetDivisionIncomeE
export const getDisplayNameBudgetDivisionIncomeEnum = (
  type: BudgetDivisionIncomeEnum | undefined,
) => {
  switch (type) {
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

// BudgetDivisionExpenseE
export const getDisplayNameBudgetDivisionExpenseEnum = (
  type: BudgetDivisionExpenseEnum | undefined,
) => {
  switch (type) {
    case BudgetDivisionExpenseEnum.Operating:
      return "운영비";
    case BudgetDivisionExpenseEnum.Regular:
      return "정기사업비";
    case BudgetDivisionExpenseEnum.New:
      return "비정기사업비";
    default:
      return "";
  }
};

// BudgetClassExpenseE
export const getDisplayNameBudgetClassExpenseEnum = (
  type: BudgetClassExpenseEnum | undefined,
) => {
  switch (type) {
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

// TransactionTypeE
export const getDisplayNameTransactionTypeEnum = (
  type: TransactionTypeEnum | undefined,
) => {
  switch (type) {
    case TransactionTypeEnum.OfficialCard:
      return "공금카드";
    case TransactionTypeEnum.Bank:
      return "계좌이체";
    case TransactionTypeEnum.Cash:
      return "현금거래";
    case TransactionTypeEnum.PrivateCard:
      return "개인카드";
    case TransactionTypeEnum.Personal:
      return "사비집행";
    default:
      return "";
  }
};

// ReportFileTypeE
export const getDisplayNameReportFileTypeEnum = (
  type: ReportFileTypeEnum | undefined,
) => {
  switch (type) {
    case ReportFileTypeEnum.Receipt:
      return "영수증";
    case ReportFileTypeEnum.CardPayment:
      return "카드매출전표";
    case ReportFileTypeEnum.Withdrawal:
      return "출금명세서";
    case ReportFileTypeEnum.Cash:
      return "현금영수증";
    case ReportFileTypeEnum.BankTransfer:
      return "개인/법인통장 이체명세서";
    default:
      return "";
  }
};

export const getDisplayNameBudgetDivisionIncomeItemEnum = (
  type: BudgetDivisionIncomeItemEnum | undefined,
) => {
  switch (type) {
    case BudgetDivisionIncomeItemEnum.SubstratumSubsidy:
      return "기층기구회계 지원금";
    case BudgetDivisionIncomeItemEnum.SubstratumCarryover:
      return "기층기구회계 이월금";
    case BudgetDivisionIncomeItemEnum.CentralSubsidy:
      return "중앙회계 지원금";
    case BudgetDivisionIncomeItemEnum.CentralCarryover:
      return "중앙회계 이월금";
    case BudgetDivisionIncomeItemEnum.Incentive:
      return "격려금";
    case BudgetDivisionIncomeItemEnum.SchoolSubsidy:
      return "학생지원팀 지원금";
    case BudgetDivisionIncomeItemEnum.Carryover:
      return "이월금";
    case BudgetDivisionIncomeItemEnum.Department:
      return "과비";
    case BudgetDivisionIncomeItemEnum.Organizational:
      return "단비";
    default:
      return "";
  }
};

export interface DomainItemSelectItem {
  label: string;
  value: BudgetDivisionIncomeItemEnum;
}

export const BudgetDivisionIncomeItemEnumList = [
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(1),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(1),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(2),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(2),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(3),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(3),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(4),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(4),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(5),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(5),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(6),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(6),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(7),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(7),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(8),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(8),
  },
  {
    label: getDisplayNameBudgetDivisionIncomeItemEnum(9),
    value: getDisplayNameBudgetDivisionIncomeItemEnum(9),
  },
];

// 예산 영역 E
export enum BudgetDomainE {
  Student = 1, // 학생회비
  School, // 본회계
  Autonomous, // 자치
}

// 예산 구분(수입) E
export enum BudgetDivisionIncomeE {
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
}

// 예산 구분(지출) E
export enum BudgetDivisionExpenseE {
  Operating = 1, // 운영비
  Regular, // 정기사업비
  New, // 비정기사업비
}

// 예산 클래스 E
export enum BudgetClassExpenseE {
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

// 거래 유형 E
export enum TransactionTypeE {
  OfficialCard = 1, // 공금카드
  Bank, // 계좌이체
  Cash, // 현금거래
  PrivateCard, // 개인카드
  Personal, // 사비집행
}

// 보고서 파일 유형 E
export enum ReportFileTypeE {
  Receipt = 1, // 영수증
  CardPayment, // 카드매출전표
  Withdrawal, // 출금명세서
  Cash, // 현금영수증
  BankTransfer, // 개인/법인통장 이체명세서
}

// BudgetDomainE
export const getDisplayNameBudgetDomainE = (
  type: BudgetDomainE | undefined,
) => {
  switch (type) {
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

// BudgetDivisionIncomeE
export const getDisplayNameBudgetDivisionIncomeE = (
  type: BudgetDivisionIncomeE | undefined,
) => {
  switch (type) {
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

// BudgetDivisionExpenseE
export const getDisplayNameBudgetDivisionExpenseE = (
  type: BudgetDivisionExpenseE | undefined,
) => {
  switch (type) {
    case BudgetDivisionExpenseE.Operating:
      return "운영비";
    case BudgetDivisionExpenseE.Regular:
      return "정기사업비";
    case BudgetDivisionExpenseE.New:
      return "비정기사업비";
    default:
      return "";
  }
};

// BudgetClassExpenseE
export const getDisplayNameBudgetClassExpenseE = (
  type: BudgetClassExpenseE | undefined,
) => {
  switch (type) {
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

// TransactionTypeE
export const getDisplayNameTransactionTypeE = (
  type: TransactionTypeE | undefined,
) => {
  switch (type) {
    case TransactionTypeE.OfficialCard:
      return "공금카드";
    case TransactionTypeE.Bank:
      return "계좌이체";
    case TransactionTypeE.Cash:
      return "현금거래";
    case TransactionTypeE.PrivateCard:
      return "개인카드";
    case TransactionTypeE.Personal:
      return "사비집행";
    default:
      return "";
  }
};

// ReportFileTypeE
export const getDisplayNameReportFileTypeE = (
  type: ReportFileTypeE | undefined,
) => {
  switch (type) {
    case ReportFileTypeE.Receipt:
      return "영수증";
    case ReportFileTypeE.CardPayment:
      return "카드매출전표";
    case ReportFileTypeE.Withdrawal:
      return "출금명세서";
    case ReportFileTypeE.Cash:
      return "현금영수증";
    case ReportFileTypeE.BankTransfer:
      return "개인/법인통장 이체명세서";
    default:
      return "";
  }
};

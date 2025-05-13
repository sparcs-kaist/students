import { TimelineDateTypeEnum } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectTimelineData";
import { DBExpenditureProps } from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";

export enum DocumentTypeEnum {
  BudgetProposal = 1,
  BudgetReport,
  ProjectProposal,
  ProjectReport,
}

export interface ProjectDate {
  value: [Date | null, Date | null];
  type: TimelineDateTypeEnum | undefined;
}

// 사업 계획서와 사업 계획서 상세 페이지에 들어가는 정보
export interface ProjectProposalContent {
  id: number; // id
  contentId: number; // 같은 documentUniqueId 내의 여러 상세 페이지 중의 id
  title: string; // 사업명
  brief: string; // 사업 개요
  preparationPeriod: ProjectDate; // 사업 준비 기간
  executionPeriod: ProjectDate; // 사업 일시
  manager: {
    teamId: number; // 담당 부서 id
    member: number; // 담당자 userId
  };
  purpose: string; // 사업 추진 목적
  beneficiary: string; // 사업 수혜 대상자
  detail: string; // 세부 사업 내용
  timelineIds: number[]; // 사업 진행 타임라인 id의 배열
  expenditure: number[]; // 사업 계획서에 편성된 예산안 row의 id 배열
}

export interface ProjectProposal {
  documentUniqueId: number; // 분기, 문서 유형, 단체 조합의 고유한 id
  documentTypeEnumId: DocumentTypeEnum; // 문서 4개 중 1개
  contentIds: number[]; // ProjectProposalContentId의 배열
}

export interface ProposalFormValues {
  proposalDetail: ProjectProposalContent;
  expenditures: DBExpenditureProps[];
}

export interface ProjectProposalDetailTotalReview {
  // 사업계획서 검토 내역
  id: number;
  projectProposalContentId: number; // 해당 리뷰와 연결된 사업계획서 상세
  reviewText: string;
  reviewStatus: DocumentReviewStatusEnum;
}

export interface ProjectReportContent {
  id: number; // id
  contentId: number; // 같은 documentUniqueId 내의 여러 상세 페이지 중의 id
  title: string; // 사업명
  brief: string; // 사업 개요
  preparationPeriod: ProjectDate; // 사업 준비 기간
  executionPeriod: ProjectDate; // 사업 일시
  manager: {
    teamId: number; // 담당 부서 id
    member: number; // 담당자 userId
  };
  detail: string; // 세부 사업 내용
  participation: string; // 사업 참여도
  result: string; // 사업 성과
  todo: string; // 미달 목표
  comment: string; // 제언
  timelineIds: number[]; // 사업 진행 타임라인 id의 배열
  expenditure: number[]; // 사업 계획서에 편성된 예산안 row의 id 배열
}

export interface ReportFormValues {
  reportDetail: ProjectReportContent;
  expenditures: DBExpenditureProps[];
}

export interface ProjectReportDetailTotalReview {
  // 사업보고서 검토 내역
  id: number;
  projectReportContentId: number; // 해당 리뷰와 연결된 사업보고서 상세
  reviewText: string;
  reviewStatus: DocumentReviewStatusEnum;
}

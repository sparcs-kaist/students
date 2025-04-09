// 권한 E
export enum AssistantPermissionEnum {
  President = 1, // 총학회장
  COC, // 중운위원
  GSRC, // 전학대의원
  UA, // 총학중집
  BAI, // 감사원
}

// 안건 상태 E
export enum AgendaAcceptedStatusEnum {
  Accepted = 1, // 승인
  Rejected, // 반려
  ReviseNeeded, // 수정요청
  Progress, // 검토중
  LateAccepted, // 사후승인
}

// Document Review Status E
export enum DocumentReviewStatusEnum {
  Accepted = 1, // 승인
  Rejected, // 반려
  ReviseNeeded, // 수정요청
  Progress, // 검토중
  LateAccepted, // 사후승인
  ReviewRejected, // 검토반려
  ReviewAccepted, // 검토승인
  Unsaved, // 미저장
  Draft, // 임시저장
  Revised, // 추가경정
}

// AssistantPermissionE
export const getDisplayNameAssistantPermissionEnum = (
  type: AssistantPermissionEnum | undefined,
) => {
  switch (type) {
    case AssistantPermissionEnum.President:
      return "총학회장";
    case AssistantPermissionEnum.COC:
      return "중운위원";
    case AssistantPermissionEnum.GSRC:
      return "전학대의원";
    case AssistantPermissionEnum.UA:
      return "총학중집";
    case AssistantPermissionEnum.BAI:
      return "감사원";
    default:
      return "";
  }
};

// AgendaAcceptedStatusE
export const getDisplayNameAgendaAcceptedStatusEnum = (
  type: AgendaAcceptedStatusEnum | undefined,
) => {
  switch (type) {
    case AgendaAcceptedStatusEnum.Accepted:
      return "승인";
    case AgendaAcceptedStatusEnum.Rejected:
      return "반려";
    case AgendaAcceptedStatusEnum.ReviseNeeded:
      return "수정요청";
    case AgendaAcceptedStatusEnum.Progress:
      return "검토중";
    case AgendaAcceptedStatusEnum.LateAccepted:
      return "사후승인";
    default:
      return "";
  }
};

// Document Review Status E
export const getDisplayNameDocumentReviewStatusEnum = (
  status: DocumentReviewStatusEnum | undefined,
): string => {
  switch (status) {
    case DocumentReviewStatusEnum.Accepted:
      return "승인";
    case DocumentReviewStatusEnum.Rejected:
      return "반려";
    case DocumentReviewStatusEnum.ReviseNeeded:
      return "수정요청";
    case DocumentReviewStatusEnum.Progress:
      return "검토중";
    case DocumentReviewStatusEnum.LateAccepted:
      return "사후승인";
    case DocumentReviewStatusEnum.ReviewRejected:
      return "검토반려";
    case DocumentReviewStatusEnum.ReviewAccepted:
      return "검토승인";
    case DocumentReviewStatusEnum.Unsaved:
      return "미저장";
    case DocumentReviewStatusEnum.Draft:
      return "임시저장";
    case DocumentReviewStatusEnum.Revised:
      return "추가경정";
    default:
      return "";
  }
};

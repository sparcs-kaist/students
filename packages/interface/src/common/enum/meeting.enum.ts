// 권한 E
export enum AssistantPermissionE {
  President = 1, // 총학회장
  COC, // 중운위원
  GSRC, // 전학대의원
  UA, // 총학중집
  BAI, // 감사원
}

// 안건 상태 E
export enum AgendaAcceptedStatusE {
  Accepted = 1, // 승인
  Reject, // 반려
  Revision, // 수정요청
  Progress, // 검토중
  Post, // 사후승인
}

// AssistantPermissionE
export const getDisplayNameAssistantPermissionE = (
  type: AssistantPermissionE | undefined,
) => {
  switch (type) {
    case AssistantPermissionE.President:
      return "총학회장";
    case AssistantPermissionE.COC:
      return "중운위원";
    case AssistantPermissionE.GSRC:
      return "전학대의원";
    case AssistantPermissionE.UA:
      return "총학중집";
    case AssistantPermissionE.BAI:
      return "감사원";
    default:
      return "";
  }
};

// AgendaAcceptedStatusE
export const getDisplayNameAgendaAcceptedStatusE = (
  type: AgendaAcceptedStatusE | undefined,
) => {
  switch (type) {
    case AgendaAcceptedStatusE.Accepted:
      return "승인";
    case AgendaAcceptedStatusE.Reject:
      return "반려";
    case AgendaAcceptedStatusE.Revision:
      return "수정요청";
    case AgendaAcceptedStatusE.Progress:
      return "검토중";
    case AgendaAcceptedStatusE.Post:
      return "사후승인";
    default:
      return "";
  }
};

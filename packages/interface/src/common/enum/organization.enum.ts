// 조직 유형 E
export enum OrganizationTypeEnum {
  UAPresidents = 1, // 학부 총학생회장단
  CentralExecutive, // 중앙집행위원회
  Autonomous, // 자치기구
  Standing, // 상설위원회
  Specialized, // 전문기구
  Special, // 특별기구
  StudentCouncil, // 학과학생회
  Preparatory, // 준비위원회
  Affairs, // 특임위원회
  Inspect, // 조사위원회
}

// 조직 대표 유형 E
export enum OrganizationPresidentTypeEnum {
  Chief = 1, // 정
  Vice, // 부
}

export enum OrganizationStateEnum {
  Regular = 1, // 정규
  Emergency, // 비대위
}

export enum OrganizationRoleTypeEnum {
  Chief = 1, // 대표자
  Vice, // 부대표자
  BudgetManager, // 예결산편집자
  Member, // 부원
  Commissioner, // 위원
  Director, // 부서장
  Chair, // 위원장
}

export enum OrganizationRegisterStatusEnum {
  Progress = 1, // 임기 진행 중
  Rejected, // 등록 거절
  Pending, // 등록 대기 중
  Completed, // 임기 종료
}

export enum MemberRoleEnum {
  Chief = 1,
  Vice,
  Editor,
  Member,
}

export const getMemberRoleEnum = (type: MemberRoleEnum | undefined) => {
  switch (type) {
    case MemberRoleEnum.Chief:
      return "대표자";
    case MemberRoleEnum.Vice:
      return "부대표자";
    case MemberRoleEnum.Editor:
      return "예결산 편집자";
    case MemberRoleEnum.Member:
      return "부원";
    default:
      return "";
  }
};

// OrganizationTypeE
export const getDisplayNameOrganizationTypeEnum = (
  type: OrganizationTypeEnum | undefined,
) => {
  switch (type) {
    case OrganizationTypeEnum.UAPresidents:
      return "총학생회장단";
    case OrganizationTypeEnum.CentralExecutive:
      return "중앙집행위원회";
    case OrganizationTypeEnum.Autonomous:
      return "자치기구";
    case OrganizationTypeEnum.Standing:
      return "상설위원회";
    case OrganizationTypeEnum.Specialized:
      return "전문기구";
    case OrganizationTypeEnum.Special:
      return "특별기구";
    case OrganizationTypeEnum.StudentCouncil:
      return "학과학생회";
    case OrganizationTypeEnum.Preparatory:
      return "준비위원회";
    case OrganizationTypeEnum.Affairs:
      return "특임위원회";
    case OrganizationTypeEnum.Inspect:
      return "조사위원회";
    default:
      return "";
  }
};

// OrganizationPresidentTypeE
export const getDisplayNameOrganizationPresidentTypeEnum = (
  type: OrganizationPresidentTypeEnum | undefined,
) => {
  switch (type) {
    case OrganizationPresidentTypeEnum.Chief:
      return "정";
    case OrganizationPresidentTypeEnum.Vice:
      return "부";
    default:
      return "";
  }
};

export const getDisplayNameOrganizationRegisterStatusEnum = (
  type: OrganizationRegisterStatusEnum | undefined,
) => {
  switch (type) {
    case OrganizationRegisterStatusEnum.Progress:
      return "임기 진행 중";
    case OrganizationRegisterStatusEnum.Rejected:
      return "등록 거절";
    case OrganizationRegisterStatusEnum.Pending:
      return "등록 대기 중";
    case OrganizationRegisterStatusEnum.Completed:
      return "임기 종료";
    default:
      return "";
  }
};

export const getDisplayNameOrganizationRoleTypeEnum = (
  type: OrganizationRoleTypeEnum | undefined,
) => {
  switch (type) {
    case OrganizationRoleTypeEnum.Chief:
      return "대표자";
    case OrganizationRoleTypeEnum.Vice:
      return "부대표자";
    case OrganizationRoleTypeEnum.BudgetManager:
      return "예결산 편집자";
    case OrganizationRoleTypeEnum.Member:
      return "부원";
    case OrganizationRoleTypeEnum.Commissioner:
      return "위원";
    case OrganizationRoleTypeEnum.Director:
      return "부서장";
    case OrganizationRoleTypeEnum.Chair:
      return "위원장";
    default:
      return "";
  }
};

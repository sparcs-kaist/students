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

export enum MemberRegistrationEnum {
  NotReviewed = 1,
  Approved,
  Rejected,
}

export const getMemberRegistrationEnum = (
  type: MemberRegistrationEnum | undefined,
) => {
  switch (type) {
    case MemberRegistrationEnum.NotReviewed:
      return "미검토";
    case MemberRegistrationEnum.Approved:
      return "승인됨";
    case MemberRegistrationEnum.Rejected:
      return "반려됨";
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

export enum CommitteeRoleEnum {
  Chief = 1,
  Member,
}

// 조직 유형 E
export enum OrganizationTypeE {
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
export enum OrganizationPresidentTypeE {
  Chief = 1, // 정
  Vice, // 부
}

export enum OrganizationStateE {
  Regular = 1, // 정규
  Emergency, // 비대위
}

// OrganizationTypeE
export const getDisplayNameOrganizationTypeE = (
  type: OrganizationTypeE | undefined,
) => {
  switch (type) {
    case OrganizationTypeE.UAPresidents:
      return "총학생회장단";
    case OrganizationTypeE.CentralExecutive:
      return "중앙집행위원회";
    case OrganizationTypeE.Autonomous:
      return "자치기구";
    case OrganizationTypeE.Standing:
      return "상설위원회";
    case OrganizationTypeE.Specialized:
      return "전문기구";
    case OrganizationTypeE.Special:
      return "특별기구";
    case OrganizationTypeE.StudentCouncil:
      return "학과학생회";
    case OrganizationTypeE.Preparatory:
      return "준비위원회";
    case OrganizationTypeE.Affairs:
      return "특임위원회";
    case OrganizationTypeE.Inspect:
      return "조사위원회";
    default:
      return "";
  }
};

// OrganizationPresidentTypeE
export const getDisplayNameOrganizationPresidentTypeE = (
  type: OrganizationPresidentTypeE | undefined,
) => {
  switch (type) {
    case OrganizationPresidentTypeE.Chief:
      return "정";
    case OrganizationPresidentTypeE.Vice:
      return "부";
    default:
      return "";
  }
};

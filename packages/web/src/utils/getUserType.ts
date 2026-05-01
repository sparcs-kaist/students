import {
  UserRoleEnum,
  UserTypeEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/user.enum";

export const getUserType = (type: UserTypeEnum | string) => {
  switch (type) {
    case UserTypeEnum.Undergraduate:
    case "undergraduate":
      return "학부생";
    case UserTypeEnum.Others:
    case "others":
      return "일반 회원";
    case "Student":
    case "student":
      return "학생";
    default:
      return "None";
  }
};

export const getUserRole = (type: UserRoleEnum | string) => {
  switch (type) {
    case UserRoleEnum.Representative:
    case "representative":
      return "대표자";
    case UserRoleEnum.Manager:
    case "manager":
      return "매니저";
    case UserRoleEnum.Member:
    case "member":
      return "회원";
    case UserRoleEnum.Viewer:
    case "viewer":
      return "뷰어";
    default:
      return "None";
  }
};

/** SPARCS-style multi-profile bucket keys (see AuthContext cookie handling). */
export const getProfileBucketLabel = (key: string): string => {
  switch (key) {
    case "professor":
      return "교수";
    case "doctor":
      return "박사";
    case "master":
      return "석사";
    case "undergraduate":
      return "학부";
    case "employee":
      return "직원";
    case "executive":
      return "임원";
    default:
      return getUserRole(key);
  }
};

import {
  UserRoleEnum,
  UserTypeEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/user.enum";

export const getUserType = (type: UserTypeEnum | string) => {
  switch (type) {
    case UserTypeEnum.Undergraduate || "undergraduate":
      return "학부생";
    case UserTypeEnum.Others || "others":
      return "일반 회원"; // CHACHA: 임의로 명명
    default:
      return "None";
  }
};

export const getUserRole = (type: UserTypeEnum | string) => {
  switch (type) {
    // CHACHA: 일단 Students 세계의 권한으로 명명
    case UserRoleEnum.Representative || "representative":
      return "대표자";
    case UserRoleEnum.Manager || "manager":
      return "매니저";
    case UserRoleEnum.Member || "member":
      return "회원";
    case UserRoleEnum.Viewer || "viewer":
      return "뷰어";
    default:
      return "None";
  }
};

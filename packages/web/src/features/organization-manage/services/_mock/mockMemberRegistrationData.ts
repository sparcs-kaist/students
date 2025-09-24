import {
  MemberRegistrationEnum,
  MemberRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum";

export const MockMemberRegistrationData = [
  {
    id: 1,
    studentNumber: 20220001,
    name: "박정원",
    role: MemberRoleEnum.Member,
    status: MemberRegistrationEnum.NotReviewed,
  },
  {
    id: 2,
    studentNumber: 20220001,
    name: "박정원",
    role: MemberRoleEnum.Vice,
    status: MemberRegistrationEnum.Approved,
  },
  {
    id: 3,
    studentNumber: 20220001,
    name: "박정원",
    role: MemberRoleEnum.Member,
    status: MemberRegistrationEnum.Rejected,
  },
];

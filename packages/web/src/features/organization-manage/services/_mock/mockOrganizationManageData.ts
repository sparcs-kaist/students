import { OrganizationMemberProps } from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
import { CommitteeProps } from "@sparcs-students/web/features/organization-manage/components/ManageCommitteeTable";
import {
  MemberRoleEnum,
  CommitteeRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";

export const mockOrganizationMemberData: OrganizationMemberProps[] = [
  {
    id: 1,
    studentId: "20220000",
    name: "박정원",
    role: MemberRoleEnum.Chief,
    startDate: "2025-05-22",
    endDate: "2025-12-31",
  },
  {
    id: 2,
    studentId: "20220000",
    name: "박정원",
    role: MemberRoleEnum.Vice,
    startDate: "2025-05-22",
    endDate: "2025-12-31",
  },
  {
    id: 3,
    studentId: "20220000",
    name: "박정원",
    role: MemberRoleEnum.Member,
    startDate: "2025-05-22",
    endDate: "2025-12-31",
  },
];

export const mockCommitteeListData: CommitteeProps[] = [
  {
    id: "1",
    name: "간식이벤트",
    leader: "박정민",
    headcount: 5,
  },
  {
    id: "2",
    name: "스튜던츠",
    leader: "김스튜",
    headcount: 7,
  },
  {
    id: "3",
    name: "스팍스",
    leader: "김팍스",
    headcount: 18,
  },
];

export const mockCommitteeMemberData: OrganizationMemberProps[] = [
  {
    id: 1,
    studentId: "20210000",
    name: "박정민",
    role: CommitteeRoleEnum.Chief,
    startDate: "2025-05-22",
    endDate: "2025-12-31",
  },
  {
    id: 2,
    studentId: "20210000",
    name: "박정민",
    role: CommitteeRoleEnum.Member,
    startDate: "2025-05-22",
    endDate: "2025-12-31",
  },
];

import { OrganizationMemberProps } from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
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

export const mockAnotherCommitteeMemberData: OrganizationMemberProps[] = [
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
  {
    id: 3,
    studentId: "20210000",
    name: "박정민",
    role: CommitteeRoleEnum.Member,
    startDate: "2025-05-22",
    endDate: "2025-12-31",
  },
];

export type OrganizationMemberTableType = {
  id: number;
  name: string;
  OrganizationMember: OrganizationMemberProps[];
};

export const mockCommitteeMemberTableData: OrganizationMemberTableType[] = [
  { id: 1, name: "운영위원회", OrganizationMember: mockCommitteeMemberData },
  {
    id: 2,
    name: "확대운영위원회",
    OrganizationMember: mockAnotherCommitteeMemberData,
  },
];

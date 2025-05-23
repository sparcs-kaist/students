import { OrganizationMemberProps } from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
import { MemberRoleEnum } from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";

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

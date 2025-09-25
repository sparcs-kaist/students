import { CommitteeProps } from "@sparcs-students/web/features/organization-manage/components/ManageCommitteeTable";
import {
  MemberRoleEnum,
  CommitteeRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";

type RoleEnumType = MemberRoleEnum | CommitteeRoleEnum;

interface OrganizationMemberProps {
  id: number;
  studentId: string;
  name: string;
  role: RoleEnumType; // TODO: change to real enum
  startDate: string;
  endDate: string;
}

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

export const organizationName = "전산학부 학생회";

export const mockCommitteeListData: CommitteeProps[] = [
  {
    id: 1,
    name: "간식이벤트",
    leader: "박정민",
    headcount: 5,
    description: `
    전산학부 간식 이벤트 팀은 학부 구성원들의 학업 스트레스를 줄이고, 즐거운 학과 문화를 조성하기 위해 다양한 간식 행사를 기획·운영하는 팀입니다.
시험 기간이나 학기 중 특별한 날을 중심으로, 학생들이 잠시 쉬어갈 수 있는 간식 배부 이벤트를 준비하며, 학우들과의 소통과 교류의 장을 마련하고자 합니다.

< 주요 활동 >
1. 간식 행사 기획
- 학기 중 2~3회 간식 이벤트 주제 및 아이템 선정
- 예산 책정 및 물품 수급 계획 수립
2. 홍보 및 참여 유도
- 포스터, SNS 등을 활용한 홍보
- 참여 유도 게임 또는 이벤트 구성
3.행사 운영 및 피드백 수집
- 당일 현장 운영 및 간식 배부
- 만족도 조사 등 피드백 수집 및 개선안 논의
    `,
  },
  {
    id: 2,
    name: "스튜던츠",
    leader: "김스튜",
    headcount: 7,
    description: `
    스튜던츠 팀입니다.
    `,
  },
  {
    id: 3,
    name: "스팍스",
    leader: "김팍스",
    headcount: 18,
    description: `
    스팍스 팀입니다.
    `,
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

export const mockSearchMemberData: OrganizationMemberProps[] = [
  {
    id: 7,
    studentId: "20210000",
    name: "박정민",
    role: MemberRoleEnum.Chief,
    startDate: "2025-07-18",
    endDate: "2025-12-31",
  },
  {
    id: 18,
    studentId: "20210000",
    name: "빅정민",
    role: MemberRoleEnum.Vice,
    startDate: "2025-05-22",
    endDate: "2025-07-18",
  },
  {
    id: 718,
    studentId: "20210000",
    name: "박민정",
    role: MemberRoleEnum.Member,
    startDate: "2024-07-18",
    endDate: "2025-07-18",
  },
];

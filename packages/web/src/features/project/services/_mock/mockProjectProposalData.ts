import { ViewerProjectProposalProps } from "@sparcs-students/web/features/project/components/ViewerProjectProposalTable";
import { MemberProps } from "@sparcs-students/web/features/project/components/MemberTable";
import { OperationPlanProps } from "@sparcs-students/web/features/project/components/OperationPlan";
import { GroupProps } from "@sparcs-students/web/features/project/components/_atomic/GroupDetail";
import { ProjectProposalProps } from "@sparcs-students/web/features/project/components/ReviewerProjectProposalTable";

export const mockProjectProposalData: ProjectProposalProps[] = [
  {
    id: "1",
    name: "집행위원회 운영",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: "승인",
    review: "",
  },
  {
    id: "2",
    name: "기업체 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: "승인",
    review: "ㅁㄴㅇㄹ",
  },
  {
    id: "3",
    name: "연구실 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: "승인",
    review: "ㅁㄴㅇㄹ",
  },
];

export const mockViewerProjectProposalData: ViewerProjectProposalProps[] = [
  {
    id: "1",
    name: "집행위원회 운영",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: "승인",
  },
  {
    id: "2",
    name: "기업체 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: "승인",
  },
  {
    id: "3",
    name: "연구실 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: "승인",
  },
];

export const mockMemberListData: MemberProps[] = [
  {
    id: "20210XX4",
    name: "김스튜",
    groups: [
      "이름이 긴 부서 1",
      "어쩌구 부서 1",
      "어쩌구 부서 2",
      "어쩌구 부서 3",
    ],
  },
  {
    id: "20220XX4",
    name: "김스튜",
    groups: ["어쩌구 부서 2", "어쩌구 부서 3"],
  },
  {
    id: "20220XX4",
    name: "김스튜",
    groups: ["어쩌구 부서 1", "어쩌구 부서 2"],
  },
];

export const mockGroupListData: GroupProps[] = [
  {
    name: "어떠한 TF",
    summary: "어떠한 사업입니다.",
    members: ["김스튜", "김스팍", "김팍스"],
    projectName: "어떠한 사업",
  },
  {
    name: "어떠한 TF 2",
    summary: "어떠한 저쩌구한 사업입니다.",
    members: ["김스튜", "김스팍"],
    projectName: "어떠한 사업",
  },
  {
    name: "어떠한 TF 3",
    summary: "어떠한 저떠한 사업입니다.",
    members: ["김스튜", "김팍스"],
    projectName: "어떠한 사업",
  },
];

export const mockOperationPlanData: OperationPlanProps = {
  memberData: mockMemberListData,
  note: "어쩌구저쩌구 비고",
  groupList: mockGroupListData,
  imagePath: "chacha.jpg",
};

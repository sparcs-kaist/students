import {
  ViewerProjectProps,
  ReviewerProjectProps,
} from "@sparcs-students/web/features/project/components/ProjectTable";
import { MemberProps } from "@sparcs-students/web/features/project/components/MemberTable";
import { OperationPlanProps } from "@sparcs-students/web/features/project/components/OperationPlan";
import { GroupProps } from "@sparcs-students/web/features/project/components/_atomic/GroupDetail";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";

export const mockProjectProposalData: ReviewerProjectProps[] = [
  {
    id: "1",
    name: "집행위원회 운영",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: DocumentReviewStatusEnum.Accepted,
    review: "",
  },
  {
    id: "2",
    name: "기업체 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: DocumentReviewStatusEnum.Accepted,
    review: "ㅁㄴㅇㄹ",
  },
  {
    id: "3",
    name: "연구실 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: DocumentReviewStatusEnum.Accepted,
    review: "ㅁㄴㅇㄹ",
  },
];

export const mockViewerProjectData: ViewerProjectProps[] = [
  {
    id: "1",
    name: "집행위원회 운영",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: DocumentReviewStatusEnum.Accepted,
  },
  {
    id: "2",
    name: "기업체 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: DocumentReviewStatusEnum.Accepted,
  },
  {
    id: "3",
    name: "연구실 탐방",
    projectPeriod: "2024.09.06 - 2024.12.06",
    status: DocumentReviewStatusEnum.Accepted,
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

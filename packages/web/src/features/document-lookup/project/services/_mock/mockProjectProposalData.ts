import {
  ViewerProjectProps,
  ReviewerProjectProps,
} from "@sparcs-students/web/features/document-lookup/project/components/ProjectTable";
import { MemberProps } from "@sparcs-students/web/features/document-lookup/project/components/MemberTable";
import { OperationPlanProps } from "@sparcs-students/web/features/document-lookup/project/components/OperationPlan";
import { GroupProps } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/GroupDetail";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";

import { ProjectProposalSingleContent } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectProposalTable";

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

export function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

export const mockViewerProjectData: ViewerProjectProps[] =
  ProjectProposalSingleContent.map(content => {
    const start = content.executionPeriod.value[0];
    const end = content.executionPeriod.value[1];
    return {
      id: content.id.toString(),
      name: content.title,
      projectPeriod:
        start && end
          ? `${formatDate(start)} - ${formatDate(end)}`
          : "기간 미정",
      status: DocumentReviewStatusEnum.Accepted,
    };
  });

export const mockMemberListData: MemberProps[] = [
  {
    id: "20210XX1",
    name: "김스튜",
    groups: [
      "이름이 긴 부서 1",
      "어쩌구 부서 1",
      "어쩌구 부서 2",
      "어쩌구 부서 3",
    ],
  },
  {
    id: "20220XX2",
    name: "김스튜이",
    groups: ["어쩌구 부서 2", "어쩌구 부서 3"],
  },
  {
    id: "20220XX3",
    name: "김스튜삼",
    groups: [
      "어쩌구 부서 1",
      "어쩌구 부서 2",
      "이름이 굉장히 긴 어떤 부서 예시",
    ],
  },
  {
    id: "20220XX4",
    name: "김스튜사",
    groups: [],
  },
];

export const mockGroupListData: GroupProps[] = [
  {
    name: "이름이 긴 부서 1",
    summary: "어떠한 사업입니다.",
    members: ["김스튜"],
    projectName: "어떠한 사업",
  },
  {
    name: "어쩌구 부서 1",
    summary: "어떠한 저쩌구한 사업입니다.",
    members: ["김스튜", "김스튜삼"],
    projectName: "어떠한 사업",
  },
  {
    name: "어쩌구 부서 2",
    summary: "어떠한 저떠한 사업입니다.",
    members: ["김스튜", "김스튜이", "김스튜삼"],
    projectName: "어떠한 사업",
  },
  {
    name: "어쩌구 부서 3",
    summary: "어떠한 저떠한 사업입니다.",
    members: ["김스튜", "김스튜이"],
    projectName: "어떠한 사업",
  },
  {
    name: "이름이 굉장히 긴 어떤 부서 예시",
    summary: "어떠한 저떠한 사업입니다.",
    members: ["김스튜", "김스튜삼"],
    projectName: "어떠한 사업",
  },
];

export const mockOperationPlanData: OperationPlanProps = {
  memberData: mockMemberListData,
  note: "어쩌구저쩌구 비고",
  groupList: mockGroupListData,
  imagePath: "조직도.png",
};

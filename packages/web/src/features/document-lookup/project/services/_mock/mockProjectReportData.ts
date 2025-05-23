import {
  ReviewerProjectProps,
  ViewerProjectProps,
} from "@sparcs-students/web/features/document-lookup/project/components/ProjectTable";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import { MemberProps } from "@sparcs-students/web/features/document-lookup/project/components/MemberTable";
import { GroupProps } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/GroupDetail";
import { OperationPlanProps } from "@sparcs-students/web/features/document-lookup/project/components/OperationPlan";
import { ProjectReportSingleContent } from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectReportTable";

export const mockProjectReportData: ReviewerProjectProps[] = [
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

export const mockViewerProjectReportData: ViewerProjectProps[] =
  ProjectReportSingleContent.map(content => {
    const start = content.executionPeriod.value[0];
    const end = content.executionPeriod.value[1];
    return {
      id: content.id.toString(),
      name: content.title,
      projectPeriod:
        start && end
          ? `${formatDotDate(start)} - ${formatDotDate(end)}`
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
    name: "김스튜",
    groups: ["어쩌구 부서 2", "어쩌구 부서 3"],
  },
  {
    id: "20220XX3",
    name: "김스튜",
    groups: [
      "어쩌구 부서 1",
      "어쩌구 부서 2",
      "이름이 굉장히 긴 어떤 부서 예시",
    ],
  },
  {
    id: "20220XX4",
    name: "김스튜",
    groups: [],
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
  imagePath: "조직도.png",
};

import {
  ProjectReportContent,
  ProjectReportDetailTotalReview,
  ProjectReportTableRow,
} from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import {
  ProjectTimelineProps,
  TimelineDateTypeEnum,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectTimelineData";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";

export const ProjectReportSingleContent: ProjectReportContent[] = [
  {
    id: 0,
    contentId: 0,
    title: "어떠한 사업",
    brief: "학우들의 시험 기간 응원을 위한 사업",
    preparationPeriod: {
      value: [new Date(2025, 4, 1), new Date(2025, 4, 8)],
      type: TimelineDateTypeEnum.Date,
    },
    executionPeriod: {
      value: [new Date(2025, 4, 9), new Date(2025, 4, 16)],
      type: TimelineDateTypeEnum.Date,
    },
    manager: {
      teamId: 0,
      member: 10, // userId
    },
    participation: "참여도",
    result: "결과",
    todo: "목표",
    comment: "제언",
    detail:
      "쿠팡을 통한 간식 구매, 교양분관 및 신학관에 배치 후 자유롭게 가져가도록 함.",
    timelineIds: [0, 1],
    expenditure: [1, 2],
  },
];

export const ProjectReportTimelines: ProjectTimelineProps[] = [
  {
    id: 0,
    date: {
      value: [null, null],
      type: TimelineDateTypeEnum.FirstHalf,
    },
    content: "학우들을 위한 구체적인 이벤트 구상",
    reason: "어떠한 비고",
  },
  {
    id: 1,
    date: {
      value: [new Date(2025, 4, 9), new Date(2025, 4, 16)],
      type: TimelineDateTypeEnum.Date,
    },
    content: "학우들을 위한 구체적인 이벤트 시행",
    reason: "어떠한 비고",
  },
];
export const mockProjectReportDetailTotalReview: ProjectReportDetailTotalReview[] =
  [
    {
      id: 0,
      projectReportContentId: 0,
      reviewText: "세부 사업 내용을 더 구체적으로 적어주시기 바랍니다.",
      reviewStatus: DocumentReviewStatusEnum.ReviseNeeded,
    },
    {
      id: 1,
      projectReportContentId: 1,
      reviewText: "",
      reviewStatus: DocumentReviewStatusEnum.ReviewAccepted,
    },
    {
      id: 2,
      projectReportContentId: 2,
      reviewText: "다시 써 오세요.",
      reviewStatus: DocumentReviewStatusEnum.ReviewRejected,
    },
    {
      id: 3,
      projectReportContentId: 3,
      reviewText: "",
      reviewStatus: DocumentReviewStatusEnum.ReviewAccepted,
    },
  ];

export function mapReportDetailToReview(
  reportDetail: ProjectReportContent[],
  review: ProjectReportDetailTotalReview[],
): ProjectReportTableRow[] {
  return reportDetail.map(reportContent => {
    const correspondingReview = review.find(
      rev => rev.projectReportContentId === reportContent.contentId,
    );
    return {
      id: reportContent.contentId,
      projectName: reportContent.title,
      executionPeriod: reportContent.executionPeriod,
      status: correspondingReview?.reviewStatus as DocumentReviewStatusEnum,
      review: correspondingReview?.reviewText as string,
    };
  });
}

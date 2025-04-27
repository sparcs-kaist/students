import {
  DocumentTypeEnum,
  ProjectProposal,
  ProjectProposalContent,
} from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import {
  ProjectTimelineProps,
  TimelineDateTypeEnum,
} from "@sparcs-students/web/features/project/services/_mock/mockProjectTimelineData";

export const ProjectProposalList: ProjectProposal[] = [
  {
    documentUniqueId: 0,
    documentTypeEnumId: DocumentTypeEnum.ProjectProposal,
    contentIds: [0, 1, 2],
  },
];

export const ProjectProposalSingleContent: ProjectProposalContent[] = [
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
    teamId: 0,
    manager: 10,
    purpose: "학생들의 시험 기간 응원 및 간식 제공을 위하여 본 사업을 진행함.",
    beneficiary: "KAIST 전체 학우",
    detail:
      "쿠팡을 통한 간식 구매, 교양분관 및 신학관에 배치 후 자유롭게 가져가도록 함.",
    timelineIds: [0, 1],
    expenditure: [1, 2],
  },
  {
    id: 1,
    contentId: 1,
    title: "학기 초 오리엔테이션",
    brief: "신입생들을 위한 환영 행사 및 오리엔테이션",
    preparationPeriod: {
      value: [new Date(2025, 2, 25), new Date(2025, 2, 28)],
      type: TimelineDateTypeEnum.Date,
    },
    executionPeriod: {
      value: [new Date(2025, 2, 29), new Date(2025, 2, 29)],
      type: TimelineDateTypeEnum.Date,
    },
    teamId: 1,
    manager: 11,
    purpose: "신입생들의 학과 및 학교 생활 적응 지원",
    beneficiary: "신입생 전체",
    detail: "기념품 제작 및 행사 기획, 장소 섭외 등",
    timelineIds: [2],
    expenditure: [4, 5],
  },
  {
    id: 2,
    contentId: 2,
    title: "중간고사 집중 학습 지원",
    brief: "도서관 집중 학습 공간 조성 및 간식 제공",
    preparationPeriod: {
      value: [new Date(2025, 3, 10), new Date(2025, 3, 14)],
      type: TimelineDateTypeEnum.Date,
    },
    executionPeriod: {
      value: [new Date(2025, 3, 15), new Date(2025, 3, 22)],
      type: TimelineDateTypeEnum.Date,
    },
    teamId: 2,
    manager: 12,
    purpose: "중간고사 기간 학습 환경 개선을 통한 성적 향상 도모",
    beneficiary: "전체 학부생",
    detail: "조명 개선, 스터디존 확보, 간식 제공",
    timelineIds: [3, 4],
    expenditure: [6, 7, 8],
  },
  {
    id: 3,
    contentId: 3,
    title: "학생회 문화의 밤",
    brief: "학생 자치단체와 함께하는 문화 행사",
    preparationPeriod: {
      value: [new Date(2025, 5, 1), new Date(2025, 5, 7)],
      type: TimelineDateTypeEnum.Date,
    },
    executionPeriod: {
      value: [new Date(2025, 5, 8), new Date(2025, 5, 9)],
      type: TimelineDateTypeEnum.Date,
    },
    teamId: 3,
    manager: 13,
    purpose: "학생 간의 소통 및 공동체 의식 고취",
    beneficiary: "KAIST 재학생",
    detail: "버스킹, 푸드트럭, 전시회 운영",
    timelineIds: [5],
    expenditure: [9, 10],
  },
];

export const ProjectProposalTimelines: ProjectTimelineProps[] = [
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

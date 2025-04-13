// eslint-disable-next-line no-restricted-imports
import { DocumentTimelineProps } from "../../components/DocumentTimelineTable";

export const mockDocumentTimelineData: DocumentTimelineProps[] = [
  {
    id: 1,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-10"),
    name: "프로젝트 기획",
    memo: "기획 초안 작성 및 검토",
  },
  {
    id: 2,
    startDate: new Date("2024-01-11"),
    endDate: new Date("2024-02-01"),
    name: "디자인 및 개발",
    memo: "UX/UI 디자인과 프론트엔드 개발",
  },
  {
    id: 3,
    startDate: new Date("2024-02-02"),
    endDate: new Date("2024-02-15"),
    name: "테스트 및 피드백",
    memo: "QA 테스트 및 버그 수정",
  },
  {
    id: 4,
    startDate: new Date("2024-02-16"),
    endDate: new Date("2024-02-28"),
    name: "최종 배포",
    memo: "배포 및 사용자 피드백 반영",
  },
  {
    id: 5,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-10"),
    name: "유지보수",
    memo: null,
  },
];

export enum TimelineDateTypeEnum {
  FirstHalf = 1, // 상반기
  SecondHalf, // 하반기
  Half, // 분기
  HalfAlways, // 분기 (상시)
  Month, // 연도, 월
  Date, // 날짜, 연도 월 일
  Undefined,
}

export interface ProjectTimelineProps {
  id: number;
  date: {
    value: [Date | null, Date | null];
    type: TimelineDateTypeEnum | undefined;
  };
  content: string;
  reason: string;
}

export const mockProjectTimelineData: ProjectTimelineProps[] = [
  {
    id: 0,
    date: {
      value: [null, null] as [Date | null, Date | null],
      type: undefined,
    },
    content: "",
    reason: "",
  },
];

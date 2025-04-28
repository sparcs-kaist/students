export enum TimelineDateTypeEnum {
  FirstHalf = 1,
  SecondHalf,
  Date,
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

// packages\web\src\common\components\Calendar\types.ts

export interface EventPeriod {
  start: Date;
  end: Date;
}

export interface ProcessedEvent {
  start: Date;
  end: Date;
  title1: string;
  title2: string;
  title3: string;
}

export type CalendarDateType =
  | "Default"
  | "Saturday"
  | "Sunday"
  | "Pass"
  | "Start"
  | "End"
  | "Selected"
  | "Past/Future";

export interface CalendarDateProps {
  date: Date;
  exist: boolean;
  type?: CalendarDateType;
  onDateClick?: (date: Date) => void;
  onDateHover?: (date: Date | null) => void;
}

export interface CalendarSizeProps {
  small?: boolean;
}

export interface CalendarWeekProps extends CalendarSizeProps {
  week: CalendarDateProps[];
  onDateClick: (date: Date) => void;
  onDateHover?: (date: Date | null) => void;
}

export interface MonthNavigatorProps {
  currentDate: Date;
  onChange: (date: Date) => void;
  small?: boolean;
}

export interface CalendarProps extends CalendarSizeProps {
  existDates: Date[];
  eventPeriods?: EventPeriod[];
  selectedDates: Date[];
  onDateClick?: (date: Date) => void;
  width?: string;
  height?: string;
  title?: string;
}

import React from "react";
import styled from "styled-components";
import CalendarDate, { CalendarDateProps } from "./CalendarDate";

interface CalendarWeekProps {
  week: {
    date: Date;
    exist: boolean;
    type?: CalendarDateProps["type"];
  }[];
  small?: boolean;
  onDateClick: (date: Date) => void;
}

export interface CalendarSizeProps {}

const WeekWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: fit-content;
`;

const SmallWeekWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  justify-content: space-between;
  height: fit-content;
`;

const CalendarWeek: React.FC<CalendarWeekProps> = ({
  week,
  small = false,
  onDateClick,
}) =>
  small ? (
    <SmallWeekWrapper>
      {week.map(day => (
        <CalendarDate
          key={day.date.toISOString()}
          date={day.date}
          exist={day.exist}
          type={day.type}
          onDateClick={onDateClick}
        />
      ))}
    </SmallWeekWrapper>
  ) : (
    <WeekWrapper>
      {week.map(day => (
        <CalendarDate
          key={day.date.toISOString()}
          date={day.date}
          exist={day.exist}
          type={day.type}
          onDateClick={onDateClick}
        />
      ))}
    </WeekWrapper>
  );

export default CalendarWeek;

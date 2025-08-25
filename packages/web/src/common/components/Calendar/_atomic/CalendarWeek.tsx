// packages\web\src\common\components\Calendar\_atomic\CalendarWeek.tsx

import React from "react";
import styled from "styled-components";
import CalendarDate from "./CalendarDate";
import { CalendarWeekProps } from "../types";

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
  onDateHover,
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
          onDateHover={onDateHover}
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
          onDateHover={onDateHover}
        />
      ))}
    </WeekWrapper>
  );

export default CalendarWeek;

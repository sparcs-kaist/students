import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  addDays,
  isSameMonth,
  isSameDay,
  getDay,
} from "date-fns";
import styled from "styled-components";
import MonthNavigator from "./_atomic/MonthNavigator";
import CalendarWeek, { CalendarSizeProps } from "./_atomic/CalendarWeek";
import { CalendarDateProps } from "./_atomic/CalendarDate";

interface EventPeriod {
  start: Date;
  end: Date;
}

interface CalendarProps extends CalendarSizeProps {
  existDates: Date[];
  eventPeriods?: EventPeriod[];
  selectedDates: Date[];
  onDateClick?: (date: Date) => void;
}

const CalendarWrapper = styled.div<CalendarSizeProps>`
  width: 100%;
  height: 365px;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
  align-self: stretch;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.GRAY[100]};
`;

const WeekWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 294px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  flex: 1 0 0;
`;

const Calendar: React.FC<CalendarProps> = ({
  size = "md",
  existDates,
  eventPeriods = [],
  selectedDates,
  onDateClick = () => {},
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weeks = eachWeekOfInterval(
    {
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    },
    { weekStartsOn: 1 },
  );

  const handleDateClick = (date: Date) => {
    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(date);
    }
    onDateClick?.(date);
  };

  const getWeekData = (startDate: Date): CalendarDateProps[] =>
    Array.from({ length: 7 }).map((_, index) => {
      const day = addDays(startDate, index);
      const isCurrentMonth = isSameMonth(day, currentDate);
      const exist = existDates.some(existDate => isSameDay(existDate, day));
      const dayInWeek = getDay(day);
      let type: CalendarDateProps["type"] = isCurrentMonth
        ? "Default"
        : "Past/Future";

      if (dayInWeek === 0) {
        type = "Sunday";
      } else if (dayInWeek === 6) {
        type = "Saturday";
      }
      if (!isCurrentMonth) {
        type = "Past/Future";
      } else if (
        selectedDates.some(selectedDate => isSameDay(selectedDate, day))
      ) {
        type = "Selected";
      } else {
        eventPeriods.forEach(period => {
          if (isSameDay(day, period.start)) {
            type = "Start";
          } else if (isSameDay(day, period.end)) {
            type = "End";
          } else if (day >= period.start && day <= period.end) {
            type = "Pass";
          }
        });
      }

      return {
        date: day,
        exist,
        type,
      };
    });

  return (
    <CalendarWrapper size={size}>
      <MonthNavigator currentDate={currentDate} onChange={setCurrentDate} />
      <WeekWrapper>
        {weeks.map((weekStart: Date) => (
          <CalendarWeek
            week={getWeekData(weekStart)}
            size={size}
            key={weekStart.toISOString()}
            onDateClick={handleDateClick}
          />
        ))}
      </WeekWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;

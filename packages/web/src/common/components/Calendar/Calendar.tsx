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
import Typography from "../Typography";

interface EventPeriod {
  start: Date;
  end: Date;
}

interface CalendarProps extends CalendarSizeProps {
  existDates: Date[];
  eventPeriods?: EventPeriod[];
  selectedDates: Date[];
  onDateClick?: (date: Date) => void;
  width?: number;
  title?: string;
}

const CalendarWrapper = styled.div<{
  width?: CalendarProps["width"];
}>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`;

const CalendarContentWrapper = styled.div<{
  title?: CalendarProps["title"];
}>`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
  align-self: stretch;
  border-radius: ${({ title }) => (title !== "" ? "0px 0px 4px 4px" : "4px")};
  ${({ title, theme }) =>
    title === ""
      ? `border: 2px solid ${theme.colors.GRAY[100]}`
      : `border-left: 2px solid ${theme.colors.GRAY[100]};
  border-right: 2px solid ${theme.colors.GRAY[100]};
  border-bottom: 2px solid ${theme.colors.GRAY[100]};`};
`;

const WeekWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  flex: 1 0 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  height: 40px;
  padding: 8px 20px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 4px 4px 0px 0px;
  background: ${({ theme }) => theme.colors.GREEN[600]};
`;

const Calendar: React.FC<CalendarProps> = ({
  title = "",
  width = undefined,
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
    <CalendarWrapper width={width}>
      {title !== "" && (
        <TitleWrapper>
          <Typography color="WHITE" fs={20} fw="BOLD" lh={20}>
            {title}
          </Typography>
        </TitleWrapper>
      )}
      <CalendarContentWrapper title={title}>
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
      </CalendarContentWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
